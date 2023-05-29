const cors =       require('cors');
const bcrypt =     require('bcrypt');
const express =    require('express');
const app =        express();
const path =       require('path');
const mysql =      require('mysql');
const Router =     require('./Router');
const { error } = require('console');

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

//DODAWANIE UZYTKOWNIKOW


  app.post('/api/uzytk', (req, res) => {
    const { username, password } = req.body;
  
    

  
    bcrypt.hash(password, 10, (bcryptErr, hash) => {
      if (bcryptErr) {
        res.sendStatus(401).json({
          success: false,
          msg: 'Wystąpił błąd, spróbuj ponownie!',
        });
      }

      else{
        db.query(`INSERT INTO logowanie (login,haslo) VALUES ('${username}','${hash}')`, (err, result) => {
          if (err) {
            throw err
          }
        })
      }
  
      
  
      ;
    });
  });
  
  app.get('/api/uzytkownicy', (req, res) => {
    const query = `SELECT * FROM logowanie`;
  
    db.query(query, (err, result) => {
      if (err) {
        console.error('Błąd pobierania danych z bazy danych: ', err);
        res.status(500).json({ error: 'Błąd pobierania danych z bazy danych' });
      } else {
        res.status(200).json(result);
      }
    });
  });
 

//FISZKI 
app.post('/api/fiszki/add', (req, res) => {
  const { 
    nazwa,
    opis,
    sala,
    wykonawca,
    deadline,
    tworca
  } = req.body;

  // Wykonanie zapytania do bazy danych
  const query = "INSERT INTO fiszka (nazwa, opis, sala, wykonawca, deadline, tworca) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(query, [nazwa, opis, sala, wykonawca, deadline, tworca], (err, result) => {
    if (err) {
      console.error('Błąd zapisu do bazy danych: ', err);
      res.status(500).json({ error: 'Błąd zapisu do bazy danych' });
    } else {
      res.status(200).json({ success: true });
    }
  });
});


app.get('/api/fiszki', (req, res) => {
  const query = `SELECT * FROM fiszka`;

  db.query(query, (err, result) => {
    if (err) {
      console.error('Błąd pobierania danych z bazy danych: ', err);
      res.status(500).json({ error: 'Błąd pobierania danych z bazy danych' });
    } else {
      res.status(200).json(result);
    }
  });
});
 app.delete('/api/fiszki/delete', (req, res) => {
    const {elementId} = req.body;
    db.query(`DELETE FROM fiszka WHERE id = ? `,elementId,(err)=>{

      if (err) {
        res.status(500);
      }
      res.status(200);
      console.log(elementId)

    })
      
  });
  

console.log("Server slucha na porcie 3333")
app.listen(3333);