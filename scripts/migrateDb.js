const path = require('path')
const envPath = path.resolve(process.cwd(), '.env.local')

require('dotenv').config({ path: envPath })

const mysql = require('serverless-mysql')

const db = mysql({
    config: {
        host: process.env.MYSQL_HOST,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        port: process.env.MYSQL_PORT,
    },
})

const query = async (q) => {
    try {
        const results = await db.query(q)
        await db.end()
        return results
    } catch (e) {
        throw Error(e.message)
    }
}

const migrate = async () => {
    try {
        await query(`
            CREATE TABLE IF NOT EXISTS user
            (
                id         VARCHAR(36)  NOT NULL PRIMARY KEY,
                first_name VARCHAR(30)  NOT NULL,
                last_name  VARCHAR(30)  NOT NULL,
                email      VARCHAR(30)  NOT NULL UNIQUE,
                password   VARCHAR(128) NOT NULL,
                created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
            );
        `)

        await query(`
            CREATE TABLE IF NOT EXISTS note
            (
                id         VARCHAR(36)  NOT NULL PRIMARY KEY,
                user_id    VARCHAR(36)  NOT NULL,
                name       VARCHAR(30)  NOT NULL,
                content    MEDIUMTEXT   NULL,
                created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
            );
        `)

        console.log('migration ran successfully')
    } catch (e) {
        console.error('could not run migration')
        console.error(e)
        process.exit(1)
    }
}

migrate().then(() => process.exit())
