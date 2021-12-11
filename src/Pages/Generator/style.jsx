import styled from 'styled-components'
import theme from '../../assets/style/global'


export const Container = styled.div`
    padding: 0 16px;
`

export const Title = styled.h1`
    margin-bottom: 10px;

    font-family: ${theme.font.family.primary};
    color: ${({alternative}) => alternative 
        ? theme.color.title.secondary
        : theme.color.title.primary
    };
`

export const Text = styled.text`
    font-family: ${theme.font.family.primary};
    color: ${theme.color.text.primary};

    font-size: ${({size}) => size 
        ? size
        : theme.font.size.text };
`

export const InputArea = styled.div`
    display: inline-flex;
    width: 100%;
    
    padding: 30px 0 0 0;
    align-items: center;
    justify-content: space-between;
`

export const Canvas = styled.div`
    display: flex;
    flex-direction: column;
    height: 130px;
    width: 100%;
    
    justify-content: center;
    align-items: center;
    overflow: hidden;
`

export const LoadingImage = styled.img`
    margin-top: 19px;
    height: 120px;
    width: 120px;
    border-radius: 30px;
`