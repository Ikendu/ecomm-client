import { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { UserContext } from './UserContext'

const Admin = () => {
  const [name, setName] = useState(``)
  const [password, setPassword] = useState(``)
  const [redirect, setRedirect] = useState(false)
  const { user, setUser, url } = useContext(UserContext)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const response = await fetch(url + `/login`, {
      method: `POST`,
      body: JSON.stringify({ name, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: `include`,
    })
    if (response.ok) {
      response.json().then((userInfo) => {
        setUser(userInfo)
        setRedirect(true)
      })
    } else {
      alert(`Wrong credentials`)
    }
  }

  if (redirect) return <Navigate to={`/`} />

  return (
    <div className='admin'>
      <form onSubmit={handleSubmit}>
        <h2>Admin Page</h2>
        <input
          type='text'
          placeholder='Username'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input className='btn' type='submit' />
        {loading && <h3 className='login-loading'>Loading...</h3>}
      </form>
      {user?.name && (
        <div>
          Click
          <Link to={`/register`} className='login-register'>
            here
          </Link>
          to register new Admin
        </div>
      )}
    </div>
  )
}
export default Admin
