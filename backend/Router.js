const bcrypt = require('bcrypt');


class Router {

    constructor(app,db){
        this.login(app,db);
    }

    login(app,db){
        app.get('/login',  (req, res) =>{
            const { username, password } = req.headers;

            if (username.length > 100 || password.length > 100){
                res.json({
                    success: false,
                    msg: 'Login lub hasło jest zbyt długie!'
                })
                return;
            }

            let cols = [username];
            db.query('SELECT * FROM logowanie WHERE login = ? LIMIT 1', cols,(err,data,fields) => {

                if (err) {
                    res.json({
                        success:false,
                        msg: 'Wystąpił błąd, spróbuj ponownie!'
            
                    })
                    return;
                }

                if(data && data.length === 1){
                    bcrypt.compare(password, data[0].haslo, (bcryptErr, verified) =>{
                        if (verified){
                            res.status(200).send(true)
                        } 
                        else{
                            console.log(verified, password, data[0].haslo);
                            res.status(401).json({
                                success:false,
                                msg:'Niepoprawne hasło!'
                            })
                        }
                    });
                } else{
                    res.json({
                        success:false,
                        msg: 'NIE ODNALEZIONO UZYTKOWNIKA '
                    })
                }
                
            });
        });
    }
}

module.exports = Router;