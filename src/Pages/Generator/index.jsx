import * as Styled from './style'
import React, {useEffect, useState} from 'react'
import gif from '../../assets/images/loading.gif'
import Button from '../../Components/Button'
import Input from '../../Components/Input'

//const { dialog } = require('electron')

//const {ipcRenderer} = require('electron')


function Generator() {
    const [loading, setLoading] = useState(false)
    const [filePath, setFilePath] = useState('')

    function handleGenerate() {
        setLoading(loading => !loading)
    }

    function handleGetFile(){
        //dialog.showOpenDialog({
        //    properties: ['openFile']
        //}, (files) => {
        //    if(files) {
        //        console.log(files[0])
        //    }
        //})
       // ipcRenderer.send('open-file-dialog')
    }

   // ipcRenderer.on('selected-file', (event, path) => {
   //     return setFilePath(filePath => path)
  //  })

  useEffect(()=>{
      console.log(loading)
  },[loading])

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
                ? <Styled.LoadingImage src={gif}/>
                : <>
                    <Styled.Text>HASH:</Styled.Text>
                    <Styled.Text size={'12px'}>2e966c4fffeab1ac7126acbb2413cfa315d9915cb0bb2959a2145dfa5511cef4</Styled.Text>
                  </> }
            </Styled.Canvas>

            <Button onClick={handleGenerate} label='Gerar Hash'/>

        </Styled.Container>
    )
}

export default Generator