import React from "react";
import { PetroSevenBackgroundImage, PageContainer } from "../Shared/Styles";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";

const Gasolina = () => {
  return (
    <PageContainer
      container
      direction="column"
      color="#000000"
      justifyContent="center"
      alignItems="center"
      height="50vh"
    >
      <PetroSevenBackgroundImage />
      <Link
        to="/geocercas"
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
export default Gasolina;
