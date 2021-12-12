const { exec } = require("child_process")


function screenCapture({event, command, type}) {
    
    exec(command, (error, stdout, stderr) => {
        const _error = error || stderr
        if(_error) {
            const message = 'Falha ao capturar tela.'
            event.sender.send('throw-error', message)
            event.sender.send('throw-end')
        }
        else {
            const message = type==='recorder' 
                ? `Vídeo capturado com sucesso!`
                : `Imagem capturada com sucesso!`
            event.sender.send('throw-success', message)
            event.sender.send('throw-end')
        }
    })
}


module.exports = screenCapture