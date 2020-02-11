import express from 'express'
import expressWs from 'express-ws'
import * as controllers from './controllers'

const port = parseInt(process.env.PORT, 10) || 8080
const app = express()
expressWs(app)

app.use('/', controllers.meta.getRouter())
app.use('/map', controllers.map.getRouter())

app.listen(port, () => {
  // tslint:disable-next-line: no-console
  console.log(`Server started at http://localhost:${port}`)
})
