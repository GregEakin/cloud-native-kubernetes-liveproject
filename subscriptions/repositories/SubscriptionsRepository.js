const domain = require('../domain/Subscription')
const subscriptionKey = "subscription"

class SubscriptionsRepository {
    constructor(redisClient) {
        this.redisClient = redisClient
    }

    async addOrReplaceSubscription(subscription) {
        let len = await this.redisClient.hlen(subscriptionKey)
        if (len > 0) await this.removeSubscription()

        const data = this.transformToRepositoryFormat(subscription)
        await this.redisClient.hmset(subscriptionKey, data)
    }

    async getSubscription() {
        let len = await this.redisClient.hlen(subscriptionKey)
        if (len <= 0) return null

        const data = await this.redisClient.hgetall(subscriptionKey)
        return this.transformToDomainFormat(data)
    }

    async removeSubscription() {
        let len = await this.redisClient.hlen(subscriptionKey)
        if (len <= 0) return

        let fields = await this.redisClient.hkeys(subscriptionKey)
        return await this.redisClient.hdel(subscriptionKey, fields)
    }

    // This method will transform a domain representation to its
    // corresponding repository representation.
    transformToRepositoryFormat(subscription) {

        return {
            "product": subscription.product,
            "monthsPurchased": subscription.monthsPurchased,
            "status": subscription.status,
            "datePurchased": subscription.datePurchased
        }
    }

    // This method will transform a repository representation to its
    // corresponding domain representation.
    transformToDomainFormat(data) {

        const {product, monthsPurchased, datePurchased, status} = data

        return new domain.Subscription(product, monthsPurchased, datePurchased, status)
    }
}

module.exports = (client) => new SubscriptionsRepository(client)
