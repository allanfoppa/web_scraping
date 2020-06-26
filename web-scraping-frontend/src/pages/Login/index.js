import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import api from '../../services/api'

import logo from '../../assets/images/logo.png'

import './index.css'

export default function Login(){

    const history = useHistory()

    const [ name, setName ] = useState('')
    const [ pw, setPw ] = useState('')

    async function handleLogin(e) {
        e.preventDefault()

        try {
            const response = await api.post('login', { name, pw })

            if (response.data.find === true) {
                history.push('/dashboard')
            } else {
                alert('Usuário ou senha incorretos.')
            }

        } catch (error) {
            alert('Algum erro aconteceu, fale com o administrador da aplicação')
        }
    }

    return(
        <div className="login-container">
            <div className="login-container-inner">
                <div className="wrap-login-container-inner padding--bottom-52">
                    <img src={logo} alt="Logo Zaffari Bourbon" className="img-responsive padding--bottom-52" />
                    <form onSubmit={handleLogin} className="width--100 display--flex justify-space-between flex-wrap">

                        <div className="container-input100 validate-input margin--bottom-16" data-validate="Username is required">
                            <input
                                placeholder="Usuário"
                                className="input100"
                                name="name"
                                autoComplete="no"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />
                            <span className="focus-input100"></span>
                        </div>


                        <div className="container-input100 validate-input margin--bottom-16" data-validate="Password is required">
                            <input
                                placeholder="Senha"
                                className="input100"
                                type="password"
                                name="pw"
                                value={pw}
                                onChange={e => setPw(e.target.value)}
                                required
                            />
                            <span className="focus-input100"></span>
                        </div>

                        <div className="display--flex width--100 flex-wrap m-t-17">
                            <button className="login100-form-btn">
                                Entrar
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}