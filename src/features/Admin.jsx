import { useState } from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
  const [username, setUsername] = useState(``)
  const [password, setPassword] = useState(``)

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className='admin'>
      <form onSubmit={handleSubmit}>
        <h2>Admin Page</h2>
        <input
          type='text'
          placeholder='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type='text'
          placeholder='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input className='btn' type='submit' />
      </form>
      <Link to={`/register`}>Register Admin</Link>
    </div>
  )
}
export default Admin
