import "./App.css";
import "./index.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion as Motion } from "framer-motion";
import Background from "./layout/Background";
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import HomeLista from "./pages/List";
import Cadastro from "./pages/Cadastro";

function AnimatedLayout() {
  const location = useLocation();

  const pageVariants = {
    initial: { opacity: 0, y: 8 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -8 },
  };

  const pageTransition = { duration: 0.45 };

  return (
    <Background>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <Motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Splash />
                </Motion.div>
            }
          />

          <Route
            path="/login"
            element={
              <Motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Login />
                </Motion.div>
            }
          />

          <Route
            path="/list"
            element={
              <Motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <HomeLista />
                </Motion.div>
            }
          />
          <Route
            path="/cadastro"
            element={
              <Motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Cadastro />
                </Motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
    </Background>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AnimatedLayout />
    </BrowserRouter>
  );
}

export default App;
