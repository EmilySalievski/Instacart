import dih from '../assets/dih.png'
import background from '../assets/background.png'
import { useState } from "react";
import { useNavigate } from 'react-router-dom'

function Login(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    async function getToken(){
        const response = await fetch("http://127.0.0.1:8000/api/token/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        const data = await response.json()

         if (response.ok) {
            localStorage.setItem('access', data.access)
            localStorage.setItem('refresh', data.refresh)

            navigate('/')
        } else {
            console.log(data)
        }
    }

    return (
        <div className="flex justify-center items-start min-h-screen pt-40" style={{ backgroundImage: `url(${background})` }}>
            <div className='flex flex-col items-start gap-4 w-auto bg-white px-25 py-8 border-1 border-main-brown rounded-2xl'>
                <div className='flex items-center gap-2'>
                    <img  src={dih} className='w-10 h-10 rounded-xl'/>
                    <h1 className='text-xl m-0 text-main-brown'>Instacart</h1>
                </div>
                <input 
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    className="bg-light-pink rounded-2xl w-full text-sm py-2 px-3 outline-none border-2 border-transparent focus:border-hover-text placeholder:text-main-brown"
                />
                <input 
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="bg-light-pink rounded-2xl w-full text-sm py-2 px-3 outline-none border-2 border-transparent focus:border-hover-text placeholder:text-main-brown"
                />
                <button 
                    onClick={getToken}
                    className="relative w-full bg-dark-pink overflow-hidden rounded-2xl px-5 py-2.5 text-white duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] active:translate-y-1 active:scale-x-110 active:scale-y-90">
                        Login
                </button>
                <div className='flex gap-1 justify-center'>
                    <p>
                        Don't have an account?
                    </p>
                    <button 
                        className='bg-transparent text-darker-pink font-semibold'>
                        Sign up
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login;