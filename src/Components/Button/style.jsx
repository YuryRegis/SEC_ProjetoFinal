import styled from 'styled-components'
import theme from '../../assets/style/global'

const { innerHeight, innerWidth } = window

export const Button = styled.button`
    height: ${innerHeight/15}px;
    width: ${innerWidth/6}px;

    border-radius: 9px;

    background-color: ${theme.color.button.background.secondary};

    &:hover {
        cursor: pointer;
        background-color: ${theme.color.button.background.primary};
    }
`

export const TextButton = styled.text`
    font-family: ${theme.font.family.primary};
    font-size: ${theme.font.size.button};
    font-weight: bold;

    color: ${theme.color.button.text.primary}
`