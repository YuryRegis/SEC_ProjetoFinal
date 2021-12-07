import styled from 'styled-components'
import theme from '../../assets/style/global'


export const Container = styled.div`
    padding: 0 16px;
`

export const Title = styled.h1`
    margin-bottom: 10px;

    font-family: ${theme.font.family.primary};
    color: ${theme.color.text.secondary};
`

export const Text = styled.text`
    margin-bottom: 8px;
    font-family: ${theme.font.family.primary};
    color: ${theme.color.text.primary};

    font-size: ${({size}) => size 
        ? size
        : theme.font.size.text };
`

export const InputContainer = styled.div`
    display: inline-flex;
    align-items: center;
`

export const InputArea = styled.div`
    display: inline-flex;
    width: 100%;
    
    margin: 16px 0;
    align-items: center;
    justify-content: space-between;
`

export const Label = styled.text`
    font-family: ${theme.font.family.primary};
    font-size: ${theme.font.size.text};
    color: ${theme.color.text.primary};

    margin-right: 9px;
`

export const Input = styled.input`
    height: 23px;
    width: 40vw;

    border-radius: 9px;
    background-color: ${theme.color.input.background};
`

export const Canvas = styled.div`
    display: flex;
    flex-direction: column;
    height: 170px;
    width: 100%;
    
    justify-content: center;
    align-items: center;
    overflow: hidden;
`

export const LoadingImage = styled.img`
    height: 170px;
    width: 170px;
    border-radius: 50px;
`

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