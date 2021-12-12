import React from 'react'
import * as Styled from './style'


function Input({label, placeholder, onChange, value, width}) {
    
    return (
        <Styled.InputContainer>

            <Styled.Label>{label}:</Styled.Label>
            
            <Styled.Input 
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                width={width}
            />
            
        </Styled.InputContainer>
    )
}

export default Input