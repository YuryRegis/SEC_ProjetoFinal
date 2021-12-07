import React, {useState} from 'react'
import * as Styled from './style'
import MenuButton from '../Components/MenuButton'
import Generator from '../Pages/Generator'


function handlePage(page) {
  switch (page) {
    case 'generator':
      return (<Generator/>)
  }
}


function App() {
  const [page, setPage] = useState('generator')

  return (
   <Styled.Canvas>
     
     <Styled.Menu>
        <Styled.ButtonContainer>
          <MenuButton>Gerar hash</MenuButton>
          <MenuButton>Comparar hash</MenuButton>
          <MenuButton>Coletar dados</MenuButton>
        </Styled.ButtonContainer>
     </Styled.Menu>
     
     <Styled.Content>
        {handlePage(page)}
     </Styled.Content>
   
   </Styled.Canvas>
  );
}

export default App;
