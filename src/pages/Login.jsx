import styled from "styled-components"

const LoginContainer = styled.div`
`

const LoginHeadline = styled.h1`
`

const LoginForm = styled.form`
`

const LoginInputContainer = styled.div`
`

const LoginInput = styled.input`
`

const InputDetail = styled.img`
`

const LoginButton = styled.button`
`

const DividerContainer = styled.div`
`

const Divider = styled.div`
`

const DividerText = styled.span`
`

const SingUpButton = styled.button`
`

export default function Login(){
    return(
        <LoginContainer>
            <LoginHeadline>Estacionamento Golden Flex</LoginHeadline>
            <LoginForm>
                <LoginInputContainer>
                    <LoginInput></LoginInput>
                    <InputDetail/>
                </LoginInputContainer>
                <LoginButton>Entrar</LoginButton>
            </LoginForm>
            <DividerContainer>
                <Divider></Divider>
                <DividerText>ou</DividerText>
                <Divider></Divider>
            </DividerContainer>
            <SingUpButton>Cadastre-se</SingUpButton>
        </LoginContainer>
    )
}