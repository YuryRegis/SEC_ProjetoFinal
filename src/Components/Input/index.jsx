import React from 'react'
import * as Styled from './style'


function Input({label, placeholder, onChange, value}) {
    
    return (
        <Styled.InputContainer>

            <Styled.Label>{label}:</Styled.Label>
            
            <Styled.Input 
                placeholder={placeholder}
                onChange={onChange}
                value={value}
            />
            
        </Styled.InputContainer>
    )
}

export default Input