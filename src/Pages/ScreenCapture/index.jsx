import * as Styled from './style'
import React, {useEffect, useState} from 'react'
import gif from '../../assets/images/loading.gif'
import gifError from '../../assets/images/error.gif'
import Button from '../../Components/Button'
import Input from '../../Components/Input'
import DashLine from '../../Components/DashLine'
import ResetListeners from '../../utils/resetListeners'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const {ipcRenderer} = window.require('electron')

function ScreenCapture() {
    const [isError, setIsError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [timer, setTimer] = useState(0)
    const [result, setResult] = useState('')
    const [destiny, setDestiny] = useState('')
    const [timeLimit, setTimeLimit] = useState('10')


    function handleStartCapture(type) {
        if(destiny==='') {
            setIsError(_ => true)
            return toast.error('Informe o diretório de destino.')
        }
        setLoading(_ => true)
        setTimer(_ => parseInt(timeLimit))
        const _destiny = destiny.replace(/\\/g, '/')
        ipcRenderer.send('screen-capture', {path: _destiny, timeLimit, type})
    }

    function handleGetDir() {
        ipcRenderer.send('open-dir-dialog')
    }

    function handleSetTime(value) {
        const isDigit = /^\d+$/.test(value)
        if(isDigit)
            setTimeLimit(_ => value)
        else return
    }

    useEffect(() => {
        ResetListeners()
        ipcRenderer.send('adb-try-connect')

        ipcRenderer.on('selected-dir', (_, path) => setDestiny(_ => path))

        ipcRenderer.on('throw-success', (_,arg) => toast.success(arg))
        
        ipcRenderer.on('write-data', (_, arg) => ipcRenderer.send('write-file', arg))
        
        ipcRenderer.on('throw-end', () => setLoading(_ => false)) 
        
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
        if(timer===0)
            return
        
        if(loading)
            setTimeout(()=>{
                setTimer(oldTimer => oldTimer-1)}, 1000)      
    }, [timer])


    return (
        <Styled.Container>
            
            <Styled.Title>Captura de Tela Android</Styled.Title>

            <Styled.Text>Capture uma foto ou grave video a partir do seu dispositivo Android. Lembre-se de ativar o modo de depuração USB.</Styled.Text>

            <Styled.InputArea>
                
                <Input
                    label='Destino' 
                    placeholder='~\diretorio\de\destino'
                    onChange={e => setDestiny(e.target.value)}
                    value={destiny}
                />

                <Button onClick={handleGetDir} label='Localizar'/>
                
            </Styled.InputArea>

            <DashLine />

            <Styled.Title>Ajustes</Styled.Title>

            <Styled.Text>Configure o tempo, em segundos, de duração do vídeo.</Styled.Text>

            <div>
                <Styled.SimpleInlineDiv width={550}>

                    <Input
                        label='Tempo' 
                        placeholder='Tempo duração de vídeo'
                        onChange={e => handleSetTime(e.target.value)}
                        value={timeLimit}
                        width={9}
                    />

                    <Styled.Canvas> 
                        { loading 
                        ? <Styled.LoadingImage src={gif}/>
                        : isError 
                        ? <Styled.LoadingImage src={gifError}/>
                        : <Styled.Title alternative>{result}</Styled.Title>}
                    </Styled.Canvas>

                </Styled.SimpleInlineDiv>
            </div>
            
            <Styled.SimpleInlineDiv width={365} >
                <Button onClick={()=>handleStartCapture('screenshot')} label='Tirar Foto'/>
                <Button onClick={()=>handleStartCapture('recorder')} label='Gravar Video'/>
                <Styled.SimpleInlineDiv width={70}>
                   { timer!==0 &&
                    <React.Fragment>
                        <Styled.Text>TIMER:</Styled.Text>
                        <Styled.Text>{timer}</Styled.Text> 
                    </React.Fragment>
                    }
                </Styled.SimpleInlineDiv>
            </Styled.SimpleInlineDiv>
            
            <ToastContainer 
                position="bottom-left"
                theme='dark'
                limit={1}
            />
        </Styled.Container>
    )
}

export default ScreenCapture