const {ipcRenderer} = window.require('electron')


function resetAllListeners() {
    resetListener('encrypted-hash')
    resetListener('selected-file')
    resetListener('invalid-path')
}

function resetListener(channel){
    ipcRenderer.removeAllListeners(channel)
}

export default resetAllListeners