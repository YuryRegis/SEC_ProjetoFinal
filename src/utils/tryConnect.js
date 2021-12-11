const { exec } = require("child_process")


function tryConnect(event) {
    const command = 'adb shell getprop ro.product.manufacturer'
   
    exec(command, (error, stdout, stderr) => {
        if(stdout) {
            const message = `Dispositivo ${stdout} detectado!`
            event.sender.send('throw-success', message)
        }
        else {
            const _error = error || stderr
            const message = 'Nenhum dispositivo detectado.'
            event.sender.send('throw-error', message)
        }
    })
}


module.exports = tryConnect