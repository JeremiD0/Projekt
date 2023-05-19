const cors = require('cors');
const bcrypt = require('bcrypt');
const express =    require('express');
const app =        express();
const path =       require('path');
const mysql =      require('mysql');
const Router =     require('./Router');

app.use(express.json());
app.use(cors());

// Tworzenie polączenia z bazą danych 
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'list_db'
});

// Zwracanie ewentualnego erroru w konsoli 
db.connect(function(err){
    if (err) {
    console.log('Podczas lączenia się z serwerem bazy danych wystąpił bląd');
        throw err;
        return false;
    }
    console.log("Polaczono z baza");
});

new Router(app, db);

/*
bcrypt.hash("AMW1", 10, function (err, hash) {
    if (err) {
        console.log(err.message)
    }
    db.query(`INSERT INTO logowanie (login, haslo) values ('MK','${hash}')`)
}); */

console.log("Server slucha na porcie 3333")
app.listen(3333);