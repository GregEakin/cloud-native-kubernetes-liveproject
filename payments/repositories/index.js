let makeRedisClient = (config) => {

    const redis = require("async-redis")
    const options = {
        host: config.redis.host,
        port: config.redis.port,
        password: process.env.REDIS_PASSWORD
    }

    return redis.createClient(options)
}

module.exports = (config) => {

    const redisClient = makeRedisClient(config)
    const paymentsRepo = require('./PaymentsRepository')(redisClient)

    return {paymentsRepository: paymentsRepo}
}
