import './App.css';
import React, {useState} from 'react';
import LoginForm from './components/LoginForm/LoginForm';
import Lewy from './components/Lewy/Lewy'
import Prawy from './components/Prawy/Prawy'
import Srodkowy from './components/Srodkowy/Srodkowy'

function App() {

    const[token, setToken] = useState();


    if(!token) 
    {
        return <LoginForm setToken={setToken} /> 
    }
    function logOut() {
        <LoginForm setToken={setToken(false)}/>
    }
    return (
            <div className="app">
                
                <div className='buttonDiv'>
        <button className='LogOutBtn' onClick={logOut} ></button>
        </div>   
                
                <Lewy />
             
                <Srodkowy />
               
                <Prawy />
               
            </div>
        )
}

export default App;