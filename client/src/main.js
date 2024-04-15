const totalPages = 10,
  currentPage = 6
function paginacion() {
  const arr = new Array(totalPages).fill(0).map((el, i) => i + 1)
  const myArr = []
  if ((currentPage - 1) > 3 && (totalPages - currentPage) > 3) {
    myArr.unshift(1, '...')
    myArr.push('...', totalPages)
    myArr.splice(Math.floor(myArr.length / 2), 0, currentPage - 1, currentPage, currentPage + 1)
    return myArr
  }
  if ((currentPage - 1) > 3) {
    myArr.unshift(1)
  }
  if ((totalPages - currentPage) > 3) {
    myArr.unshift(1, '...')
  }
}
console.log(paginacion())