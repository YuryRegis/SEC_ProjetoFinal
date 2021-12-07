import styled from 'styled-components'
import theme from '../../assets/style/global'



export const InputContainer = styled.div`
    display: inline-flex;
    align-items: center;
`

export const Input = styled.input`
height: 23px;
width: 40vw;

border-radius: 9px;
background-color: ${theme.color.input.background};
`

export const Label = styled.text`
    font-family: ${theme.font.family.primary};
    font-size: ${theme.font.size.text};
    color: ${theme.color.text.primary};

    margin-right: 9px;
`

