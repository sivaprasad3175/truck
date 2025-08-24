import { useState } from "react";
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
  TextField,   
  Stack
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "wouter";

import heroTruck from "../assets/truck.png";
import logo from "../assets/logo.png";
import bgImage from "../assets/bg.png";

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        margin: "0 auto",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Header */}
      <AppBar position="sticky" sx={{ background: "#101e37" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img src={logo} alt="Logo" style={{ height: 60 }} />
          </Box>

          {/* Navigation */}
          {!isMobile ? (
            <Box sx={{ display: "flex", gap: 3 }}>
              {["products", "solutions", "resources", "contact"].map((id) => (
                <Typography
                  key={id}
                  variant="button"
                  onClick={() => scrollToSection(id)}
                  sx={{ cursor: "pointer" }}
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </Typography>
              ))}
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

              <Link href="/login">
                <Button variant="contained">Login</Button>
              </Link>

              <Link href="/register">
                <Button variant="contained">Register</Button>
              </Link>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250, p: 2 }}>
          {["products", "solutions", "resources", "contact"].map((item) => (
            <ListItem disablePadding key={item}>
              <ListItemButton onClick={() => scrollToSection(item)}>
                <ListItemText
                  primary={item.charAt(0).toUpperCase() + item.slice(1)}
                />
              </ListItemButton>
            </ListItem>
          ))}
          <Divider />
          <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            <Select defaultValue="Eng" size="small">
              <MenuItem value="Eng">Eng</MenuItem>
              <MenuItem value="Esp">Esp</MenuItem>
            </Select>
            <Link href="/login"><Button variant="contained">Login</Button></Link>
            <Link href="/register"><Button variant="contained">Register</Button></Link>
          </Box>
        </Box>
      </Drawer>

      {/* Hero Section */}
      <Container
        id="hero"
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
            <span style={{ color: "#1976d2" }}>Smarter tools for every carrier</span>
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 3, color: "rgba(242, 236, 236, 1)" }}
          >
            Get access to the largest freight network in North America so you
            can get the best load first – and fast – plus tools to maximize
            profits.
          </Typography>
          <Button variant="contained" size="large">
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



      {/* Contact Section */}
      <Box
        id="contact"
        sx={{
          backgroundColor: "#0a1930",
          color: "white",
          py: 6,
          px: { xs: 3, md: 10 },
          width: "100%",
          mt: 8,
        }}
      >
        {/* Contact section wrapper */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={6}
          justifyContent="space-between"
          alignItems="flex-start"
          sx={{ maxWidth: "1200px", margin: "0 auto" }}
        >
          {/* Left Section */}
          <Box flex={1}>
            <Typography variant="h6" gutterBottom>
              Mbility
            </Typography>
            <Typography variant="body2">
              By submitting this form you agree to receive communications.
              You may unsubscribe at any time from the link at the bottom of our emails.
            </Typography>
          </Box>

          {/* Middle Section 1 */}
          <Box flex={1}>
            <Typography variant="subtitle1" gutterBottom>
              Transport and Logistics
            </Typography>
            {["Binah SDK", "Binah Connect App", "Health Indicators", "Wellness Score", "Technology"].map((item) => (
              <Typography key={item} variant="body2">{item}</Typography>
            ))}
          </Box>

          {/* Middle Section 2 */}
          <Box flex={1}>
            <Typography variant="subtitle1" gutterBottom>
              Research
            </Typography>
            {["Solutions", "Insurance", "Wellness", "Healthcare and Pharma", "Customer Stories"].map((item) => (
              <Typography key={item} variant="body2">{item}</Typography>
            ))}
          </Box>

          {/* Right Section */}
          <Box flex={1}>
            <Typography variant="subtitle1" gutterBottom>
              Subscribe to our newsletter
            </Typography>
            <TextField
              variant="outlined"
              placeholder="Enter your email"
              size="small"
              fullWidth
              sx={{ mb: 2, background: "white", borderRadius: 1 }}
            />
            <TextField
              select
              variant="outlined"
              size="small"
              fullWidth
              sx={{ mb: 2, background: "white", borderRadius: 1 }}
            >
              <MenuItem value="tech">Technology</MenuItem>
              <MenuItem value="health">Healthcare</MenuItem>
              <MenuItem value="logistics">Logistics</MenuItem>
            </TextField>
            <Button variant="contained" color="primary" fullWidth>
              Send
            </Button>
          </Box>
        </Stack>

        {/* Footer bottom bar */}
        <Box
          sx={{
            mt: 4,
            borderTop: "1px solid rgba(255,255,255,0.2)",
            pt: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="body2">
            © Mbility.com All rights reserved 2025 | Privacy & Legal Terms
          </Typography>
        </Box>
      </Box>


    </Box>
  );
}
