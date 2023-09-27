import React, { FC } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FitnessCenterOutlinedIcon from "@mui/icons-material/FitnessCenterOutlined";
import MenuIcon from "@mui/icons-material/Menu";

import { Link } from "react-router-dom";
import { Drawer, Grid, IconButton } from "@mui/material";
// import { ImageContainer, LogoIconSmall } from "../Shared/Styles";

// TODO change icons to a re-used component
const NavigationList = [
  {
    title: "Inicio",
    icon: <HomeOutlinedIcon fontSize="small" sx={{ color: "#ffffff" }} />,
    navigateTo: "/",
  },
  {
    title: "Gasolina",
    icon: <HomeOutlinedIcon fontSize="small" sx={{ color: "#ffffff" }} />,
    navigateTo: "/gasolina",
  },
  {
    title: "Recompensas",
    icon: (
      <FitnessCenterOutlinedIcon fontSize="small" sx={{ color: "#ffffff" }} />
    ),
    navigateTo: "/recompensas",
  },
  {
    title: "Emociones",
    icon: (
      <FitnessCenterOutlinedIcon fontSize="small" sx={{ color: "#ffffff" }} />
    ),
    navigateTo: "/reconocimiento-facial",
  },
  {
    title: "Auto compras",
    icon: (
      <FitnessCenterOutlinedIcon fontSize="small" sx={{ color: "#ffffff" }} />
    ),
    navigateTo: "/auto-compras",
  },
  {
    title: "Chat AI",
    icon: (
      <FitnessCenterOutlinedIcon fontSize="small" sx={{ color: "#ffffff" }} />
    ),
    navigateTo: "/chat",
  },
];

const DrawerList = () => {
  return (
    <List>
      {NavigationList.map((item) => (
        <ListItem key={item.title} sx={{ padding: 0 }}>
          <ListItemButton>
            <Link
              to={item.navigateTo}
              style={{
                textDecoration: "none",
                color: "white",
                width: "100%",
              }}
            >
              <Grid container flexDirection="column" alignItems="center">
                {/* <Grid item>{item.icon}</Grid> */}
                <Grid item lineHeight="1rem" fontSize="1rem">
                  {item.title}
                </Grid>
              </Grid>
            </Link>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

// Drawer for mobile size
interface DrawerMobileProps {
  toggleDrawer: boolean;
  toggle: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

export const DrawerMobileSize: FC<DrawerMobileProps> = ({
  toggleDrawer,
  toggle,
}): JSX.Element => {
  return (
    <Grid>
      <IconButton
        size="large"
        edge="start"
        sx={{ color: "#028262" }}
        aria-label="menu"
        onClick={toggle(true)}
      >
        <MenuIcon />
      </IconButton>

      <Drawer anchor="left" open={toggleDrawer} onClose={toggle(false)}>
        <Box
          sx={{ width: "auto", height: "100vh", backgroundColor: "#028262" }}
          role="presentation"
          onClick={toggle(false)}
          onKeyDown={toggle(false)}
        >
          {DrawerList()}
        </Box>
      </Drawer>
    </Grid>
  );
};
