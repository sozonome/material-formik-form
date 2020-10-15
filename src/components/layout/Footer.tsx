import React, { useState } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import { Home, Favorite, LocationOn } from "@material-ui/icons";

const useStyles = makeStyles(
  createStyles({
    tabBar: {
      width: "100%",
      position: "fixed",
      bottom: 0,
    },
  })
);

const Footer = () => {
  const classes = useStyles();
  const [currentNav, setCurrentNav] = useState<string>("home");

  return (
    <BottomNavigation
      className={classes.tabBar}
      value={currentNav}
      onChange={(e, newVal) => setCurrentNav(newVal)}
    >
      <BottomNavigationAction label="Home" value="home" icon={<Home />} />
      <BottomNavigationAction
        label="Favorites"
        value="favorites"
        icon={<Favorite />}
      />
      <BottomNavigationAction
        label="Nearby"
        value="nearby"
        icon={<LocationOn />}
      />
    </BottomNavigation>
  );
};

export default Footer;
