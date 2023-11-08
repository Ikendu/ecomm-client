import { Outlet } from 'react-router-dom'
import Navbar from './AHeader/Navbar'
import Footer from './ZFooter/Footer'

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}
export default Layout
