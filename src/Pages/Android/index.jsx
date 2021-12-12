import * as Styled from './style'
import React, {useEffect, useState} from 'react'
import gif from '../../assets/images/circularLoading.gif'
import saveIcon from '../../assets/images/saveIcon.png'
import Button from '../../Components/Button'
import Input from '../../Components/Input'
import ResetListeners from '../../utils/resetListeners'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import successAudio from '../../assets/sounds/success.mp3'
import errorAudio from '../../assets/sounds/error.mp3'

const {ipcRenderer} = window.require('electron')

function Android() {
    const [isError, setIsError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [filePath, setFilePath] = useState('')
    const [textMonitor, setTextMonitor] = useState('')
    const [label, setLabel] = useState('')


    function hasDir() {
        if(filePath==='') {
            toast.error('Opa! Diretório de destino vazio.')
            return false
        } else return true
    }

    function handleGetDir(){
        ipcRenderer.send('open-dir-dialog')
    }

    function handleGetInfo() {
        setLoading(_ => true)
        setTextMonitor(_ => '')
        setLabel(_ => 'info')
        ipcRenderer.send('adb-get-info')
    }

    function handleGetGlobal() {
        setLoading(_ => true)
        setTextMonitor(_ => '')
        setLabel(_ => 'global_info')
        ipcRenderer.send('adb-get-global')
    }

    function handleGetActivity() {
        setLoading(_ => true)
        setTextMonitor(_ => '')
        setLabel(_ => 'activity')
        ipcRenderer.send('adb-get-activity')
    }

    function handleGetContacts() {
        setLoading(_ => true)
        setTextMonitor(_ => '')
        setLabel(_ => 'contacts')
        ipcRenderer.send('adb-get-contacts')
    }

    function handleSaveContent() {
        if(!hasDir()) 
            return
        setLoading(_ => true)
        const path = `${filePath.replace(/\\/g,'/')}/${label}`
        ipcRenderer.send('write-file', {path, content: textMonitor}) 
    }

    
    useEffect(() => {
        ResetListeners()

        ipcRenderer.send('adb-try-connect')

        ipcRenderer.on('selected-dir', (_, path) => setFilePath(_ => path))

        ipcRenderer.on('invalid-path', (_, message) => {
            setLoading(_ => false)
            setIsError(_ => true)
            toast.error(message)
        })

        ipcRenderer.on('monitor-response', (_, arg) => {
            const {message, isFinished} = arg
            if(isFinished)
                setLoading(_ => false)
            return setTextMonitor(text => text + `>_ ${message}`)
        })

        ipcRenderer.on('throw-error', (_, message) => {
            setLoading(_ => false)
            setIsError(_ => true)
            toast.error(message)
        })

        ipcRenderer.on('throw-success', (_, message) => {
            setLoading(_ => false)
            setIsError(_ => false)
            setIsSuccess(_ => true)
            toast.success(message)
        })
        
    },[])

    useEffect(() => {
        if(isSuccess) {
            new Audio(successAudio).play()
            setTimeout(setIsSuccess(_ => false),3000)
        }
    },[isSuccess])

    useEffect(() => {
        if(isError) {
            new Audio(errorAudio).play()
            setTimeout(setIsError(_ => false),3000)
        }
    },[isError])

    return (
        <Styled.Container>
            
            <Styled.Title>Ferramentas Android</Styled.Title>

            <Styled.Text>Para utilzar as ferramentas Android, certifique-se de ter instalado o ADB e de adicioná-lo ao PATH de variáveis do sistema operacional.</Styled.Text>

            <Styled.InputArea>
                
                <Input
                    label='Diretório' 
                    placeholder='~\diretorio\de\destino\para\beckup'
                    onChange={e => setFilePath(e.target.value)}
                    value={filePath}
                />

                <Button onClick={handleGetDir} label='Localizar' />
                
            </Styled.InputArea>
            
            <Styled.ButtonsArea>
                <Button onClick={handleGetActivity} label='Atividade'/>
                <Button onClick={handleGetContacts} label='Contatos'/>
                <Button onClick={handleGetInfo} label='Info'/>
                <Button onClick={handleGetGlobal} label='Info Global' />
            </Styled.ButtonsArea>
                  
            <Styled.Canvas>

                <Styled.TextArea>
                    <Styled.Text>Monitor:</Styled.Text>
                    { loading && <Styled.LoadingImage src={gif}/> } 
                </Styled.TextArea>

                <Styled.Monitor>
                    <Styled.TextMonitor>{textMonitor}</Styled.TextMonitor>
                </Styled.Monitor>

                { textMonitor!=='' && <Styled.SaveIcon 
                    onClick={handleSaveContent} 
                    src={saveIcon}/>
                }

            </Styled.Canvas>
            
            <ToastContainer 
                position="bottom-left"
                theme='dark'
                limit={1}
            />
        </Styled.Container>
    )
}

export default Android