class ProbeController {
    handleLivenessProbe(_, res) {
        res.sendStatus(200)
    }

    handleReadinessProbe(_, res) {
        res.sendStatus(200)
    }
}

module.exports = () => {
    const router = require("express").Router()
    const controller = new ProbeController()

    router.get("/liveness", (req, res) => {
        controller.handleLivenessProbe(req, res)
    })

    router.get("/readiness", (req, res) => {
        controller.handleReadinessProbe(req, res)
    })

    return router
}