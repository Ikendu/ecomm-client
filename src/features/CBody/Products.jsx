import './body.css'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'
import ReactTimeAgo from 'react-time-ago'

import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {
  addBtn,
  addItems,
  addToCart,
  decreaseBtn,
  increaseBtn,
  productAdd,
  reduceBtn,
  removeProduct,
} from '../../STORE/reducers/cartRedecer'
import { useContext, useEffect } from 'react'
import { UserContext } from '../../operators/UserContext'
import { Link } from 'react-router-dom'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

const Products = () => {
  const { products, isLoading } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  // useEffect(() => {
  //   fetch(`http://localhost:4000/products`).then((resp) => {
  //     resp.json().then((products) => {
  //       console.log(products)
  //     })
  //   })
  // }, [])

  if (isLoading) {
    return (
      <div className='loading'>
        <h2>Loading...</h2>
      </div>
    )
  }

  return (
    <div className='container'>
      <div className='heading-product' id='products'>
        <h2>Current Products on Sale</h2>
      </div>
      <section className='list'>
        {products.map((items) => (
          <Display {...items} key={items._id} />
        ))}
      </section>
    </div>
  )
}

const Display = ({ image, name, price, _id, added, count, createdAt, author }) => {
  const dispatch = useDispatch()
  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    fetch(`http://localhost:4000/profile`).then((resp) =>
      resp.json().then((userData) => {
        setUser(userData)
      })
    )
  }, [])

  return (
    <div className='item' key={_id}>
      <Link to={`/product/${_id}`}>
        <img src={`http://localhost:4000/` + image} alt={name} />
      </Link>

      <p className='title'>{name}</p>
      <p>N {price.toLocaleString()}</p>

      {!added ? (
        <button
          onClick={() => {
            dispatch(addItems({ _id }))
            dispatch(productAdd({ _id }))
          }}
        >
          <span>Add to Cart</span>
        </button>
      ) : (
        <>
          <button
            onClick={() => {
              dispatch(increaseBtn(_id))
              dispatch(addBtn(_id))
            }}
            className='plus'
          >
            +
          </button>
          <button
            className='adderBtn'
            onClick={() => {
              dispatch(addToCart({ _id }))
            }}
          >
            {count}
          </button>
          <button
            onClick={() => {
              if (count == 0) return
              dispatch(decreaseBtn(_id))
              dispatch(reduceBtn(_id))
            }}
            className='plus'
          >
            -
          </button>
        </>
      )}
      {user && (
        <div className='extraBtn'>
          <button className='editPost'>Edit</button>
          <div className='time-ago'>
            <ReactTimeAgo date={createdAt} locale='en-US' />
            <Link to={`/product/${_id}`}>
              <button className='more-details'>More details</button>
            </Link>

            {/* <p>{author?.name}</p> */}
          </div>
          <button onClick={() => dispatch(removeProduct(_id))} className='deletePost'>
            Delete
          </button>
        </div>
      )}
    </div>
  )
}
export default Products
