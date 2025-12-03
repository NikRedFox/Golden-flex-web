import styled from "styled-components";
import inputBg from '../assets/images/Input-decor-small.svg';

const InputWrapper = styled.div`
    width: 80%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    /* margin-bottom: 40px; */
    /* position: relative; */
`;

const LineImage = styled.img`
  /* position: absolute; */
  /* bottom: 0; */
  width: 80%;
  height: 40px;
  pointer-events: none;
`;

const PickerContainer = styled.div`
  width: 80%;
  /* padding-top: 10px; */
`;

const Select = styled.select`
  width: 100%;
  background: transparent;
  color: #E3B779;
  font-size: 25px;
  font-family: 'Milonga', cursive;
  /* padding: 8px 10px; */
  border: none;
  outline: none;
  appearance: none;
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
