import { useState, useEffect } from "react";
import styled from "styled-components";
import api from "../api.js";
import { device } from "../layout/responsividade.js";

import upperDetail from "../assets/images/Modal-decor.svg";
import divisoria from "../assets/images/Linhas-decor.svg";
import Button from "./Button";
import PickerPlaca from "./DropdownRNP.jsx";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  width: 420px;
  height: 600px;
  background-color: #1c1c1c;
  border-radius: 12px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding: 20px 0px 0px 0px;
  border: 2px solid var(--color-primary-gold);

  @media ${device.mobile}{
    width: 80%;
    height: 90%;
    padding: 30px 0px 0px 0px;
    gap: 20px;
  }
`;

const ModalBg = styled.img`
  width: 100%;
  position: absolute;
  pointer-events: none;
  top: 25%;
`;

const TextModal = styled.p`
  color: var(--color-primary-gold);
  font-size: 35px;
  font-family: var(--Milonga);

  @media ${device.mobile}{
    font-size: 25px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  align-items: center;
`;

const SuccessBox = styled.div`
  padding: 10px 14px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const SuccessText = styled.p`
  color: var(--color-primary-gold);
  font-family: var(--Milonga);
  font-size: 16px;
  margin: 5px 0;
`;

const Divisoria = styled.img`
  width: 200px;
  height: 20px;
  margin: 8px auto;
  pointer-events: none;
`;

export default function ModalSaida({ visible, onConfirm, onCancel }) {
  const [carros, setCarros] = useState([]);
  const [placa, setPlaca] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [ultimaSaida, setUltimaSaida] = useState(null);

  useEffect(() => {
    if (!visible) {
      setPlaca("");
      setUltimaSaida(null);
    }
  }, [visible]);

  useEffect(() => {
    if (visible) {
      api.get("/api/veiculos")
        .then(res => setCarros(res.data))
        .catch(err => console.error("Erro ao carregar carros:", err));
    }
  }, [visible]);

  const handleConfirm = async () => {
    const p = placa.trim();
    if (!p) return;

    try {
      setCarregando(true);
      const response = await api.put("/api/veiculos/saida", { placa });

      setUltimaSaida(response.data.veiculo);
      onConfirm?.();
    } catch (error) {
      console.error("Erro ao liberar saída:", error);
    } finally {
      setCarregando(false);
      setPlaca("");
    }
  };

  if (!visible) return null;

  return (
    <Overlay onClick={onCancel}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalBg src={upperDetail} />

        <TextModal>Saída</TextModal>

        <InputWrapper>
          <PickerPlaca
            value={placa}
            onChange={e => setPlaca(e.target.value)}
            carros={carros}
          />

          <Button
            texto={carregando ? "Espere..." : "Checkout"}
            onClick={handleConfirm}
            disabled={carregando}
          />

          {ultimaSaida && (
            <SuccessBox>
              <SuccessText>Checkout concluído</SuccessText>
              <Divisoria src={divisoria} />

              <SuccessText>Placa: {ultimaSaida.placa}</SuccessText>
              <SuccessText>Entrada: {ultimaSaida.dataEntrada}</SuccessText>
              <SuccessText>Hora: {ultimaSaida.horarioEntrada?.split(".")[0]}</SuccessText>
              <SuccessText>Saída: {ultimaSaida.dataSaida}</SuccessText>
              <SuccessText>Hora: {ultimaSaida.horarioSaida?.split(".")[0]}</SuccessText>
              <SuccessText>Preço: R$ {ultimaSaida.valorPago},00</SuccessText>

              <Divisoria src={divisoria} />
            </SuccessBox>
          )}
        </InputWrapper>
      </ModalContent>
    </Overlay>
  );
}
