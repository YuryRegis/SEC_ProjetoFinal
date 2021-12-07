import * as Styled from './style'
import React, {useEffect, useState} from 'react'
import gif from '../../assets/images/loading.gif'
import Button from '../../Components/Button'
import Input from '../../Components/Input'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function Generator() {
    const [loading, setLoading] = useState(false)
    const [hashInput, setHashInput] = useState('')
    const [filePath, setFilePath] = useState('')

    function handleGenerate() {
        if(filePath==='' || hashInput==='')
            return toast.error('Opa! Existe algum campo vazio?') 
        setLoading(loading => !loading)
    }

    function handleGetFile(){
        
    }

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
                : <>
                    <Styled.Text>RESULTADO:</Styled.Text>
                    <Styled.Text size={'12px'}>2e966c4fffeab1ac7126acbb2413cfa315d9915cb0bb2959a2145dfa5511cef4</Styled.Text>
                  </> }
            </Styled.Canvas>
            
            <ToastContainer 
                position="bottom-left"
                theme='dark'
                limit={1}
            />
        </Styled.Container>
    )
}

export default Generator