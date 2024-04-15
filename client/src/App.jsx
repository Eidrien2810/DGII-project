import { BrowserRouter, Routes, Route} from 'react-router-dom'
import ErrorPage from './ErrorPage.jsx'
import Contribuyente from './pages/Contribuyente.jsx'
import Contribuyentes from './pages/Contribuyentes.jsx'
import { Datos } from './context/Context.jsx'
import './App.css'

function App() {
  return (
    <Datos>
      <BrowserRouter>
        <Routes>
            <Route path='/contribuyentes' element={<Contribuyentes/>}/>
            <Route path='/contribuyente/:id' element={<Contribuyente/>}/>
            <Route path='*' element={<ErrorPage/>}/>
          {/* <Route path='/errorPage' element={<ErrorPage/>}/> */}
        </Routes>
      </BrowserRouter>  
    </Datos>
  )
}

export default App