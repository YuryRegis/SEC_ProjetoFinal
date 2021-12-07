import React from 'react'
import * as Styled from './style'


function MenuButton({children}) {
    return (
        <Styled.Button isSelected>
            <Styled.Text isSelected>
                {children}
            </Styled.Text>
        </Styled.Button>
    )
}

export default MenuButton