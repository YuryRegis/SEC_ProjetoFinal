import React, {useState} from 'react'
import * as Styled from './style'
import MenuButton from '../Components/MenuButton'
import Generator from '../Pages/Generator'
import Checker from '../Pages/Checker'
import Android from '../Pages/Android'


function handlePage(page) {
  switch (page) {
    case 'generator':
      return (<Generator/>)
    case 'checker':
      return (<Checker />)
    case 'android':
      return (<Android />)
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
          <MenuButton onClick={()=>handleButtonClick('generator')}>Gerar hash</MenuButton>
          <MenuButton onClick={()=>handleButtonClick('checker')}>Comparar hash</MenuButton>
          <MenuButton onClick={()=>handleButtonClick('android')}>Android tools</MenuButton>
        </Styled.ButtonContainer>
     </Styled.Menu>
     
     <Styled.Content>
        {handlePage(page)}
     </Styled.Content>
   
   </Styled.Canvas>
  );
}

export default App;
