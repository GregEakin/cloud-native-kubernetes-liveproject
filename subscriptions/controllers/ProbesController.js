class ProbesController {

    async handleLiveness(req, res) {
        res.sendStatus(200)
    }

    async handleReadiness(req, res) {
        res.sendStatus(200)
    }
}

module.exports = (repositories) => {

    var controller = new ProbesController()
    var express = require('express')
    var router = express.Router()

    router.get('/liveness', function (req, res) {
        controller.handleLiveness(req, res)
    })

    router.get('/readiness', function (req, res) {
        controller.handleReadiness(req, res)
    })

    return router
}