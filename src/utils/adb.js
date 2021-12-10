const { exec } = require("child_process")


function adb(command, label, event, query, isFinished) {
    exec(command, (error, stdout, stderr) => {
        if(error) {
            const msg = error.message.split(':')
            const message = msg[msg.length - 1]
            event.sender.send('throw-error', message)
        }
        const info = error?.message || stdout || stderr
        const message = `${label}: ${info}\n`
        event.sender.send(query, {message, isFinished})
    })
}


module.exports = adb