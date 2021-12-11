import styled from 'styled-components'
import theme from '../../assets/style/global'


const { innerWidth, innerHeight } = window

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
    margin-bottom: 9px;
    font-family: ${theme.font.family.primary};
    color: ${theme.color.text.primary};

    font-size: ${({size}) => size 
        ? size
        : theme.font.size.text };
`

export const TextArea = styled.div`
    display: inline-flex;
`

export const InputArea = styled.div`
    display: inline-flex;
    width: 100%;
    
    margin: 15px 0 0 0;
    align-items: center;
    justify-content: space-between;
`

export const Canvas = styled.div`
    display: flex;
    flex-direction: column;
    margin: 9px 0 0 0 ;
    width: 100%;
    height: ${innerHeight/1.75}px;
    
    //justify-content: center;
    //align-items: center;
    overflow: hidden;
`

export const ButtonsArea = styled.div`
    display: inline-flex;
    width: 100%;
    margin: 15px 0 0 0;
    
    justify-content: space-between;
`

export const Monitor = styled.div`
    background-color: ${theme.color.background.primary};
    height: ${innerHeight}px;
    width: 94.5%;
    
    margin: 0 9px 0px 9px;
    padding: 9px;

    border-radius: 9px;
    
    overflow-y: scroll;
    overflow-x: hidden;
`

export const TextMonitor = styled.p`
    flex-wrap: wrap;
    margin-bottom: 9px;
    font-family: ${theme.font.family.secondary};
    color: ${theme.color.text.primary};
    white-space: pre-line;

    font-size: ${ theme.font.size.monitor };
`

export const LoadingImage = styled.img`
    height: 19px;
    width: 19px;
    
    border-radius: 9px;
    margin-left: 9px;
`

export const SaveIcon = styled.img`
    position: absolute;
    
    align-self: flex-end;

    height: 40px;
    width: 40px;

    &:hover {
        cursor: pointer;
    }
`