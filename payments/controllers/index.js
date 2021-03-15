module.exports = (app, repositories, logger) => {
    const loadPaymentsController = require('./PaymentsController')
    app.use("/api/payment-methods", loadPaymentsController(repositories, logger))

    const loadProbeController = require('./ProbeController')
    app.use("/probe", loadProbeController())
}
