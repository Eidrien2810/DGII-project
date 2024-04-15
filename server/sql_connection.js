import mssql from 'mssql'

const config = {
  server: "DESKTOP-E763SD0",
  user: "code",
  password: "123",
  database: 'DGII',
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
}

export async function getConnection() {
  try {
    return await mssql.connect(config)
  } catch (err) {
    console.error(err)
  }
}
export { mssql }