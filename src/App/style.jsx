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

    overflow-y: hidden;
    overflow-x: hidden;
`

export const ButtonContainer = styled.div`
    padding: 16px 4px;
`

export const Divider = styled.div`
    border-color: #666666;
    border-style: dashed;
    border-width: 0 0 2px 0;

    margin: 0 0 10px 0;
`