import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Product = () => {
  const [details, setDetails] = useState([])
  const { id } = useParams()

  useEffect(() => {
    fetch(`http://localhost:4000/product/${id}`).then((resp) =>
      resp.json().then((userData) => setDetails(userData))
    )
  }, [])
  const { name, price, image, content } = details
  return (
    <div className='product-details'>
      <h2>{name?.toUpperCase()}</h2>
      <img src={'http://localhost:4000/' + image} />

      <div className='time-ago'>{/* <ReactTimeAgo date={createdAt} locale='en-US' /> */}</div>
      <div className='fullprice'>
        <p>N {price?.toLocaleString()}</p>
      </div>
      <h3 className='more-detail'>More Product Details</h3>
      <div className='inner-html' dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}
export default Product
