import styled from 'styled-components'
import theme from '../assets/style/global'


export const Canvas = styled.div`
   flex: 1;
   display: inline-flex;
   height: 100vh;
   flex-direction: row;
   background-color: red;
   font-size: 16px;
`

export const Menu = styled.div`
    background-color: ${theme.color.background.primary};
    width: 25vw;
    height: 100%;
`

export const Content = styled.div`
    background-color: ${theme.color.background.secondary};
    height: 100%;
    width: 75vw;
`

export const ButtonContainer = styled.div`
    padding: 16px 4px;
`