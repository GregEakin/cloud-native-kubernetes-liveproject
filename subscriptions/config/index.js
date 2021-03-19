let determineConfigDir = () => {

    if(process.env.CONFIG_DIR === undefined || process.env.CONFIG_DIR == null) {
        return '.'
    }

    return process.env.CONFIG_DIR
}

let determineConfigFile =() => {

    const config_dir = determineConfigDir()
    return `${config_dir}/config.json`
}

module.exports = function() {
        
    const configFile = determineConfigFile()
    return require(configFile)
}