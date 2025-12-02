import styled from "styled-components";
import InputImg from "../assets/images/Input-decor-normal.svg"

const InputWrapper = styled.div`
  width: 100%;
  max-width: ${(props) => props.$maxWidth || "70%"};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  color: #e3b779;
  font-size: 24px;
  font-family: "Milonga";
  padding-left: 12px; 
  background: transparent;
  border: none;
  outline: none;

  &::placeholder {
    color: #e3b779;
  }
`;

const LineImage = styled.img`
  width: 90%;
  pointer-events: none;
`;

export default function InputProps({
  placeholder,
  value,
  onChangeText,
  normalizar,
  $maxWidth,
  secure,  
}) {
  const handleChange = (e) => {
    let resultado = e.target.value;
    if (normalizar) {
      resultado = resultado.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
    }
    onChangeText(resultado);
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
