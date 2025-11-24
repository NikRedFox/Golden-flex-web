import styled from 'styled-components'
import BackgroundImage from "../assets/Images/Art-deco-background.png"

const BackgroundImg = styled.div`
width: 100%;
    background-image: url(${BackgroundImage});
    background-size: cover;
    background-position: center;    
`

export default function Background() {
  return (
    <BackgroundImg>
      
    </BackgroundImg>
  )
}