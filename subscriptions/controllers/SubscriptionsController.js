const validation = require('./Validation')
const domain = require('../domain/Subscription')

class SubscriptionsController {
    constructor(subscriptionRepository, logger) {
        this.subscriptionRepository = subscriptionRepository
        this.logger = logger
    }

    async handleGetSubscription(req, res) {

        const subscription = await this.subscriptionRepository.getSubscription()
        if (!subscription) {
            this.logger.error(`handleGetSubscription() getSubscription returned null`)
            res.status(404)
            res.send({"error": "subscription not found."})
            return
        }

        const result = this.transformToApiFormat(subscription)
        res.send(result)
    }

    async handleAddSubscription(req, res) {

        const subscription = this.transformToDomainFormat(req.body)
        if (subscription.error) {
            this.logger.error(`handleAddSubscription() transformToDomainFormat failed`) //  ${subscription.errors.subscription}
            res.status(400)
            res.send(subscription.errors)
            return
        }

        const original = await this.subscriptionRepository.getSubscription()
        try {
            await subscription.subscription.process(original)
        } catch (error) {
            this.logger.error(`handleAddSubscription() process failed ${error}`)
            res.status(422)
            res.send({"error": true, "errors": {"subscription": error}})
            return
        }

        await this.subscriptionRepository.addOrReplaceSubscription(subscription.subscription)
        const result = this.transformToApiFormat(subscription.subscription)
        res.send(result)
    }

    async handleCancelSubscription(req, res) {

        const subscription = await this.subscriptionRepository.getSubscription()
        if (!subscription) {
            this.logger.error(`handleCancelSubscription() getSubscription returned null`)
            res.status(404)
            res.send({"error": "subscription not found."})
            return
        }

        await subscription.cancel()
        await this.subscriptionRepository.addOrReplaceSubscription(subscription)
        const result = this.transformToApiFormat(subscription)
        res.send(result)
    }

    // This method will take a request body as specified in the OpenAPI
    // Spec and transform it into a Domain representation.
    transformToDomainFormat(body) {

        const {product, monthsPurchased} = body
        const subscriptionErrors = validation.validateSubscription(product, monthsPurchased)
        if (subscriptionErrors.length > 0) {
            this.logger.error(`Card validation errors: ${subscriptionErrors}`)
            return {"error": true, "errors": {"subscription": subscriptionErrors}}
        }

        const subscription = new domain.Subscription(product, monthsPurchased)
        return {"error": false, "subscription": subscription}
    }

    // This method will take a domain representation and transform it
    // into format as specified by the OpenAPI Spec.
    transformToApiFormat(subscription) {
        return {
            "product": subscription.product,
            "monthsPurchased": subscription.monthsPurchased,
            "status": subscription.status,
            "datePurchased": subscription.datePurchased,
            "dateExpires": subscription.dateExpires
        }
    }
}

module.exports = (repositories, logger) => {

    const controller = new SubscriptionsController(repositories.subscriptionsRepository, logger)
    const express = require('express')
    const router = express.Router()

    router.get('/', function (req, res) {
        controller.handleGetSubscription(req, res)
    })

    router.post('/', function (req, res) {
        controller.handleAddSubscription(req, res)
    })

    router.delete('/', function (req, res) {
        controller.handleCancelSubscription(req, res)
    })

    return router
}