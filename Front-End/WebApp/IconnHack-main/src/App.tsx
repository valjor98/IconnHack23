import AppBar from "./Components/AppBar";
import { Routes, Route } from "react-router-dom";

import { ThemeProvider } from "@mui/material";
import theme from "./Utils/Theme";
import Principal from "./Pages/Principal";
import FaceRecognition from "./Pages/FaceRecognition";
import Recompensas from "./Pages/Recompensas";
import Perfil from "./Pages/Perfil";
import Carrito from "./Pages/Carrito";
import RecompensasNotificacion from "./Pages/RecompensasNotificacion";
import Gasolina from "./Pages/PetroFast";
import PetroQR from "./Pages/PetroQR";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppBar />
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/reconocimiento-facial" element={<FaceRecognition />} />
        <Route path="/recompensas" element={<Recompensas />} />
        <Route
          path="/recompensas-notificacion"
          element={<RecompensasNotificacion />}
        />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/gasolina" element={<Gasolina />} />
        <Route path="/geocercas" element={<PetroQR />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
