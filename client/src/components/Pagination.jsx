import PropTypes from 'prop-types'

const Paginacion = ({
  gap,
  totalPages, 
  currentPage, 
  setCurrentPage
}) => {
  const handleNextClick = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }
  const handlePrevClick = () => {
    if (currentPage - 1 > 0) setCurrentPage(currentPage - 1)
  }
  return (
    <div className='pagination' style={{
      gap: gap + 'px'
    }}>
      <button onClick={handlePrevClick}>{'<'}</button>
        {
          new Array(totalPages).fill('#').map((el, i) => {
            if ((i + 1) === currentPage ){
              return <button key={i} className="currentButton" onClick={() => {
                setCurrentPage(i + 1)
              }}>{i + 1}</button>
            }
            return <button key={i} onClick={() => {
              setCurrentPage(i + 1)
            }}>{i + 1}</button>
          })
        }
        <button onClick={handleNextClick}>{'>'}</button>
    </div>
  )
}

export default Paginacion

Paginacion.propTypes = {
  gap: PropTypes.number,
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired
}