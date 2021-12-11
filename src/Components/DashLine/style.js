import styled from 'styled-components'


export const SpaceDashLine = styled.div`
    width: 100%;

    margin: ${({size}) => size ? size : 30}px 0 0 0;

    border-color: #666666;
    border-style: dashed;
    border-width: 0 0 5px 0;
`
