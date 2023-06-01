import './App.css';
import React, {useEffect, useState} from 'react';
import LoginForm from './components/LoginForm/LoginForm';
import Lewy from './components/Lewy/Lewy'
import Prawy from './components/Prawy/Prawy'
import Srodkowy from './components/Srodkowy/Srodkowy'
import UserForm from './components/UserForm/UserForm.js';



function App() {
    
    useEffect(() => {
        document.title = 'MyNotes'; 
        
      }, []);
      

    const [token, setToken] = useState();
    const [display, setDisplay] = useState(false);
    const [fiszki, setFiszki] = useState([]);
    

   
    if (!token) {
        return <LoginForm setToken={setToken}/>
    }
    function logOut() {
        <LoginForm setToken={
            setToken(false)
        }/>
    }
    
    if (display) {
            return( <UserForm token = {token}/>)
        
    } 
    
  
    return (
        <div className="app">

            <div className='buttonDiv'>
                <button className='LogOutBtn'
                    onClick={logOut}
                    data-tooltip="Wyloguj sie"></button>
            </div>

            <Lewy setFiszki={setFiszki}/>

            <Srodkowy  fiszki={fiszki}/>

            <Prawy/>
            

            <div className='buttonDiv'>
                <button className='NewUserBtn' data-tooltip="Dodaj nowego uzytkownika" onClick={()=>{setDisplay(!display)}} ></button>
            </div>

        </div>
    )
}

export default App;
