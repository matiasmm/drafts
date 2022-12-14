var portAudio = require('naudiodon');

module.exports = {}


function getDefaultDevices () {
    const {defaultHostAPI, HostAPIs: host} = portAudio.getHostAPIs()
    return [host[defaultHostAPI].defaultInput, host[defaultHostAPI].defaultOutput]
}

function onChangeOutput (cb) {
    let currentOut = -1
    return setInterval(() => {
        const [_, newOutput] = getDefaultDevices()
        if (currentOut !== newOutput) {
            currentOut = newOutput
            cb(newOutput)
        }
    }, 1000)
}

module.exports.getDefaultDevices = getDefaultDevices
module.exports.onChangeOutput = onChangeOutput
