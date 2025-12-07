import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import InputProps from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import api from "../api.js";

const CadastroContainer = styled.div`
  width: 100%;
  min-height: 100vh;

  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Texto = styled.h1`
  color: #e3b779;
  font-size: 60px;
  padding: 95px 0px 65px 0px;
  text-align: center;
  font-family: var(--Park-Lane);
`;

const InputContainer = styled.div`
  margin-bottom: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  position: relative;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  align-items: center;
`;

const ErroText = styled.span`
  font-size: 20px;
  position: absolute;
  color: #e3b779;
  bottom: -40px;
  font-family: var(--Milonga);
`;

export default function Cadastro() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  const handleCadastro = async () => {
    if (!nome || !senha || !email) {
      setErro("Preencha todos os campos");
      return;
    }

    try {
      setCarregando(true);
      setErro("");

        await api.post("/auth/register", {
          nome,
          email,
          senha,
        });

      navigate("/login");
    } catch (e) {
      console.error("Erro no cadastro:", e.response?.data || e.message);
      setErro("Erro ao cadastrar, tente novamente.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <CadastroContainer>
      <Texto>Cadastro</Texto>

      <InputContainer>
        <InputProps
          placeholder="Nome"
          value={nome}
          onChange={setNome}
          $maxWidth="300px"
        />
        <InputProps
          secure={true}
          placeholder="Senha"
          value={senha}
          onChange={setSenha}
          $maxWidth="300px"
        />
        <InputProps
          placeholder="Email"
          value={email}
          onChange={setEmail}
          $maxWidth="300px"
        />

        {erro && <ErroText>{erro}</ErroText>}
      </InputContainer>

      <ButtonWrapper>
        <Button onClick={handleCadastro} texto="Cadastrar">
          {carregando ? "Aguarde..." : "Concluir"}
        </Button>

        <Button onClick={() => navigate("/login")} texto="Voltar"></Button>
      </ButtonWrapper>
    </CadastroContainer>
  );
}
