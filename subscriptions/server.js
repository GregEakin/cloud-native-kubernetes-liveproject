const bodyParser = require("body-parser")
const express = require("express")
const logger = require('pino')()
const config = JSON.parse(require('fs').readFileSync('./config', 'utf8'))
const app = express();

app.use(bodyParser.json());

const loadRepositories = require("./repositories")
const loadControllers = require("./controllers")

const repositories = loadRepositories(config)
const controllers = loadControllers(app, repositories, logger)

const server_port = config.subscriptions.port
app.listen(server_port, () => {
    logger.info(`Server is running on port ${server_port}.`)
})
