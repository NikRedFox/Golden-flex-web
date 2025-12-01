import styled from 'styled-components';
import React from 'react';
import ButtonImg from "../assets/images/Button.png";

const ButtonWrapper = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(${ButtonImg});
    background-size: cover;
    background-repeat: no-repeat;
    width: 185px;
    height: 81px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    transform: scale(0.7);
    transition: transform 0.2s ease, filter 0.2s ease;

    &:hover {
        transform: scale(0.75);
        filter: brightness(1.1);
    }
`;

const ButtonText = styled.span`
    color: #E3B779;
    font-size: 35px;
    font-family: 'Milonga';
`;

export default function Button({ texto, onClick }) {
    return (
        <ButtonWrapper onClick={onClick}>
            <ButtonText>{texto}</ButtonText>
        </ButtonWrapper>
    );
}
