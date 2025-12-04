import styled from "styled-components";
import inputBg from '../assets/images/Input-decor-small.svg';
import { device } from "../layout/responsividade.js";

const InputWrapper = styled.div`
    width: 80%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`;

const LineImage = styled.img`
  width: 80%;
  height: 40px;
  pointer-events: none;

  @media ${device.mobile}{
    height: 20px;
  }  
`;

const PickerContainer = styled.div`
  width: 80%;
`;

const Select = styled.select`
  width: 100%;
  background: transparent;
  color: #E3B779;
  font-size: 25px;
  font-family: var(--Milonga);
  border: none;
  outline: none;
  appearance: none;

  @media ${device.mobile}{
    font-size: 18px;
  }
`;

export default function PickerPlaca({ value, onChange, carros }) {
    return (
        <InputWrapper>
            <PickerContainer>
                <Select value={value ?? ""} onChange={onChange}>
                    <option value="">Selecione a placa</option>
                    {carros?.map((c, idx) => (
                        <option key={idx} value={c.placa}>{c.placa}</option>
                    ))}
                </Select>
            </PickerContainer>

            <LineImage src={inputBg} />
        </InputWrapper>
    );
}
