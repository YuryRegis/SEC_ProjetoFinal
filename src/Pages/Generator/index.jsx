import * as Styled from './style'
import React, {useEffect, useState} from 'react'
import gifSearch from '../../assets/images/loading.gif'
import gifError from '../../assets/images/error.gif'
import Button from '../../Components/Button'
import Input from '../../Components/Input'
import DashLine from '../../Components/DashLine'
import ResetListeners from '../../utils/resetListeners'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import successAudio from '../../assets/sounds/success.mp3'
import errorAudio from '../../assets/sounds/error.mp3'

const {ipcRenderer} = window.require('electron')

function Generator() {
    const [isSuccess, setIsSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [filePath, setFilePath] = useState('')
    const [lastUpdate, setLastUpdate] = useState('.')
    const [destiny, setDestiny] = useState('')
    const [path, setPath] = useState('')
    const [hash, setHash] = useState('')

    function handleGenerate() {
        if(filePath === '' && path === '') {
            setIsError(_ => true)
            return toast.error('Opa! Existe algum campo vazio?')
        }
        if(path !== '' && destiny === '') {
            setIsError(_ => true)
            return toast.error('Informe o destino do diretório.')
        }
        
            
        setLoading(loading => true)

        if(filePath!=='') {
            if (filePath === lastUpdate) return
            return ipcRenderer.send('generate-hash', filePath)
        }
        
        if(path!=='') {
            const _path = path.replace(/\\/g, '/')
            const _destiny = destiny.replace(/\\/g, '/')
            return ipcRenderer.send('generate-hash-dir', {path:_path, destiny:_destiny})
        }
    }

    function handleGetFile() {
       ipcRenderer.send('open-file-dialog')
    }

    function handleGetDir(arg) {
        ipcRenderer.send('open-dir-dialog', arg)
    }

    useEffect(() => {
        ResetListeners()
        ipcRenderer.on('encrypted-hash', (_, arg) => setHash(_ => arg))

        ipcRenderer.on('selected-file', (_, dir) => setFilePath(_ => dir))

        ipcRenderer.on('selected-dir', (_, path) => setPath(_ => path))

        ipcRenderer.on('selected-destiny', (_, destiny) => setDestiny(_ => destiny))

        ipcRenderer.on('write-data', (_, args) => {
            const {path: _path, content} = args
            toast.success('Arquivos lidos com sucesso')
            ipcRenderer.send('write-file', {path: _path, content})
        })

        ipcRenderer.on('throw-success', (_, arg) => {
            toast.success(arg)
            setIsSuccess(_ => true)
            setTimeout(_=>setLoading(_ => false), 4000)
        })

        ipcRenderer.on('invalid-path', (_, message) => {
            setLoading(_ => false)
            setIsError(_ => true)
            toast.error(message)
        })
    },[])

    useEffect(() => {
        if(isError)
            new Audio(errorAudio).play()
            setTimeout(()=>{
                setIsError(_ => false)
            },5000)      
    }, [isError])

    useEffect(() => {
        if(isSuccess)
            new Audio(successAudio).play()
            setTimeout(()=>{
                setIsSuccess(_ => false)
            },5000)      
    }, [isSuccess])

    useEffect(() => {
        setLastUpdate(filePath)
        setTimeout(()=>{
            setLoading(loading => false)
        }, 2000)
    }, [hash])
   
    return (
        <Styled.Container>
            
            <Styled.Title>Gerador de Hash</Styled.Title>

            <Styled.Text>Entre com um arquivo ou diretório para gerar hash. Caso passe um diretório de origem, um arquivo 'hash.txt' será criado no diretório de destino com a hash de todos os arquivos inclusos.</Styled.Text>

            <Styled.InputArea lineBreak={true}>
                
                <Input
                    label='Arquivo' 
                    placeholder='~\diretorio\do\arquivo'
                    onChange={e => setFilePath(e.target.value)}
                    value={filePath}
                />

                <Button onClick={handleGetFile} label='Localizar' />
                
            </Styled.InputArea>

            <DashLine />

            <Styled.InputArea>
                
                <Input
                    label='Origem' 
                    placeholder='~\diretorio\de\origem'
                    onChange={e => setPath(e.target.value)}
                    value={path}
                />

                <Button onClick={()=>handleGetDir()} label='Localizar' />
                
            </Styled.InputArea>

            <Styled.InputArea>
                
                <Input
                    label='Destino' 
                    placeholder='~\destino\do\arquivo\hash.txt'
                    onChange={e => setDestiny(e.target.value)}
                    value={destiny}
                />

                <Button 
                    onClick={()=>handleGetDir('selected-destiny')} 
                    label='Localizar' />
                
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