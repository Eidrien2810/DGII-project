import { useContext, useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import LoaderSvg from '../assets/Infinity-1s-200px.svg'
import { Contexto } from '../context/Context'

const Contribuyente = () => {
  const { data } = useContext(Contexto)
  const [contribuyente, setContribuyente] = useState(null)
  const [comprobantes, setComprobantes] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true)
        const found = await data.find(el => el.ContribuyenteId.toString() === id)
        setContribuyente(found || null)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [data, id])

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true)
        const response = await fetch('http://localhost:1234/api/comprobantes')
        const jsonData = await response.json()
        if (contribuyente !== null){
          const found = jsonData.filter(el => el.RncCedula === contribuyente.RncCedula)
          setComprobantes(found || null)
        }
      } catch (error) {
        console.error("Error fetching comprobantes: ", error)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [contribuyente])
  if (isLoading) {
    return <section className='loader'><img src={LoaderSvg} alt="loading" /></section>
  }
  if  (!contribuyente || !comprobantes) {
    if ((Number(id) > data.length || Number(id) < 1) && Number(id) !== 0){
      return <Navigate to="/*" />
    }
    return <section>Network error...</section>
  }
  
  const totalItbis = comprobantes.reduce((prev, el) => prev + parseFloat(el.Itbis), 0)
  return (
    <main className='content--contribuyente'>
      <h1>{contribuyente.Nombre} {contribuyente.Apellido} </h1>
      <h2>Lista de comprobantes</h2>
      <div style={{
        overflowX: 'auto'
      }} >
      <table border={1} className='table--contribuyentes'>
        <thead>
          <tr>
            {/* <th>id</th> */}
            <th>ncf</th>
            <th>rncCedula</th>
            <th>monto</th>
            <th>itbis</th>
            <th>fecha de emision</th>
            <th>tipo</th>
            <th>estado</th>
            <th>tasa de itbis</th>
          </tr>
        </thead>
        <tbody>
          {
          comprobantes.map(({ComprobanteId, Estado, FechaEmision, Itbis, Monto, NCF, RncCedula, TasaItbis, TipoComprobante}) => {
            return <tr key={ComprobanteId}>
              {/* <td>{ComprobanteId}</td> */}
              <td>{NCF}</td>
              <td>{RncCedula}</td>
              <td>{Monto}</td>
              <td>{Itbis}</td>
              <td>{FechaEmision}</td>
              <td>{TipoComprobante}</td>
              <td>{Estado}</td>
              <td>{TasaItbis}</td>
            </tr>
          })
        }
        </tbody>
      </table>
      </div>
      
      <h2>Suma itbis</h2>
      <p>
        {
          new Intl.NumberFormat('es-DO', { style: 'currency', currency: 'DOP' }).format(totalItbis)
        }
      </p>
      {
        Number(id) > 1 && <button className='btn'><Link to={`/contribuyente/${Number(id) - 1}`} replace>Ir hacia atras</Link></button>
      }
      {
        Number(id) < data.length && <button className='btn'><Link to={`/contribuyente/${Number(id) + 1}`} replace>Ir hacia adelante</Link></button>
      } 
    </main>
  )
}
export default Contribuyente