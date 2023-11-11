import './header.css'

import shopIcon from '../ICON/shopIcon3.jpg'
import { Link } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { UserContext } from '../../operators/UserContext'

const Navbar = () => {
  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    fetch(`http://localhost:4000/profile`, {
      credentials: 'include',
    }).then((resp) =>
      resp.json().then((userInfo) => {
        setUser(userInfo)
      })
    )
  }, [])

  const logout = () => {
    fetch(`http://localhost:4000/logout`, {
      method: `POST`,
      credentials: `include`,
    })
    setUser(null)
  }
  const userName = user?.name
  return (
    <header className='top'>
      <div className='logo'>
        <Link to='/'>
          <img src={shopIcon} className='icon' alt='logo' />
          <p className='name'>Lifella</p>
        </Link>
      </div>
      <nav className='content' id='content'>
        {/* After LOGIN IS PASSED */}
        {userName && (
          <div className='logged'>
            <span>Hello {userName.toUpperCase()}</span>
            <a className='logout' onClick={logout}>
              Logout
            </a>
            <Link className='create' to={`/post`}>
              New Sales
            </Link>
          </div>
        )}
        <ul className='lists' id='bar'>
          <Link to='/'>
            <li>Home</li>
          </Link>
          <a href='#products'>
            <li>Produts</li>
          </a>
          <a href='#social'>
            <li>Social Media</li>
          </a>
          <a href='#about-us'>
            <li>About us</li>
          </a>
          <a href='#contact-us'>
            <li>Contact us</li>
          </a>
        </ul>
      </nav>
    </header>
  )
}
export default Navbar
