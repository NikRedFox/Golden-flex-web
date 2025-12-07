import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button.jsx";
import styled from "styled-components";
import api from "../api.js";
import { device } from "../layout/responsividade.js";

import split from "../assets/images/Divisoria.svg";
import divisoria from "../assets/images/Linhas-decor.svg";

import ModalEntrada from "../components/EntradaModal.jsx";
import ModalSaida from "../components/SaidaModal.jsx";

const ListaContainer = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${device.mobile} {
    padding-top: 40px;
  }
`;

const LogoutWrapper = styled.div`
  position: absolute;
  left: 12px;
  top: 12px;
  z-index: 50;

  @media ${device.mobile} {
    left: 8px;
    top: 8px;
  }
`;

const ListaScroll = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-height: calc(100vh - 250px);
  overflow-y: auto;
  padding-bottom: 20px;

  @media ${device.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${device.mobile} {
    max-height: calc(100vh - 300px);
    grid-template-columns: repeat(1, 1fr);
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-primary-gold);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #d9a74f;
  }

  scrollbar-width: thin;
  scrollbar-color: var(--color-primary-gold) transparent;
`;

const Texto = styled.h1`
  color: var(--color-primary-gold);
  font-size: var(--headline-02);
  padding: 55px 0 6px 0;
  text-align: center;
  font-family: var(--Park-Lane);

  @media ${device.tablet} {
    padding: 45px 0 6px 0;
  }

  @media ${device.mobile} {
    padding: 55px 0 6px 0;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Card = styled.div`
  justify-content: center;
  padding: 16px;
  margin: 8px 16px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media ${device.tablet} {
    width: 80%;
    padding-left: 0px;
    align-self: center;
  }

  @media ${device.mobile} {
    width: 80%;
    padding-left: 50px;
    align-self: center;
  }
`;

const Divisoria = styled.img`
  width: 70%;
  align-self: center;
  margin: 4px 0px;
`;

const Placa = styled.p`
  color: var(--color-primary-gold);
  font-size: 20px;
  font-family: var(--Milonga);
  padding-left: 40px;

  @media ${device.tablet} {
    padding-left: 20px;
    font-size: 18px;
  }

  @media ${device.mobile} {
    padding-left: 30px;
    padding: 0px;
  }
`;

const Info = styled.p`
  color: var(--color-primary-gold);
  font-size: 16px;
  font-family: var(--Milonga);
  padding-left: 40px;

  @media ${device.tablet} {
    padding-left: 20px;
    font-size: 16px;
  }

  @media ${device.mobile} {
    padding: 0px;
  }
`;

const ButtonContainer = styled.div`
  height: 130px;
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const BglessButton = styled.button`
  background: none;
  border: none;
  color: var(--color-primary-gold);
  font-family: var(--Milonga);
  font-size: 30px;
  cursor: pointer;
  width: 150px;

  @media ${device.mobile} {
    font-size: 24px;
    width: 120px;
  }
`;

const Split = styled.img`
  height: 100px;
`;

export default function HomeLista() {
  const [item, setItem] = useState([]);
  const [modalEntradaVisible, setModalEntradaVisible] = useState(false);
  const [modalSaidaVisible, setModalSaidaVisible] = useState(false);

  const navigate = useNavigate();

  const abrirModalEntrada = () => setModalEntradaVisible(true);
  const abrirModalSaida = () => setModalSaidaVisible(true);

  const loadVeiculos = async () => {
    try {
      const response = await api.get("/api/veiculos");
      setItem(response.data);
    } catch (error) {
      console.error("Erro ao carregar veículos:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await loadVeiculos();
      } catch (error) {
        console.error("Erro ao buscar veículos:", error);
      }
    };

    fetchData();
  }, []);

  const handleEntrada = async () => {
    await loadVeiculos();
  };

  const handleSaida = async () => {
    await loadVeiculos();
  };

  return (
    <ListaContainer>
      <LogoutWrapper>
        <Button
          texto="Sair"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/login");
          }}
        />
      </LogoutWrapper>
      <Texto>Lista</Texto>

      <ListaScroll>
        {item.map((item, index) => (
          <CardContainer key={index}>
            <Card>
              <Placa>Placa: {item.placa}</Placa>
              <Info>Entrada: {item.dataEntrada}</Info>
              <Info>Hora: {item.horarioEntrada?.split(".")[0]}</Info>
            </Card>
            <Divisoria src={divisoria} />
          </CardContainer>
        ))}
      </ListaScroll>

      <ButtonContainer>
        <BglessButton onClick={abrirModalEntrada}>Entrada</BglessButton>
        <Split src={split} />
        <BglessButton onClick={abrirModalSaida}>Saída</BglessButton>
      </ButtonContainer>

      <ModalEntrada
        visible={modalEntradaVisible}
        onConfirm={handleEntrada}
        onCancel={() => setModalEntradaVisible(false)}
      />

      <ModalSaida
        visible={modalSaidaVisible}
        onConfirm={handleSaida}
        onCancel={() => setModalSaidaVisible(false)}
        veiculos={item}
      />
    </ListaContainer>
  );
}
