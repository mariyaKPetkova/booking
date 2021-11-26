const express = require('express');

const databaseConfig = require('./config/database.js');
const { PORT } = require('./config/index.js');
const expressConfig = require('./config/express.js')
const routesConfig = require('./config/routes.js')

start()
async function start() {

    const app = express()
    await databaseConfig(app)
    expressConfig(app)

    routesConfig(app)

    

    app.listen(PORT, () => {
        console.log(`App started at http://localhost:${PORT}`)
    })
}
