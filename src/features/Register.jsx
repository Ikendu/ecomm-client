import { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  const [name, setName] = useState(``)
  const [email, setEmail] = useState(``)
  const [password, setPassword] = useState(``)

  const handleSub = (e) => {
    e.preventDefault()
  }

  return (
    <div className='admin'>
      <form onSubmit={handleSub}>
        <h2>Admin Register</h2>
        <input
          type='text'
          placeholder='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='text'
          placeholder='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='text'
          placeholder='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type='submit' className='btn' />
      </form>
      <Link to={`/admin`}>Login</Link>
    </div>
  )
}
export default Register
