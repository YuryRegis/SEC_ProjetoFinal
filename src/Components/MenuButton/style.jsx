import styled from 'styled-components'
import theme from '../../assets/style/global'


export const Button = styled.button`
    margin-bottom: 10px;
    
    height: 35px;
    width: 100%;

    border-radius: 6px;
    border-width: 1px;
    border-color: ${
        ({isSelected}) => isSelected 
        ? theme.color.menuButton.border.primary 
        : theme.color.menuButton.border.secondary
    };

    justify-content: center;
    align-items: center;

    background-color: ${theme.color.menuButton.background.primary};
`

export const Text = styled.text`
    font-family: ${theme.font.family.primary};
    font-size: ${theme.font.size.menuButton};
    color: ${
        ({isSelected}) => isSelected 
        ? theme.color.menuButton.text.primary
        : theme.color.menuButton.text.secondary
    };
`
