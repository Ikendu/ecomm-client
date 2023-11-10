import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Navigate } from 'react-router-dom'

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image'],
    ['clean'],
  ],
}

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
]

const Post = () => {
  const [product, setProduct] = useState(``)
  const [price, setPrice] = useState()
  const [content, setContent] = useState(``)
  const [files, setFile] = useState(``)
  const [redirect, setRedirect] = useState(false)

  const postItems = async (e) => {
    e.preventDefault()
    const data = new FormData()
    data.set(`product`, product)
    data.set(`price`, price)
    data.set(`content`, content)
    data.set(`file`, files[0])
    console.log(files)

    const resp = await fetch(`http://localhost:4000/post`, {
      method: `POST`,
      body: data,
      //header: { 'Content-Type': 'application/json' },
    })
    resp.ok && setRedirect(true)
  }
  if (redirect) {
    return <Navigate to={`/`} />
  }
  return (
    <div className='post'>
      <form onSubmit={postItems}>
        <h2>Create New Sales</h2>
        <input
          type='text'
          placeholder='Product name'
          value={product}
          onChange={(e) => setProduct(e.target.value)}
        />

        <input type='file' onChange={(e) => setFile(e.target.files)} />

        <input
          type='number'
          placeholder='Price'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <ReactQuill
          modules={modules}
          formats={formats}
          value={content}
          onChange={(newValue) => setContent(newValue)}
        />
        <input type='submit' className='btn' />
      </form>
    </div>
  )
}
export default Post
