import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Logo from "../assets/images/Golden-flex-logo.svg";
import { device } from "../layout/responsividade.js";

const SplashContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  gap: 24px;
`;

const SplashHeadline = styled.h1`
  color: var(--color-primary-gold);
  font-family: var(--Park-Lane);
  font-size: var(--headline-02);
  width: 60%;
  text-align: center;

  @media ${device.tablet} {
    width: 80%;
    text-align: center;
  }

  @media ${device.mobile} {
    width: 90%;
    text-align: center;
    font-size: var(--headline-03);
  }
`;

const SplashText = styled.h2`
  color: var(--color-primary-gold);
  font-family: var(--Milonga);
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(.7);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const SplashImage = styled.img`
  opacity: 0;
  animation: ${fadeIn} 2s ease-in-out forwards;

  @media ${device.tablet} {
    width: 80%;
    text-align: center;
  }

  @media ${device.mobile} {
    width: 90%;
    text-align: center;
  }
`;

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <SplashContainer>
      <SplashHeadline>Estacionamento Golden Flex</SplashHeadline>
      <SplashText>Bem-Vindo</SplashText>
      <SplashImage src={Logo} />
    </SplashContainer>
  );
}
