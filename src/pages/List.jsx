import { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../api.js";

import split from "../assets/images/Divisoria.svg";
import divisoria from "../assets/images/Linhas-decor.svg";

import ModalEntrada from "../components/EntradaModal.jsx";
import ModalSaida from "../components/SaidaModal.jsx";

const ListaContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Texto = styled.h1`
  color: #e3b779;
  font-size: 60px;
  padding: 55px 0 6px 0;
  text-align: center;
  font-family: "ParkLaneNF";
`;

const Card = styled.div`
  padding: 16px;
  margin: 8px 16px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Divisoria = styled.img`
  width: 90%;
  align-self: center;
  margin: 4px 0;
`;

const Placa = styled.p`
  color: #e3b779;
  font-size: 25px;
  font-family: "Milonga";
`;

const Info = styled.p`
  color: #e3b779;
  font-size: 20px;
  font-family: "Milonga";
`;

const ButtonContainer = styled.div`
  height: 180px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const BglessButton = styled.button`
  background: none;
  border: none;
  color: #e3b779;
  font-family: "Milonga";
  font-size: 30px;
  cursor: pointer;
`;

const Split = styled.img`
  height: 50px;
`;

export default function HomeLista() {
  const [item, setItem] = useState([]);
  const [modalEntradaVisible, setModalEntradaVisible] = useState(false);
  const [modalSaidaVisible, setModalSaidaVisible] = useState(false);

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
        console.log(error);
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
      <Texto>Lista</Texto>

      <div style={{ flex: 1, width: "100%" }}>
        {item.map((item, index) => (
          <div key={index}>
            <Card>
              <Placa>Placa: {item.placa}</Placa>
              <Info>Entrada: {item.dataEntrada}</Info>
              <Info>Hora: {item.horarioEntrada?.split(".")[0]}</Info>
            </Card>

            <Divisoria src={divisoria} />
          </div>
        ))}
      </div>

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
