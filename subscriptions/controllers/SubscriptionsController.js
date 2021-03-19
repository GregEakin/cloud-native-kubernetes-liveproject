const v = require('./Validation')
const domain = require('../domain/Subscription')

class SubscriptionsController {
    constructor(subscriptionRepository, logger) {
        this.subscriptionRepository = subscriptionRepository
        this.logger = logger
    }

    async handleGetSubscription(req, res) {
        // TODO: Implementation
        res.status(501)
        res.send({"error": "Not implemented."})
    }

    async handleAddSubscription(req, res) {
        // TODO: Implementation       
        res.status(501)
        res.send({"error": "Not implemented."})
    }

    async handleCancelSubscription(req, res) {
        // TODO: Implementation       
        res.status(501)
        res.send({"error": "Not implemented."})
    }

    // This method will take a request body as specified in the OpenAPI
    // Spec and transform it into a Domain representation.
    transformToDomainFormat(body) {

        const {product, monthsPurchased} = body

        const subscriptionErrors = v.validateSubscription(product, monthsPurchased)

        let foundError = false

        if (subscriptionErrors.length > 0) {
            this.logger.error(`Card validation errors: ${subscriptionErrors}`)
            foundError = true
        }

        if (foundError) {
            return {
                "error": true,
                "errors": {
                    "subscription": subscriptionErrors
                }
            }
        }

        const subscription = new domain.Subscription(product, monthsPurchased)

        return {
            "error": false,
            "subscription": subscription
        }
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

    const controller = new SubscriptionsController(repositories.subscriptionsRepository, logger);
    const express = require('express');
    const router = express.Router();

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