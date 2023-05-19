import React, { useState } from 'react';
import PropTypes from 'prop-types'

async function loginUser(credentials) {
    return fetch('http://localhost:3333/Login', {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'username': credentials.username,
            'password': credentials.password
        }
    }).then(res => res.json())
}

export default function LoginForm({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            username,
            password
        })
        setToken(token)
        ustaw_err(token)
    }

    function ustaw_err(cos)
    {
        let error_msg = ""

        if(!cos)
        {
            error_msg = "Niepoprawny login lub hasło!"
        }

        document.getElementById('err_message_span').innerHTML=error_msg
    }

    return (
        <div className="login-wrapper">
            <h1> Zaloguj się </h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p> Login: </p>
                    <input type="text" placeholder="Nazwa użytkownika" onChange={e => setUserName(e.target.value)} />
                </label>
                <label>
                    <p> Hasło: </p>
                    <input type="password" placeholder="Hasło" onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit"> Zaloguj </button>
                </div>
                <span id="err_message_span">  </span>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    setToken: PropTypes.func.isRequired
};

// <img src={require('./amw_logo.png')} /> 