import styled from "styled-components"
import Logo from "../assets/images/Golden-flex-logo.svg"

const SpalshContainer = styled.div`
    width: 100%;    
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;   
    gap: 24px;
`    

const SplashHeadline = styled.h1`
    color: var(--color-primary-gold);
    font-family: var(--Park-Lane);
    font-size: var(--headline-02);
`

const SplashSubheadline = styled.h2`
    color: var(--color-primary-gold);
    font-family: var(--Milonga);
`

const SpalshImage = styled.img`

`

export default function Splash(){
    return(
        <SpalshContainer>
            <SplashHeadline>Estacionamento Golden Flex</SplashHeadline>
            <SplashSubheadline>Bem-Vindo</SplashSubheadline>
            <SpalshImage src={Logo} />
        </SpalshContainer>

    )
}