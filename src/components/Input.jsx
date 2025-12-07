import styled from "styled-components";
import InputImg from "../assets/images/Input-decor-normal.svg";
// import { device } from "../layout/responsividade.js";

const InputWrapper = styled.div`
  width: 100%;
  max-width: ${(props) => props.$maxWidth || "70%"};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  color: var(--color-primary-gold);
  font-size: 24px;
  font-family: "Milonga";
  padding-left: 12px;
  background: transparent;
  border: none;
  outline: none;

  &::placeholder {
    color: var(--color-primary-gold);
  }
`;

const LineImage = styled.img`
  width: 90%;
  pointer-events: none;
`;

export default function InputProps({
  placeholder,
  value,
  onChange,
  normalizar = false,
  $maxWidth,
  secure,
}) {
  const callback = onChange ?? (() => {});

  const handleChange = (e) => {
    let texto = e.target.value;

    if (normalizar) {
      texto = texto.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
    }

    callback(texto);
  };

  return (
    <InputWrapper $maxWidth={$maxWidth}>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        type={secure ? "password" : "text"}
      />
      <LineImage src={InputImg} />
    </InputWrapper>
  );
}
