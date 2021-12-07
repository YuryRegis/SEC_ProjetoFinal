import React from 'react'
import * as Styled from './style'


function MenuButton({onClick, children}) {
    return (
        <Styled.Button onClick={onClick} isSelected>
            <Styled.Text isSelected>
                {children}
            </Styled.Text>
        </Styled.Button>
    )
}

export default MenuButton