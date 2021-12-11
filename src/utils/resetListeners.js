const {ipcRenderer} = window.require('electron')


const listeners = [
    'encrypted-hash',
    'invalid-path',
    'selected-file',
    'selected-dir',
    'selected-destiny',
    'monitor-response',
    'write-data',
    'throw-success',
    'throw-error'
]

function resetAllListeners() {
    listeners.map(listener => resetListener(listener))
}

function resetListener(channel){
    ipcRenderer.removeAllListeners(channel)
}

export default resetAllListeners