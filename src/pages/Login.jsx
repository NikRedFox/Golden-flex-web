import styled from "styled-components"
import DivisoriaH from "../assets/images/Divisoria-horizontal.png"
import { useState } from "react"
import Button from "../components/Button"
import Input from "../components/Input"

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
                <Input placeholder="Login" value={email} onChangeText={setEmail} normalizar={false} />
                <Input placeholder="Senha" value={password} onChangeText={setPassword} normalizar={false} secure={true} />
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