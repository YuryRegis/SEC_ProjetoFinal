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
    margin-bottom: 18px;
    font-family: ${theme.font.family.primary};
    color: ${theme.color.text.primary};

    font-size: ${({size}) => size 
        ? size
        : theme.font.size.text };
`

export const InputArea = styled.div`
    display: inline-flex;
    width: 100%;
    
    margin: 30px 0 0 0;
    align-items: center;
    justify-content: space-between;
`

export const Canvas = styled.div`
    display: flex;
    flex-direction: column;
    height: 180px;
    width: 100%;
    
    justify-content: center;
    align-items: center;
    overflow: hidden;
`

export const LoadingImage = styled.img`
    margin-top: 9px;

    height: 170px;
    width: 170px;
    border-radius: 50px;
`