import React from "react";
import { Grid } from "@material-ui/core";

import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <Grid>
      <Header />

      {children}

      <Footer />
    </Grid>
  );
};

export default Layout;
