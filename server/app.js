import { getConnection, mssql } from './sql_connection.js'
import express, { request } from 'express'
import cors from 'cors'

const server = express()
server.use(express.json())
server.use(cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = [
      'http://localhost:5173',
      'http://localhost:1234',
      'http://localhost:5500',
      'http://127.0.0.1:5500'
    ]

    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
      return callback(null, true)
    }
    return callback(new Error('Not allowed by CORS'))
  }
}))

const getComprobantes = async () => {
  try {
    const pool = await getConnection()
    const result = await pool.request().query('exec mostrarComprobantes')
    return result
  } catch (error) {
    console.error(error)
  }
}
const getContribuyentes = async () => {
  try {
    const pool = await getConnection()
    const result = await pool.request().query('exec mostrarContribuyentes')
    return result
  } catch (error) {
    console.error(error)
  }
}
const getDirecciones = async () => {
  try {
    const pool = await getConnection()
    const result = await pool.request().query('exec mostrarDirecciones')
    return result
  } catch (error) {
    console.error(error)
  }
}

server.get('/', (req, res) => {
  res.send(`<a href="/api/contribuyentes">Contribuyentes</a><br/><a href="/api/comprobantes">Comprobantes</a>`)
})

server.get('/api/contribuyentes', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const contribuyentes = await getContribuyentes()
  const direcciones = await getDirecciones()
  const newContribuyentes = contribuyentes.recordset.map(obj => {
    const Direccion = direcciones.recordset.find(dir => obj.DireccionId === dir.DireccionId)
    return {
      ...obj,
      Direccion
    }
  })
  res.json(newContribuyentes)
})

server.get('/api/comprobantes', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  getComprobantes()
  .then(data => res.json(data.recordset))
})

const PORT = process.env.PORT ?? 1234

server.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})


