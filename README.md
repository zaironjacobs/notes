<h1 align="center">
<a href="https://notes.zaironjacobs.com/" target="_blank">NOTES</a>
</h1>
<br>
<div align="center">
<img alt="notes" src="https://i.imgur.com/ndDjiyr.png" width="95%">
</div>

## Dependencies
- [MySQL](https://dev.mysql.com/downloads/installer/)


## Download
```console
$ git clone https://github.com/zaironjacobs/notes
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

Create a database called "notes" in MySQL before proceeding.


To use:
```console
$ cd notes
$ npm install
$ npm run migrate
$ npm run build && npm run start
```
