import React from "react";
import { PetroQRBackgroundImage, PageContainer } from "../Shared/Styles";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";

const PetroQR = () => {
  return (
    <PageContainer
      container
      direction="column"
      color="#000000"
      justifyContent="center"
      alignItems="center"
      height="50vh"
    >
      <PetroQRBackgroundImage />
      <Link
        to="/gasolina"
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
export default PetroQR;
