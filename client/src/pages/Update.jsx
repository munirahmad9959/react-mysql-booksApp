import React, { useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'

const Update = () => {

  const navigate = useNavigate()
  const location = useLocation()

  const bookId = location.pathname.split("/")[2];

  const [book, setBook] = useState({
    title: '',
    desc: '',
    price: '',
    cover: ''
  })

  const handleChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value
    })
  }

  const handleClick = async (e) => {
    e.preventDefault()
    try {
      await axios.put('http://localhost:8800/books/' + bookId, book)
      navigate('/')

    } catch (error) {
      console.log("Error adding book", error);
    }
  }

  return (
    <div className='form'>
      <h1>Update the Book</h1>
      <input type="text" placeholder='Enter Title' onChange={handleChange} name='title' />
      <input type="text" placeholder='Enter Description' onChange={handleChange} name='desc' />
      <input type="number" placeholder='Enter price' onChange={handleChange} name='price' />
      <input type="text" placeholder='cover' onChange={handleChange} name='cover' />
      <button className='formButton' onClick={handleClick}>Update</button>
    </div>
  )
}

export default Update
