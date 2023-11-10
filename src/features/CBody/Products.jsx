import './body.css'

import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {
  addBtn,
  addItems,
  addToCart,
  decreaseBtn,
  getCartItems,
  increaseBtn,
  productAdd,
  reduceBtn,
} from '../../STORE/reducers/cartRedecer'
import { useEffect } from 'react'

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

  useEffect(() => {
    dispatch(getCartItems)
  }, [])

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  return (
    <div className='container'>
      <div className='heading-product' id='products'>
        <h2>Current Products on Sale</h2>
      </div>
      <section className='list'>
        {products.map((items) => (
          <Display {...items} key={items.id} />
        ))}
      </section>
    </div>
  )
}

const Display = ({ image, name, price, id, added, count }) => {
  const dispatch = useDispatch()

  return (
    <div className='item' key={id}>
      <img src={image} alt={name} />
      <p className='title'>{name}</p>
      <p>N {price.toLocaleString()}</p>
      {!added ? (
        <button
          onClick={() => {
            dispatch(addItems({ id }))
            dispatch(productAdd({ id }))
          }}
        >
          <span>Add to Cart</span>
        </button>
      ) : (
        <>
          <button
            onClick={() => {
              dispatch(increaseBtn(id))
              dispatch(addBtn(id))
            }}
            className='plus'
          >
            +
          </button>
          <button
            className='adderBtn'
            onClick={() => {
              dispatch(addToCart({ id }))
            }}
          >
            {count}
          </button>
          <button
            onClick={() => {
              if (count == 0) return
              dispatch(decreaseBtn(id))
              dispatch(reduceBtn(id))
            }}
            className='plus'
          >
            -
          </button>
        </>
      )}
    </div>
  )
}
export default Products
