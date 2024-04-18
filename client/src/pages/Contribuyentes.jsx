import { Link } from "react-router-dom";
import { Contexto } from '../context/Context';
import { useContext, useEffect, useState } from 'react';
import LoaderSvg from '../assets/Infinity-1s-200px.svg'
import Paginacion from '../components/Pagination';
// import Pagination from '@mui/material/Pagination';

const Contribuyentes = () => {
  const { data, loading, error } = useContext(Contexto)
  const [contribuyentes, setContribuyentes] = useState(null)
  const [results] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)
  
  const totalPages = Math.ceil(data.length / results)
  // console.log(totalPages, contribuyentes, data)
  
  useEffect(() => {
    setContribuyentes(data.slice((currentPage - 1) * results, results * currentPage))
  }, [data, currentPage, results])
  if (loading || !contribuyentes) {
    return <section className='loader'><img src={LoaderSvg} alt="loading" /></section>
  }
  if (error){
    return <section>Network error...</section>
  }

  return (
    <main className='content'>
     <h1>Contribuyentes</h1>
      <div style={{
        overflowX: 'auto'
      }}>
        <table>
          <thead>
            <tr>
              {/* <th>Id</th> */}
              <th>RncCedula</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Tipo</th>
              <th>estatus</th>
              <th>telefono</th>
              <th>email</th>
              <th>fecha de registro</th>
              <th>accion</th>
            </tr>
          </thead>  
          <tbody>
            {contribuyentes.map(({ ContribuyenteId, Nombre, RncCedula, Apellido, Tipo, Estatus, Telefono, Email, FechaRegistro }) => {
              return (
                <tr key={ContribuyenteId}>
                  {/* <td>{ContribuyenteId}</td> */}
                  <td>{RncCedula}</td>
                  <td>{Nombre}</td>
                  <td>{Apellido}</td>
                  <td>{Tipo}</td>
                  <td>{Estatus}</td>
                  <td>{Telefono}</td>
                  <td>{Email}</td>
                  <td>{FechaRegistro}</td>
                  <td>
                    <button><Link to={`/contribuyente/${ContribuyenteId}`}>Ver ncf</Link></button>
                  </td>
                </tr>
              )
          })}
          </tbody>
        </table>
      </div>
      <Paginacion gap={5} totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {/* <Pagination count={10} variant="outlined" shape="rounded" /> */}
    </main> 
  )
}

export default Contribuyentes 