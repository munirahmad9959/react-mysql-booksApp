import express from 'express'
import mysql from 'mysql'

const app = express()

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root@byteslasher9959',
    database: 'test'
})


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

app.listen(8800, () => {
    console.log("Connected to Backend!")
})
