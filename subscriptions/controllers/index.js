module.exports = (app, repositories, logger) => {
    const loadSubscriptionsController = require('./SubscriptionsController')
    app.use("/api/subscriptions", loadSubscriptionsController(repositories, logger))

    const loadProbesController = require('./ProbesController')
    app.use("/probes", loadProbesController())
}

