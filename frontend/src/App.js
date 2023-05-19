import './App.css';
import React, {useState} from 'react';
import LoginForm from './components/LoginForm/LoginForm';
import Lewy from './components/Lewy/Lewy'
import Prawy from './components/Prawy/Prawy'
import Srodkowy from './components/Srodkowy/Srodkowy'


function App() {

    const[token, setToken] = useState();

    const [title, setTitle] = useState();

    if(!token) 
    {
        return <LoginForm setToken={setToken} /> 
    }
    
    return (
            <div className="app">
                <Lewy />

                <Srodkowy />

                <Prawy />
            </div>
        )
}

export default App;