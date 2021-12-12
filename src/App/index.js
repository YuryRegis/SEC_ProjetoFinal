import * as Styled from './style'
import React, {useState} from 'react'
import MenuButton from '../Components/MenuButton'

import Checker from '../Pages/Checker'
import Android from '../Pages/Android'
import Generator from '../Pages/Generator'
import HdtChecker from '../Pages/HdtChecker'
import ScreenCapture from '../Pages/ScreenCapture'



function handlePage(page) {
  switch (page) {
    case 'generator':
      return (<Generator/>)
    case 'checker':
      return (<Checker />)
    case 'android':
      return (<Android />)
    case 'hdt-checker':
      return (<HdtChecker />)
    case 'screen-capture':
      return (<ScreenCapture />)
  }
}


function App() {
  const [page, setPage] = useState('generator')

  function handleButtonClick(name) {
    setPage(page => name)
  }

  return (
   <Styled.Canvas>
     
     <Styled.Menu>
        <Styled.ButtonContainer>
          <Styled.Divider />
          <MenuButton onClick={()=>handleButtonClick('generator')}>Gerar HASH</MenuButton>
          <MenuButton onClick={()=>handleButtonClick('checker')}>Comparar HASH</MenuButton>
          <MenuButton onClick={()=>handleButtonClick('hdt-checker')}>Verificador HDT</MenuButton>
          <Styled.Divider />
          <MenuButton onClick={()=>handleButtonClick('android')}>Android tools</MenuButton>
          <MenuButton onClick={()=>handleButtonClick('screen-capture')}>Captura de tela</MenuButton>
          <Styled.Divider />
        </Styled.ButtonContainer>
     </Styled.Menu>
     
     <Styled.Content>
        {handlePage(page)}
     </Styled.Content>
   
   </Styled.Canvas>
  );
}

export default App;
