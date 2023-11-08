import { useEffect } from 'react'
import Products from './features/CBody/Products'
import Card from './features/DCart/Card'
import { useDispatch, useSelector } from 'react-redux'
import { calculate } from './STORE/reducers/cartRedecer'
import Payment from './features/EPayment/Payment'
import Navbar from './features/AHeader/Navbar'
import FrontPage from './features/AHeader/FrontPage'
import Footer from './features/ZFooter/Footer'
import { Routes, Route } from 'react-router-dom'
import Admin from './features/Admin'
import Register from './features/Register'
import Layout from './features/Layout'

const App = () => {
  const { sales } = useSelector((state) => state.cart)
  const { isOpen } = useSelector((state) => state.modal)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(calculate())
  }, [sales])

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route
            index
            element={
              <div>
                <FrontPage />
                {isOpen && <Payment />}
                <Card />
                <Products />
              </div>
            }
          />
          <Route path='/admin' element={<Admin />} />
          <Route path='/register' element={<Register />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
