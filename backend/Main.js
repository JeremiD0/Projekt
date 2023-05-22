const cors =       require('cors');
const bcrypt =     require('bcrypt');
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
// Endpoint do zapisu notatki

app.post('/api/notatki', (req, res) => {
    const { tekst } = req.body;
  
    // Wykonanie zapytania do bazy danych
    const query = `INSERT INTO notatka (tekst) VALUES (?)`;
    db.query(query, [tekst], (err, result) => {
      if (err) {
        console.error('Błąd zapisu do bazy danych: ', err);
        res.status(500).json({ error: 'Błąd zapisu do bazy danych' });
      } else {
        res.status(200).json({ success: true });
      }
    });
  });

  app.delete('/api/notatki/delete', (req, res) => {
    const {elementId} = req.body;
    db.query(`DELETE FROM notatka WHERE id = ? `,elementId,(err)=>{

      if (err) {
        res.status(500);
      }
      res.status(200);
      console.log(elementId)

    })
      
  });
  
  
  // Endpoint do pobierania notatek
  app.get('/api/notatki', (req, res) => {
    // Wykonanie zapytania do bazy danych
    const query = `SELECT * FROM notatka`;
    db.query(query, (err, result) => {
      if (err) {
        console.error('Błąd pobierania danych z bazy danych: ', err);
        res.status(500).json({ error: 'Błąd pobierania danych z bazy danych' });
      } else {
        res.status(200).json(result);
      }
    });
  });

console.log("Server slucha na porcie 3333")
app.listen(3333);