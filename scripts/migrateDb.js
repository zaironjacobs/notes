const path = require('path');
const envPath = path.resolve(process.cwd(), '.env.local');

require('dotenv').config({ path: envPath });

const mysql = require('serverless-mysql');

const db = mysql({
    config: {
        host: process.env.MYSQL_HOST,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        port: process.env.MYSQL_PORT,
    },
})

const query = async(q)=> {
    try {
        const results = await db.query(q);
        await db.end();
        return results;
    } catch (e) {
        throw Error(e.message);
    }
};

const migrate = async () =>{
    try {

        await query(`
        CREATE TABLE IF NOT EXISTS users (
            id VARCHAR(36) NOT NULL PRIMARY KEY,
            first_name VARCHAR(30) NOT NULL,
            last_name VARCHAR(30) NOT NULL,
            email VARCHAR(30) NOT NULL UNIQUE,
            password VARCHAR(72) NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);
        `);

        await query(`
        CREATE TABLE IF NOT EXISTS notes (
            id VARCHAR(36) NOT NULL PRIMARY KEY,
            name VARCHAR(30) NOT NULL,
            content MEDIUMTEXT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);
        `);

        await query(`
        CREATE TABLE IF NOT EXISTS user_notes (
            id VARCHAR(36) NOT NULL PRIMARY KEY,
            user_id VARCHAR(36) NOT NULL,
            note_id VARCHAR(36) NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            CONSTRAINT FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE,
            CONSTRAINT FOREIGN KEY (user_id) REFERENCES users(id));
        `);

        console.log('migration ran successfully');
    } catch (e) {
        console.error('could not run migration');
        process.exit(1);
    }
}

migrate().then(() => process.exit());