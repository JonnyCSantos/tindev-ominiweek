import React from 'react'

import logo from '../../assets/logo.svg'
import './login.scss'

export default function Login() {
    return (
        <div className="login">
            <div className="login__container">
                <form action="">
                    <img src={logo} alt="tindev" />
                    <input placeholder="Digite seu usuário no Github" type="text" />
                    <button type="submit">Enviar</button>
                </form>
            </div>
        </div>
    )
}