import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Grid } from "@mui/material";
import { DrawerMobileSize } from "./AppBarList";

import ShoppingCart from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";

const ButtonAppBar = () => {
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const toggle =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      setToggleDrawer(open);
    };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: "none",
          height: "3.5rem",
          border: "none",
        }}
      >
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Grid container flexDirection="row" alignSelf="flex-start">
                <img
                  src="./sevenly.jpeg"
                  style={{
                    height: "2.5rem",
                    marginLeft: "-0.8rem",
                  }}
                  alt=""
                />
              </Grid>
            </Grid>

            <Grid item>
              <Grid container alignItems="center">
                <DrawerMobileSize toggleDrawer={toggleDrawer} toggle={toggle} />

                <Link
                  to="/carrito"
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  <ShoppingCart sx={{ color: "#028262" }} />
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default React.memo(ButtonAppBar);
