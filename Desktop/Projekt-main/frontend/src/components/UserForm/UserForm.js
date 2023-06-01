import React, { useState, useEffect} from 'react';
import axios from 'axios';
import App from '../../App';


export default function UserForm(props) {


      const [loginInput, setLogin] = useState();
      const [passwordInput, setPassword] = useState();
      const [passwordConf, confPassword] = useState();
      const [users, setUsers] = useState([]);
      const [display, setDisplay] = useState(false);
      const [err_message, seterror_message] = useState(" ");

      useEffect(() => {
        Refresh()
    }, [])


      const handleFormSubmit = async (event) => {
        event.preventDefault();
  
        if (passwordInput !== passwordConf) {
          seterror_message('Hasła nie są zgodne.');
          return;
        } 
        else {
          seterror_message(' ');
        }
          const response = await axios.post('http://localhost:3333/api/uzytk', {
            username: loginInput,
            password: passwordInput,
          }, 
          {
            "Content-Type": "application/json"
          } 
          ).then(res => {
            seterror_message(res.data.blad);
          })
        }

      const Refresh = async () =>{
            const response = await axios.get('http://localhost:3333/api/uzytkownicy');
            setUsers(response.data);
      }

      if (display) {
        return( <App token = {props.token} />)
      } 

  return (
    <>
    <div className='buttonDiv1'>
      <button className='backBtn' data-tooltip="Powrót" onClick={()=>{setDisplay(!display)}}></button>
    </div>
    <div className="login-wrapper2">
      <h1>Utwórz użytkownika</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          <p>Login:</p>
          <input type="text" name="login" value={loginInput} placeholder="Ustaw login" onChange={(e)=>setLogin(e.target.value)} required />
        </label>
        <label>
          <p>Hasło:</p>
          <input
            value={[passwordInput]}
            onChange={(e)=>setPassword(e.target.value)}
            type="password"
            name="password"
            placeholder="Ustaw hasło"
            required
          />
        </label>
        <label>
          <p>Powtórz hasło:</p>
          <input
            value={passwordConf}
            onChange={(e)=>confPassword(e.target.value)}
            type="password"
            name="confirmPassword"
            placeholder="Powtórz hasło"
            required
          />
        </label>
        <div>
          <button type="submit" onClick={handleFormSubmit}>Dodaj</button>
        </div>
          <div className='error_span'> {err_message} </div>
      </form>

      {/* Wyświetlanie listy użytkowników */}
      <div>
        <p>Lista użytkowników:</p>
        {users.map((user) => (
          <ul>
            <li>{user._id} {user.login}</li>
          </ul>
        ))}
      </div>

      {/* Wyświetlanie zalogowanego użytkownika */}
      <div>
        <p>Zalogowany użytkownik:</p>
        
        {props.token ? (
          <ul>
            <li>{props.token.username}</li>
          </ul>
          
        ) : (
          setDisplay(!display)
        )}
      </div>

      
    </div>
    
    
    </>
  );
}