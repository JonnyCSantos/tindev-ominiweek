import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { Link } from 'react-router-dom'

import logo from '../../assets/logo.svg'
import like from '../../assets/like.svg'
import dislike from '../../assets/dislike.svg'
import itsamatch from '../../assets/itsamatch.png'

import './main.scss'

import api from '../../services/api'

export default function Main({ match }) {
    const [users, setUsers] = useState([]);
    const [matchDev, setMatchDev] = useState(null)
    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/devs', {
                headers: {
                    user: match.params.id
                }
            })
            setUsers(response.data);
        }

        loadUsers();
    }, [match.params.id]);

    useEffect(() => {
        const socket = io('localhost:3333', {
            query: { user: match.params.id }
        })

        socket.on('match', dev => {
            setMatchDev(dev)
        })

    }, [match.params.id])

    async function handleLike(id) {
        await api.post(`/devs/${id}/likes`, null, {
            headers: {
                user: match.params.id
            }
        })

        setUsers(users.filter(user => user._id !== id))
    }

    async function handleDislike(id) {
        await api.post(`/devs/${id}/dislikes`, null, {
            headers: {
                user: match.params.id
            }
        })

        setUsers(users.filter(user => user._id !== id))
    }


    return (
        <div className="main">
            <div className="main__container">
                <Link to="/">
                    <img src={logo} alt="tindev" />
                </Link>
                {users.length > 0 ? (
                    <ul>
                        {
                            users.map(user => (
                                <li key={user._id}>
                                    <img src={user.avatar} alt="avatar" />
                                    <footer>
                                        <strong>{user.name}</strong>
                                        <p>{user.bio}</p>
                                    </footer>
                                    <div className="buttons">
                                        <button type="button" onClick={() => handleDislike(user._id)}>
                                            <img src={dislike} alt="dislike" />
                                        </button>
                                        <button type="button" onClick={() => handleLike(user._id)}>
                                            <img src={like} alt="like" />
                                        </button>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                ) : (
                        <div className="empity">
                            Acabou :(
                    </div>
                    )}
            </div>

            {
                matchDev && (
                    <div className="match">
                        <div className="match__container">
                            <img src={itsamatch} alt="its a match" />
                            <img className="avatar" src={matchDev.avatar} alt="" />
                            <strong>{matchDev.name}</strong>
                            <p>{matchDev.bio}</p>
                            <button type="button" onClick={() => setMatchDev(null)}>fechar</button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}