import { useState, useEffect } from "react";
import styled from "styled-components";
import api from "../api.js";

import upperDetail from "../assets/images/Modal-decor.svg";
import divisoria from "../assets/images/Divisoria.svg";
import Button from "./Button";
// import Input from "./Input";
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
  height: 700px;
  background-color: #1c1c1c;
  border-radius: 12px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalBg = styled.img`
  width: 100%;
  height: 108px;
  position: absolute;
  top: 0;
`;

const TextModal = styled.p`
  color: #E3B779;
  font-size: 35px;
  font-family: "Milonga";
  margin-top: 150px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  gap: 20px;
  width: 100%;
  align-items: center;
`;

const SuccessBox = styled.div`
  margin-top: 12px;
  padding: 10px 14px;
  border-radius: 10px;
  text-align: center;
`;

const SuccessText = styled.p`
  color: #E3B779;
  font-family: "Milonga";
  font-size: 18px;
  margin: 5px 0;
`;

const Divisoria = styled.img`
  width: 200px;
  height: 20px;
  margin: 8px auto;
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

  // Carregar lista de carros
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
