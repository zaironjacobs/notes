<h1 align="center">
<a href="https://notes.zaironjacobs.com/" target="_blank">NOTES</a>
</h1>
<br>
<div align="center">
<img alt="notes" src="https://i.imgur.com/rkZMf9G.png" width="85%">
<br/><br/>
<img alt="notes" src="https://i.imgur.com/qt9pl8b.png" width="85%">
</div>

## Dependencies

- [Node.js >= 14](https://nodejs.org)
- [MySQL](https://dev.mysql.com/downloads/installer/)

## Usage

Copy the file .env.local.example to .env.local and fill in the environment variables.
Example:

```
MYSQL_HOST=localhost
MYSQL_DATABASE=notes
MYSQL_USERNAME=username
MYSQL_PASSWORD=password
MYSQL_PORT=3306
NEXT_PUBLIC_API_URL=http://localhost:3000/api
SECRET=1234567890
NEXT_PUBLIC_DEMO_EMAIL=demo@example.com
NEXT_PUBLIC_DEMO_PASSWORD=123QWE,./
```

## Install

```bash
npm install
npm run migrate
npm run build
```

## Run

```console
npm run start -- -p [PORT_NUMBER]
```