import  { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  MenuItem,
  Select,
  Container,
  useMediaQuery,
  useTheme,
  IconButton,
  Drawer,
  ListItem,
  ListItemText,
  Divider,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "wouter";

import heroTruck from "../assets/truck.png"; // truck image
import logo from "../assets/logo.png"; // company logo
import bgImage from "../assets/bg.png";

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        margin: "0 auto",
        overflow: "hidden",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Header */}
      <AppBar position="static" sx={{ background: "#101e37" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img src={logo} alt="Logo" style={{ height: 80 }} />
          </Box>

          {/* Navigation */}
          {!isMobile ? (
            <Box sx={{ display: "flex", gap: 3 }}>
              <Typography variant="button">Products ▾</Typography>
              <Typography variant="button">Solutions ▾</Typography>
              <Typography variant="button">Resources ▾</Typography>
              <Typography variant="button">Contact</Typography>
            </Box>
          ) : (
            <IconButton color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          )}

          {/* Actions */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Select
                defaultValue="Eng"
                sx={{
                  color: "white",
                  border: "1px solid white",
                  height: 35,
                  fontSize: "14px",
                }}
              >
                <MenuItem value="Eng">Eng</MenuItem>
                <MenuItem value="Esp">Esp</MenuItem>
              </Select>

              
               <Link href="/Login">
                <Button variant="contained">
                  Login
                </Button>
              </Link>

              <Link href="/register">
                <Button variant="contained">
                  Register
                </Button>
              </Link>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250, p: 2 }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Products" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Solutions" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Resources" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Contact" />
              </ListItemButton>
            </ListItem>
          <Divider />
          <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            <Select defaultValue="Eng" size="small">
              <MenuItem value="Eng">Eng</MenuItem>
              <MenuItem value="Esp">Esp</MenuItem>
            </Select>
            <Button variant="contained" >
              Login
            </Button>
            <Link href="/register">
              <Button variant="contained" >
                Register
              </Button>
            </Link>
          </Box>
        </Box>
      </Drawer>

      {/* Hero Section */}
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          mt: 8,
          gap: 4,
          textAlign: { xs: "center", md: "left" },
        }}
      >
        {/* Hero Text */}
        <Box sx={{ maxWidth: { xs: "100%", md: "50%" } }}>
          <Typography variant="h4" component="h3" gutterBottom>
            <span style={{ color: "#1976d2" }}>
              Smarter tools for every carrier
            </span>
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 3, color: "rgba(242, 236, 236, 1)" }}
          >
            Get access to the largest freight network in North America so you
            can get the best load first – and fast – plus tools to maximize
            profits.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{ width: { xs: "100%", sm: "50%", md: "40%" } }}
          >
            Read more →
          </Button>
        </Box>

        {/* Hero Image */}
        <Box
          sx={{
            borderRadius: "50%",
            width: { xs: 250, sm: 350, md: 450 },
            height: { xs: 250, sm: 350, md: 450 },
            boxShadow: 5,
          }}
        >
          <img
            src={heroTruck}
            alt="Truck"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </Box>
      </Container>
    </Box>
  );
}
