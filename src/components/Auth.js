import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'

const Auth = () => {

  const [cookie, setCookie, removeCookie] = useCookies(['user'])
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [error, setError] = useState(false)

  const handleSubmit = async (endpoint) => {
    if (!isLogin && password !== confirmPassword) {
      setError(true)
      return
    }

     const response = await axios.post(`http://localhost:8000/${endpoint}`, {
      username,
      password
     })

     setCookie('Name', response.data.username)
     setCookie('HashedPassword', response.data.hashedPassword)
     setCookie('UserId', response.data.userId)
     setCookie('AuthToken', response.data.token)

     window.location.reload()
  }

  return (
    <div className="auth_container">
      <div className="auth_container_box" 
        style={{ height: isLogin ? '45%' : '55%'}}
      >
        <div className="blob">
        </div>
        <div className="blob2">
        </div>
        <div className="auth_container_form">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            id="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLogin && <input
            type="text"
            id="password-check"
            name="password-check"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          }
          {error && <p>Make sure the passwords match</p>}
          <button className="authform_button" onClick={() => handleSubmit(isLogin ? 'login' : 'signup')}>Lets Chat!</button>
        </div>

        <div className="auth_options">
          <button 
            onClick={() => setIsLogin(false)}
            style={{ backgroundColor: !isLogin ? '#001030' : '#151a1f'}}
            >Sign Up</button>
          <button 
            onClick={() => setIsLogin(true)}
            style={{ backgroundColor: isLogin ? '#001030' : '#151a1f'}}
          >Login</button>
        </div>

      </div>
    </div>
  )
}

export default Auth