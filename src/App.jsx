import './App.css'
import "./index.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Background from './layout/Background'
import Splash from './pages/Splash'
import Login from './pages/Login'
import HomeLista from './pages/List'


function App() {
  

  return (
    <>
    <Background>  
      {/* <Splash />    */}
      {/* <Login/> */}
      <HomeLista/>
    </Background>
      
    </>
  )
}

export default App
