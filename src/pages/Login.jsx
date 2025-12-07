import styled from "styled-components";
import DivisoriaH from "../assets/images/Divisoria-horizontal.png";
import { useState } from "react";
import api from "../api.js";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button.jsx";
import Input from "../components/Input.jsx";
import { device } from "../layout/responsividade.js";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  height: 100%;
  margin-top: 40px;
  gap: 20px;
`;

const LoginHeadline = styled.h1`
  color: var(--color-primary-gold);
  font-family: var(--Park-Lane);
  font-size: var(--headline-02);
  margin-bottom: 40px;
  width: 70%;
  text-align: center;

  @media ${device.mobile} {
    font-size: var(--headline-04);
    text-align: center;
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const DividerContainer = styled.div`
  display: flex;
  gap: 10px;
  padding: 20px;

  @media ${device.mobile} {
    gap: 5px;
    width: 100%;
    padding: 10px;
  }
`;

const DividerL = styled.div`
  background-image: url(${DivisoriaH});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: min(200px, 30vw);
  height: auto;
  aspect-ratio: 200 / 60;
  transform: rotate(180deg) scale(0.7);

  @media ${device.mobile} {
    width: min(160px, 40vw);
    transform: rotate(180deg) scale(0.9);
  }
`;

const DividerR = styled.div`
  background-image: url(${DivisoriaH});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: min(200px, 30vw);
  height: auto;
  aspect-ratio: 200 / 60;
  transform: scale(0.7);

  @media ${device.mobile} {
    width: min(160px, 40vw);
    transform: scale(0.9);
  }
`;

const DividerText = styled.p`
  color: var(--color-primary-gold);
  font-family: var(--Milonga);
  align-self: center;
  font-size: var(--input);
`;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e?.preventDefault();
    if (!email || !password) {
      setError("Preencha email e senha");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const payload = { email, senha: password, password };
      const response = await api.post("/auth/login", payload);

      // try common token locations
      const token =
        response.data?.token ||
        response.data?.accessToken ||
        response.data?.tokenJWT ||
        null;
      if (token) localStorage.setItem("token", token);
      else localStorage.setItem("token", JSON.stringify(response.data));

      navigate("/list");
    } catch (err) {
      console.error("Erro no login:", {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message,
      });

      const serverMessage =
        err.response?.data?.message || err.response?.data || err.message;
      setError(
        typeof serverMessage === "string"
          ? serverMessage
          : JSON.stringify(serverMessage)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginHeadline>Estacionamento Golden Flex</LoginHeadline>
      <LoginForm onSubmit={handleLogin}>
        <Input
          placeholder="Login"
          value={email}
          onChange={setEmail}
          normalizar={false}
        />
        <Input
          placeholder="Senha"
          value={password}
          onChange={setPassword}
          normalizar={false}
          secure={true}
        />
        <Button
          texto={loading ? "Espere..." : "Entrar"}
          onClick={handleLogin}
        />
      </LoginForm>
      {error && <p style={{ color: "#E3B779" }}>{error}</p>}
      <DividerContainer>
        <DividerL></DividerL>
        <DividerText>ou</DividerText>
        <DividerR></DividerR>
      </DividerContainer>
      <Button texto="Cadastro" onClick={() => navigate("/cadastro")} />
    </LoginContainer>
  );
}
