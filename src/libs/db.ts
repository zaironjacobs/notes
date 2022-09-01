import mysql from 'serverless-mysql'

export const db = mysql({
    config: {
        host: process.env.MYSQL_HOST,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        port: parseInt(process.env.MYSQL_PORT as string),
    },
})

export async function executeQuery(query: string, values: (string | number)[] | string | number = []) {
    try {
        const results = await db.query(query, values)
        await db.end()
        return results
    } catch (error) {
        return { error }
    }
}
