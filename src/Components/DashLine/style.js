import styled from 'styled-components'


export const SpaceDashLine = styled.div`
    width: 100%;

    margin: ${({size}) => size ? size : 30}px 0 0 0;

    border-color: #666666;
    border-style: solid;
    border-width: 0 0 2px 0;
`
