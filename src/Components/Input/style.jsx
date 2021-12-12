import styled from 'styled-components'
import theme from '../../assets/style/global'


const { innerHeight, innerWidth } = window

export const InputContainer = styled.div`
    display: inline-flex;
    align-items: center;
`

export const Input = styled.input`
    height: ${innerHeight/19}px;
    width: ${({width}) => width ? `${width}vw` : `44vw`};

    border-radius: 9px;
    background-color: ${theme.color.input.background};
`

export const Label = styled.text`
    font-family: ${theme.font.family.primary};
    font-size: ${theme.font.size.text};
    color: ${theme.color.text.primary};

    width: 50px;

    margin-right: 9px;
`

