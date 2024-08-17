import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Add = () => {

    const navigate = useNavigate()

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
            await axios.post('http://localhost:8800/books', book)
            navigate('/')

        } catch (error) {
            console.log("Error adding book", error);
        }
    }

    return (
        <div className='form'>
            <h1>Add New Book</h1>
            <input type="text" placeholder='Enter Title' onChange={handleChange} name='title' />
            <input type="text" placeholder='Enter Description' onChange={handleChange} name='desc' />
            <input type="number" placeholder='Enter price' onChange={handleChange} name='price' />
            <input type="text" placeholder='cover' onChange={handleChange} name='cover' />
            <button className='formButton' onClick={handleClick}>Add</button>
        </div>
    )
}

export default Add
