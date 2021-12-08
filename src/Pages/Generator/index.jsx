import * as Styled from './style'
import React, {useEffect, useState} from 'react'
import gifSearch from '../../assets/images/loading.gif'
import gifError from '../../assets/images/error.gif'
import Button from '../../Components/Button'
import Input from '../../Components/Input'
import ResetListeners from '../../utils/resetListeners'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const {ipcRenderer} = window.require('electron')

function Generator() {
    const [loading, setLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [filePath, setFilePath] = useState('')
    const [lastUpdate, setLastUpdate] = useState('.')
    const [hash, setHash] = useState('')

    function handleGenerate() {
        if(filePath === '') {
            setIsError(_ => true)
            return toast.error('Opa! Existe algum campo vazio?')
        }
        if (filePath === lastUpdate) 
            return
            
        setLoading(loading => true)
        ipcRenderer.send('generate-hash', filePath)
    }

    function handleGetFile() {
       ipcRenderer.send('open-file-dialog')
    }

    useEffect(() => {
        ResetListeners()
        ipcRenderer.on('encrypted-hash', (_, arg) => setHash(_ => arg))

        ipcRenderer.on('selected-file', (_, path) => setFilePath(_ => path))

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
        setTimeout(()=>{
            setLoading(loading => false)
        }, 2000)
    }, [hash])
   
    return (
        <Styled.Container>
            
            <Styled.Title>Gerador de Hash</Styled.Title>

            <Styled.Text>Para gerar uma hash do seu arquivo, importe-o para o programa.</Styled.Text>

            <Styled.InputArea>
                
                <Input
                    label='Arquivo' 
                    placeholder='~\diretorio\do\arquivo'
                    onChange={e => setFilePath(e.target.value)}
                    value={filePath}
                />

                <Button onClick={handleGetFile} label='Localizar' />
                
            </Styled.InputArea>

            <Styled.Canvas>
                { loading 
                ? <Styled.LoadingImage src={gifSearch}/>
                : isError 
                ? <Styled.LoadingImage src={gifError}/>
                : (hash==='') 
                ? (<React.Fragment/>) 
                : <>
                    <Styled.Text>HASH:</Styled.Text>
                    <Styled.Text size={'12px'}>{hash}</Styled.Text>
                  </> }
            </Styled.Canvas>

            <Button onClick={handleGenerate} label='Gerar Hash'/>

            <ToastContainer
                position="bottom-left"
                theme='dark'
                limit={1}
            />

        </Styled.Container>
    )
}

export default Generator