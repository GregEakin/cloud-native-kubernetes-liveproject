const axios = require('axios').default
const moment = require('moment')
const logger = require('pino')()
const config = JSON.parse(require('fs').readFileSync('./config', 'utf8'))

const pricePerMonth = config.subscriptions.pricePerMonth
const paymentUrl = `http://${config.payments.host}:${config.payments.port}/api/payment-methods/process`

// This class is the Domain specification for a Subscription.
class Subscription {

    constructor(product, monthsPurchased, datePurchased = moment.utc().toISOString(), status = "pending") {
        this.product = product,
            this.monthsPurchased = monthsPurchased,
            this.datePurchasedInternal = moment(datePurchased)
        this.status = status
    }

    get datePurchased() {
        return this.datePurchasedInternal.toISOString()
    }

    get subscriptionEndDate() {
        return this.datePurchasedInternal.clone().add(this.monthsPurchased, 'months')
    }

    get dateExpires() {
        return this.subscriptionEndDate.toISOString()
    }

    get isActive() {

        if (!this.status || this.status !== "active") {
            return false
        }

        return this.datePurchasedInternal.isBefore(moment.utc())
    }

    // Returns the active months remaining for the subscription.
    get activeMonthsRemaining() {

        if (!this.isActive) {
            return 0
        }

        const diff = moment.duration(this.subscriptionEndDate.diff(moment.utc()))
        const months = diff.asMonths()

        return months <= 0 ? 0 : months

    }

    // Processes a payment for refund for the changes to a subscription
    // given the original subscription data.
    async process(originalSubscription) {

        const currentMonths = this.monthsPurchased
        let originalMonths = 0

        if (originalSubscription != null && originalSubscription.isActive) {
            originalMonths = originalSubscription.monthsPurchased
        }

        const diff = currentMonths - originalMonths

        if (diff === 0) {
            this.status = "active"
            return
        }

        if (diff < 0) {
            await this.processRefund(diff * -1 * pricePerMonth)
        } else {
            await this.processPayment(diff * pricePerMonth)
        }

        this.status = "active"
    }

    // This method cancels a subscription if it is active.
    async cancel() {

        if (!this.isActive) {
            logger.info("Subscription is not active. Not cancelling.")
            return
        }

        const amount = this.activeMonthsRemaining * pricePerMonth

        if (amount > 0) {
            logger.info(`Refunding: ${amount}`)
            await this.processRefund(amount)
        } else {
            logger.info("No refund.")
        }

        this.status = "cancelled"
    }

    // This method will process a payment on the current subscription
    // for the given amount.
    async processPayment(amount) {
        logger.info(`processPayment ${amount}`)

        const request = {type: 'payment', amount: amount}
        const res = await axios.post(paymentUrl, request)
        logger.info(`Got response from payment: ${res.data.status}`)
    }

    // This method will process a refund on the current subscription
    // for the given amount.
    async processRefund(amount) {
        logger.info(`processRefund ${amount}`)

        const request = {type: 'refund', amount: amount};
        const res = await axios.post(paymentUrl, request)
        logger.info(`Got response from refund: ${res.data.status}`)
    }
}

module.exports = {
    Subscription
}
