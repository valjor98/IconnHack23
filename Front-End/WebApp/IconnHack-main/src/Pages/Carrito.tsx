import React from "react";
import { CarritoBackgroundImage, PageContainer } from "../Shared/Styles";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";

const Carrito = () => {
  return (
    <PageContainer
      container
      height="100vh"
      color="#000000"
      alignItems="flex-end"
    >
      <CarritoBackgroundImage />
      <Link
        to="/recompensas-notificacion"
        style={{
          textDecoration: "none",
          color: "black",
          width: "100%",
        }}
      >
        <Grid item width="30rem" height="20rem"></Grid>
      </Link>
    </PageContainer>
  );
};
export default Carrito;
