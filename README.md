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

## Download

```console
git clone https://github.com/zaironjacobs/notes
```

## Usage

Copy the file .env.local.example to .env.local and fill in the environment variables.
Example:

```
MYSQL_HOST=localhost
MYSQL_DATABASE=notes
MYSQL_USERNAME=username
MYSQL_PASSWORD=password
MYSQL_PORT=3306
SECRET=0RRDkRscGkAMA3329tjOWAYn8hw0Qykp
```

Optional: MySQL configuration for max_allowed_packet:

```
[mysqld]
max_allowed_packet=16M
```

Create a database called "notes" in MySQL before proceeding.

```bash
npm install
npm run migrate
npm run build
```

## Run

```console
npm run start -- -p [PORT_NUMBER]
```