import styled from "@emotion/styled";
import { Grid } from "@mui/material";

export const BackgroundImage = styled("img")(({ theme }) => ({
  position: "fixed",
  top: "3.5rem",
  left: 0,
  width: "100%",
  height: "100%",
  backgroundImage: "url('./principal.jpeg')",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  zIndex: "-1",
}));

export const RewardsBackgroundImage = styled("img")(({ theme }) => ({
  position: "fixed",
  top: "3.5rem",
  left: 0,
  width: "100%",
  height: "100%",
  backgroundImage: "url('./recompensas.png')",
  backgroundSize: "cover",
  zIndex: "-1",
}));

export const PetroSevenBackgroundImage = styled("img")(({ theme }) => ({
  position: "fixed",
  top: "3.5rem",
  left: 0,
  width: "100%",
  height: "100%",
  backgroundImage: "url('./PetroFast.png')",
  backgroundSize: "cover",
  zIndex: "-1",
}));

export const PetroQRBackgroundImage = styled("img")(({ theme }) => ({
  position: "fixed",
  top: "3.5rem",
  left: 0,
  width: "100%",
  height: "100%",
  backgroundImage: "url('./PetroQR.png')",
  backgroundSize: "cover",
  zIndex: "-1",
}));

export const NotificacionBackgroundImage = styled("img")(({ theme }) => ({
  position: "fixed",
  top: "3.5rem",
  left: 0,
  width: "100%",
  height: "100%",
  backgroundImage: "url('./notificacion.png')",
  backgroundSize: "cover",
  zIndex: "-1",
}));

export const QRBackgroundImage = styled("img")(({ theme }) => ({
  position: "fixed",
  top: "3.5rem",
  left: 0,
  width: "100%",
  height: "100%",
  backgroundImage: "url('./codigoqr.jpeg')",
  backgroundSize: "cover",
  zIndex: "-1",
}));

export const CarritoBackgroundImage = styled("img")(({ theme }) => ({
  position: "fixed",
  top: "3.5rem",
  left: 0,
  width: "100%",
  height: "100%",
  backgroundImage: "url('./carrito.png')",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  zIndex: "-1",
}));

export const PageContainer = styled(Grid)(({ theme }) => ({
  padding: "4rem 0.5rem 0 0.5rem",
}));
