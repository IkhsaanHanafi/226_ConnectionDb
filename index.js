import express from 'express'
import pg from 'pg'

const app = express()
const port = 3000
const { Pool } = pg

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'Baguskampus18',
  database: 'mahasiswa',
})

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Gagal connect ke database:', err.stack)
  }
  console.log('Berhasil connect ke database PostgreSQL')
  release()
})

app.get('/', (req, res) => {
  res.send('API Connection DB jalan')
})

// GET semua data biodata
app.get('/biodata', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM biodata ORDER BY id ASC')
    res.status(200).json({
      success: true,
      data: result.rows,
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({
      success: false,
      message: 'Server error',
    })
  }
})

app.listen(port, () => {
  console.log(`Server jalan di http://localhost:${port}`)
})