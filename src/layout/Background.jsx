import styled from 'styled-components'
import BackgroundImage from "../assets/Images/Art-deco-background.png"


const BackgroundImg = styled.div`
  width: 100%;
  height: 1023px;
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