import styled from "styled-components"
import InputImg from "../assets/images/Input-decor-normal.svg"
import DivisoriaH from "../assets/images/Divisoria-horizontal.png"
import DivisoriaV from "../assets/images/Divisoria-metade.svg"
import { useState } from "react"
import Button from "../components/Button"

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    height: 100%;
`

const LoginHeadline = styled.h1`
    color: var(--color-primary-gold);
    font-family: var(--Park-Lane);
    font-size: var(--headline-02);
    margin-bottom: 40px;
    width: 70%;
    text-align: center;
`

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
`

const LoginInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    
    width: 300px;
    
    justify-content: center;
    align-items: center;
`

const LoginInput = styled.input`
    color: var(--color-primary-gold);
    font-family: var(--Milonga);  
    background-color: transparent;
    font-size: var(--button);
    border: none;
    outline: none;
`

const InputDetail = styled.img`
    width: 90%;
`

const DividerContainer = styled.div`
    display: flex;
    gap: 10px;
    padding: 20px;
`

const DividerL = styled.div`
    background-image: url(${DivisoriaH});
    background-size: cover;
    background-repeat: no-repeat;
    width: 200px;
    height: 60px;
    rotate: 180deg;
    transform: scale(0.7);
`
const DividerR = styled.div`
    background-image: url(${DivisoriaH});
    background-size: cover;
    background-repeat: no-repeat;
    width: 200px;
    height: 60px;
    transform: scale(0.7);
`

const DividerText = styled.p`
    color: var(--color-primary-gold);
    font-family: var(--Milonga);
    align-self: center;
    font-size: var(--input);
`

export default function Login(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    return(
        <LoginContainer>
            <LoginHeadline>Estacionamento Golden Flex</LoginHeadline>
            <LoginForm>
                <LoginInputContainer>
                    <LoginInput
                        placeholder="Login"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputDetail src={InputImg}/>
                </LoginInputContainer>
                <LoginInputContainer>
                    <LoginInput
                        placeholder="Senha"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputDetail src={InputImg}/>
                </LoginInputContainer>
                
                <Button texto="Entrar" onCLick={() => {}}/>
            </LoginForm>
            <DividerContainer>
                <DividerL></DividerL>
                <DividerText>ou</DividerText>
                <DividerR></DividerR>
            </DividerContainer>
            <Button texto="Cadastro" onClick={() => {}}/>
        </LoginContainer>
    )
}