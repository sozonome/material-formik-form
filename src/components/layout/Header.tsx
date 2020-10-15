import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import Head from "next/head";

const Header = () => {
  return (
    <AppBar position="sticky">
      <Head>
        <title>Test</title>
      </Head>
      <Toolbar>
        <Typography>Test</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
