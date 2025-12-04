import { useState, useEffect } from "react";
import styled from "styled-components";
import api from "../api.js";

import upperDetail from "../assets/images/Modal-decor.svg";
import divisoria from "../assets/images/Linhas-decor.svg";
import Button from "./Button";
import InputProps from "./Input";
import { device } from "../layout/responsividade.js";

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
  padding: 50px 0px 0px 0px;
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
  top: 25%;

`;

const TextModal = styled.p`
  color: var(--color-primary-gold);
  font-size: 35px;
  font-family: "Milonga";

  @media ${device.mobile}{
    font-size: 28px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  margin-top: 20px;
  z-index: 1;

  @media ${device.mobile}{
    gap: 15px;
    margin-top: 10px;
  }
`;

const SuccessBox = styled.div`
  margin-top: 12px;
  padding: 10px 14px;
  border-radius: 10px;
  gap: 5px;
  display: flex;
  flex-direction: column;
`;

const SuccessText = styled.p`
  color: var(--color-primary-gold);
  font-family: "Milonga";
  font-size: 16px;
  margin: 5px 0px;
`

const Divisoria = styled.img`
  width: 200px;
  height: 20px;
  margin: 8px auto;
`;

export default function ModalEntrada({ visible, onConfirm, onCancel }) {
  const [placa, setPlaca] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [ultimaEntrada, setUltimaEntrada] = useState(null);

  useEffect(() => {
    if (!visible) {
      setPlaca("");
      setUltimaEntrada(null);
    }
  }, [visible]);

  const handleConfirm = async () => {
    const p = placa.trim();
    if (!p) return;

    try {
      setCarregando(true);
      const response = await api.post("/api/veiculos/entrada", { placa });
      setUltimaEntrada(response.data.veiculo);
      onConfirm?.();
    } catch (err) {
      console.error("Erro ao registrar entrada:", err);
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

        <TextModal>Entrada</TextModal>

        <InputWrapper>
          <InputProps
            maxWidth="90%"
            placeholder="Placa"
            value={placa}
            onChange={setPlaca}
            normalizar
          />

          <Button
            texto={carregando ? "Espere..." : "Cadastro"}
            disabled={carregando}
            onClick={handleConfirm}
          />

          {ultimaEntrada && (
            <SuccessBox>
              <SuccessText>Cadastrado com sucesso</SuccessText>
              <Divisoria src={divisoria} />

              <SuccessText>Placa: {ultimaEntrada.placa}</SuccessText>
              <SuccessText>Entrada: {ultimaEntrada.dataEntrada}</SuccessText>
              <SuccessText>
                Hora: {ultimaEntrada.horarioEntrada?.split(".")[0]}
              </SuccessText>

              <Divisoria src={divisoria} />
            </SuccessBox>
          )}
        </InputWrapper>
      </ModalContent>
    </Overlay>
  );
}
