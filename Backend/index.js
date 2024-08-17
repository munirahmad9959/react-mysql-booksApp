import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express()

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root@byteslasher9959',
    database: 'test'
})

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.json("Hello this is the backend")
})

app.get('/books', (req, res) => {
    const q = "select * from books"
    db.query(q, (err, result) => {
        if (err) {
            res.json(err)
        }
        res.json(result)
    })
})

app.post('/books', (req, res) => {
    const q = "INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover
    ]

    db.query(q, [values], (err, result) => {
        if (err) {
            return res.json(err)
        }
        return res.json(`Book has been created and added successfully to the database!`)
    })
});

app.delete('/books/:id', (req, res) => {
    const bookId = req.params.id
    const q = "DELETE FROM books WHERE id = ?"

    db.query(q, [bookId], (err, result) => {
        if (err) {
            return res.json(err)
        }
        return res.json(`Book with id ${bookId} has been deleted successfully!`)
    })
});

app.put('/books/:id', (req, res) => {
    const bookId = req.params.id
    const q = "UPDATE books SET `title` = ?, `desc` = ?, `price`= ?, `cover` = ? WHERE id = ? "

    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover
    ]

    db.query(q, [...values, bookId], (err, result) => {
        if (err) {
            return res.json(err)
        }
        return res.json(`Book with id ${bookId} has been updated successfully!`)
    })
});



app.listen(8800, () => {
    console.log("Connected to Backend!")
})
