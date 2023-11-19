import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from './UserContext'

const Register = () => {
  const [name, setName] = useState(``)
  const [email, setEmail] = useState(``)
  const [password, setPassword] = useState(``)
  const [loading, setLoading] = useState(false)

  const { user, setUser, url } = useContext(UserContext)

  useEffect(() => {
    fetch(url + `/profile`, {
      credentials: 'include',
    }).then((resp) =>
      resp.json().then((userInfo) => {
        setUser(userInfo)
      })
    )
  }, [])

  const handleSub = async (e) => {
    e.preventDefault()
    setLoading(true)
    const resp = await fetch(url + `/register`, {
      method: `POST`,
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    })
    if (!resp.ok) {
      alert(`Registration Failed`)
      setLoading(false)
      return
    }
    alert(`Registration successful`)
    setLoading(false)
  }

  return (
    <div className='register'>
      {user?.name && (
        <form onSubmit={handleSub}>
          <h2>Admin Register</h2>
          <input
            type='text'
            placeholder='User Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type='submit' className='btn' />
          {loading && <h3 className='login-loading'>Loading...</h3>}
        </form>
      )}

      <div>
        Click
        <Link to={`/admin`} className='login-register'>
          here
        </Link>
        to login existing admin
      </div>
    </div>
  )
}
export default Register
