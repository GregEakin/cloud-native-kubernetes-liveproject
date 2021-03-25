class ProbesController {

    async handleLiveness(req, res) {
        res.send({
            "serviceName": "payments",
            "status": true
        });
    }

    async handleReadiness(req, res) {
        res.send({
            "serviceName": "payments",
            "status": true
        });
    }
}

module.exports = () => {

    const controller = new ProbesController()
    const express = require('express')
    const router = express.Router()

    router.get('/liveness', function (req, res) {
        controller.handleLiveness(req, res)
    })

    router.get('/readiness', function (req, res) {
        controller.handleReadiness(req, res)
    })

    return router
}