import { createContext, useContext, useEffect } from 'react'
import { useState } from 'react'

export const Contexto = createContext()

export const Datos = ({ children }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
      fetch('http://localhost:1234/api/contribuyentes')
      .then(async res => await res.json())
      .then(async data => {
        setData(data)
      })
      .catch(err => {
        console.error(new Error('Network response was not ok', err))
        setError(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [error])
  return (
    <Contexto.Provider value={{ data, loading, error }}>
      { children }
    </Contexto.Provider>
  )
}