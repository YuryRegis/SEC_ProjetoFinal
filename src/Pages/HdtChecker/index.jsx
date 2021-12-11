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

function HdtChecker() {
    const [isError, setIsError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [lastUpdate, setLastUpdate] = useState('.')
    const [destiny, setDestiny] = useState('')
    const [filePath, setFilePath] = useState('')
    const [hash, setHash] = useState('')
    const [result, setResult] = useState('')


    function handleGenerate() {
        if(filePath==='' || destiny==='') {
            setIsError(_ => true)
            return toast.error('Opa! Existe algum campo vazio?')
        }
        if (filePath === lastUpdate) 
            return 
        setLoading(_ => true)
        setTimeout(()=>ipcRenderer.send('generate-bulk-hash',
         {path:filePath, destiny}), 2000)
    }

    function handleGetFile(){
        ipcRenderer.send('open-file-dialog', ['txt'])
    }

    function handleGetDir(){
        ipcRenderer.send('open-dir-dialog')
    }

    useEffect(() => {
        ResetListeners()
        ipcRenderer.on('encrypted-hash', (_, arg) => setHash(_ => arg))

        ipcRenderer.on('selected-file', (_, path) => setFilePath(_ => path))

        ipcRenderer.on('selected-dir', (_, path) => setDestiny(_ => path))

        ipcRenderer.on('throw-success', (_,arg) => toast.success(arg))
        
        ipcRenderer.on('throw-end', () => setLoading(_ => false)) 

        ipcRenderer.on('write-data', (_, arg) => ipcRenderer.send('write-file', arg))
        
        ipcRenderer.on('throw-error', (_,arg) => { 
            toast.error(arg)
            setIsError(_ => true)
            setLoading(_ => false) 
        })
        
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
            setLoading(_ => false)
        }, 2000)
    }, [hash])


    return (
        <Styled.Container>
            
            <Styled.Title>Verificador Hash Developer Tool</Styled.Title>

            <Styled.Text>Para verificar hash de vários arquivos simultaneamente, importe o arquivo "hash.txt" gerado pela ferramenta Hash Developer Tool (HDT).</Styled.Text>

            <Styled.InputArea>
                
                <Input
                    label='Arquivo' 
                    placeholder='~\diretorio\do\arquivo\hash.txt'
                    onChange={e => setFilePath(e.target.value)}
                    value={filePath}
                />

                <Button onClick={handleGetFile} label='Localizar' />
                
            </Styled.InputArea>

            <Styled.InputArea>
                
                <Input
                    label='Destino' 
                    placeholder='~\diretorio\de\destino'
                    onChange={e => setDestiny(e.target.value)}
                    value={destiny}
                />

                <Button onClick={handleGetDir} label='Localizar'/>
                
            </Styled.InputArea>

            <Styled.Canvas>
                { loading 
                ? <Styled.LoadingImage src={gif}/>
                : isError 
                ? <Styled.LoadingImage src={gifError}/>
                : <Styled.Title alternative>{result}</Styled.Title>}
            </Styled.Canvas>

            <Button onClick={handleGenerate} label='Verificar HASH'/>
            
            <ToastContainer 
                position="bottom-left"
                theme='dark'
                limit={1}
            />
        </Styled.Container>
    )
}

export default HdtChecker