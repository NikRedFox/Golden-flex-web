import styled from 'styled-components'
import BackgroundImage from "../assets/images/Art-deco-background.png"
import {device} from "./responsividade.js"


const BackgroundImg = styled.div`
  width: 100%;
  height: 100vh;
  z-index: -1;
  background-image: url(${BackgroundImage});
  background-size: cover;
  background-position: center;    
  display: flex;
  justify-content: center;
  align-items: center;
`

const ContentSpace = styled.div`
  width: 722px;
  height: 100%;
  background-color: var(--color-secondary-black);

  @media ${device.tablet}{
      width: 60%;
    }

  @media ${device.mobile}{
      width: 80%;
    }
`

export default function Background({ children }) {
  return (
    <BackgroundImg>
      <ContentSpace>
        {children}
      </ContentSpace>
    </BackgroundImg>
  )
}