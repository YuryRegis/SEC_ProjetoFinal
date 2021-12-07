import styled from 'styled-components'
import theme from '../../assets/style/global'


export const Button = styled.button`
    height: 35px;
    width: 100px;

    border-radius: 9px;

    background-color: ${theme.color.button.background.secondary};
`

export const TextButton = styled.text`
    font-family: ${theme.font.family.primary};
    font-size: ${theme.font.size.button};
    font-weight: bold;

    color: ${theme.color.button.text.primary}
`