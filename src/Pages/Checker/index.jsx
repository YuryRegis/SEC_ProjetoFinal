import * as Styled from './style'
import React, {useEffect, useState} from 'react'
import gif from '../../assets/images/loading.gif'
import gifError from '../../assets/images/error.gif'
import Button from '../../Components/Button'
import Input from '../../Components/Input'
import ResetListeners from '../../utils/resetListeners'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const {ipcRenderer} = window.require('electron')

function Checker() {
    const [isError, setIsError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [lastUpdate, setLastUpdate] = useState('.')
    const [hashInput, setHashInput] = useState('')
    const [filePath, setFilePath] = useState('')
    const [hash, setHash] = useState('')
    const [result, setResult] = useState('')


    function handleGenerate() {
        if(filePath==='' || hashInput==='') {
            setIsError(_ => true)
            return toast.error('Opa! Existe algum campo vazio?')
        }
        if (filePath === lastUpdate) 
            return 
        setLoading(_ => true)
        ipcRenderer.send('generate-hash', filePath)
    }

    function handleGetFile(){
        ipcRenderer.send('open-file-dialog')
    }

    function checkHashFile() {
        const check = hash === hashInput
        if (check)
            return 'HASH VÁLIDA'
        else 
            return 'OPA! HASH INVÁLIDA'
    }

    useEffect(() => {
        ResetListeners()
        ipcRenderer.on('encrypted-hash', (_, arg) => setHash(_ => arg))

        ipcRenderer.on('selected-dir', (_, path) => setFilePath(_ => path))

        ipcRenderer.on('invalid-path', (_, message) => {
            setLoading(_ => false)
            setIsError(_ => true)
            toast.error(message)
        })
    },[])

    useEffect(() => {
        if(isError)
            setTimeout(()=>{
                setIsError(_ => false)
            },5000)      
    }, [isError])

    useEffect(() => {
        setLastUpdate(filePath)
        setResult(_ => checkHashFile())
        setTimeout(()=>{
            setLoading(_ => false)
        }, 2000)
    }, [hash])

    useEffect(() => {
        setResult(_ => '')
    },[hashInput])

    return (
        <Styled.Container>
            
            <Styled.Title>Verificador de Hash</Styled.Title>

            <Styled.Text>Para verificar uma hash do seu arquivo, entre com a chave hash e importe o respectivo arquivo para o programa.</Styled.Text>

            <Styled.InputArea>
                
                <Input
                    label='Arquivo' 
                    placeholder='~\diretorio\do\arquivo'
                    onChange={e => setFilePath(e.target.value)}
                    value={filePath}
                />

                <Button onClick={handleGetFile} label='Localizar' />
                
            </Styled.InputArea>

            <Styled.InputArea>
                
                <Input
                    label='Hash' 
                    placeholder='SHA256'
                    onChange={e => setHashInput(e.target.value)}
                    value={hashInput}
                />

                <Button onClick={handleGenerate} label='Verificar'/>
                
            </Styled.InputArea>

            <Styled.Canvas>
                { loading 
                ? <Styled.LoadingImage src={gif}/>
                : isError 
                ? <Styled.LoadingImage src={gifError}/>
                : <Styled.Title alternative>{result}</Styled.Title>}
            </Styled.Canvas>
            
            <ToastContainer 
                position="bottom-left"
                theme='dark'
                limit={1}
            />
        </Styled.Container>
    )
}

export default Checker