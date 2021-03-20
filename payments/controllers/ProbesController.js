class ProbesController {

    async handleLiveness(req, res) {
        res.send({"ok": true})
    }

    async handleReadiness(req, res) {
        res.send({"ok": true})
    }
}

module.exports = (repositories) => {

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