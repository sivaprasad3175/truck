import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Link,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff, Person } from "@mui/icons-material";
import type { User } from "../types";
import logo from "../assets/theme_logo.png";
import signin from "../assets/signin.png"; // replace with your actual illustration

interface Props {
  onLogin: (user:User) => void;
  goRegister: () => void;
}

export default function Login({ onLogin, goRegister }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    console.log(users,'respone');
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      onLogin(user);
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Box display="flex" height="100vh" bgcolor="#f5f7fa">
      {/* Left illustration */}
      <Box
        flex={1}
        display={{ xs: "none", md: "flex" }}
        alignItems="center"
        justifyContent="center"
        sx={{ backgroundColor: "#fff", p: 4 }}
      >
        <img
          src={signin}
          alt="Order Tracking"
          style={{ maxWidth: "90%", height: "auto" }}
        />
      </Box>

      {/* Right login form */}
      <Box
        flex={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={3}
      >
        <Card sx={{ width: "100%", maxWidth: 400, borderRadius: 3, boxShadow: 6 }}>
          <CardContent>
            {/* Logo */}
            <Box textAlign="center" mb={2}>
              <img
                src={logo}
                alt="App Logo"
                style={{ width: "120px", marginBottom: "10px" }}
              />
              <Typography variant="h6" fontWeight="bold" color="primary">
                Sign In
              </Typography>
            </Box>

            {/* Email */}
            <TextField
              placeholder="Enter Email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
            />

            {/* Password */}
            <TextField
              placeholder="Enter Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Options */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt={1}
            >
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="Keep me signed in"
              />
              <Link href="#" variant="body2">
                Forgot Password?
              </Link>
            </Box>

            {/* Submit button */}
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2, py: 1.2, borderRadius: 2 }}
              onClick={handleLogin}
            >
              Sign in
            </Button>

            {/* Terms */}
            <Typography
              variant="caption"
              textAlign="center"
              display="block"
              mt={2}
              color="text.secondary"
            >
              By clicking “Sign In” you agree to our{" "}
              <Link href="#">Terms of Service</Link> and{" "}
              <Link href="#">Privacy Policy</Link>.
            </Typography>

            {/* Sign Up */}
            <Typography variant="body2" textAlign="center" mt={2}>
              Don’t have an account?{" "}
              <Link
                // component="button"
                variant="body2"
                sx={{ fontWeight: "bold" }}
                onClick={goRegister}
              >
                Sign Up
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
