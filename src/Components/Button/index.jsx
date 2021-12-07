import React from 'react'
import * as Styled from './style'


export function Button({label, onClick}) {
    return(
        <Styled.Button onClick={onClick}>
            <Styled.TextButton>{label}</Styled.TextButton>
        </Styled.Button>
    )
}

export default Button