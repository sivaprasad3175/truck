import React, { useState, type ChangeEvent, type FormEvent } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import bgImage from "../assets/broker.png";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import brokericon from "../assets/brokericon.png";

interface RegisterFormData {
  fullName: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
  mcNumber: string;
  dotNumber: string;
  insuranceProof: string;
  additionalInfo: string;
}

export default function RegisterMUI() {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    mcNumber: "",
    dotNumber: "",
    insuranceProof: "",
    additionalInfo: "",
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = (): void => setStep((prev) => prev + 1);
  const handleBack = (): void => setStep((prev) => prev - 1);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Submitted ✅", formData);
    alert("Registration Completed!");
  };

  const renderStepContent = (): React.ReactNode => {
    switch (step) {
      case 1:
        return (
          <>
            <TextField
              fullWidth
              margin="dense"
              label="Full Name"
              name="fullName"
              placeholder="Enter Company Name"
              value={formData.fullName}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Email Address"
              name="email"
              placeholder="Enter Email Address"
              value={formData.email}
              onChange={handleChange}
            />
          </>
        );
      case 2:
        return (
          <>
            <TextField
              fullWidth
              margin="dense"
              label="Mobile Number"
              name="mobile"
              placeholder="Enter Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              type="password"
              margin="dense"
              label="Password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
            />
          </>
        );
      case 3:
        return (
          <>
            <TextField
              fullWidth
              type="password"
              margin="dense"
              label="Confirm Password"
              name="confirmPassword"
              placeholder="Enter Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </>
        );
      case 4:
        return (
          <>
            <TextField
              fullWidth
              margin="dense"
              label="MC Number"
              name="mcNumber"
              placeholder="Enter MC Number"
              value={formData.mcNumber}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="dense"
              label="DOT Number"
              name="dotNumber"
              placeholder="Enter DOT Number"
              value={formData.dotNumber}
              onChange={handleChange}
            />
          </>
        );
      case 5:
        return (
          <>
            <TextField
              fullWidth
              margin="dense"
              label="Insurance Proof"
              name="insuranceProof"
              placeholder="Upload proof of insurance"
              value={formData.insuranceProof}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Additional Info"
              name="additionalInfo"
              placeholder="Enter additional information"
              value={formData.additionalInfo}
              onChange={handleChange}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Box
      display="flex"
      flexDirection={isMobile ? "column" : "row"}
      height="100vh"
      bgcolor="#F3F6FB"
      overflow="auto"
    >
      {/* Left Background Image */}
      {!isMobile && (
        <Box
          flex={1}
          sx={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
      )}

      {/* Right Form Content */}
      <Box
        flex={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        p={isMobile ? 2 : 3}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: 600,
            borderRadius: 3,
            boxShadow: 4,
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            maxHeight: "95vh",
          }}
        >
          {/* Step Header */}
          <Box
            display="flex"
            flexDirection={isMobile ? "column" : "row"}
            alignItems="center"
            borderBottom="1px solid #ddd"
            p={2}
          >
            <Box flex={1} textAlign="center" mb={isMobile ? 1 : 0}>
              <Typography variant="subtitle1" fontWeight="bold" color="primary">
                Step {step} of 5
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Fill the required details
              </Typography>
            </Box>

            {!isMobile && <ArrowForwardIcon sx={{ color: "#888", fontSize: 28, mx: 2 }} />}

            <Box flex={1} textAlign="center">
              <Typography variant="subtitle1" fontWeight="bold">
                Registration Progress
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Complete your profile
              </Typography>
            </Box>
          </Box>

          {/* Role Card */}
          <Card sx={{ backgroundColor: "#e3f2fd", borderRadius: 2, m: 2 }}>
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <Box component="img" src={brokericon} alt="Broker" sx={{ width: 40, height: 40, mr: 2 }} />
              <Box>
                <Typography variant="subtitle1" fontWeight="bold" color="primary">
                  Broker
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Freight broker or agent
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Form */}
          <CardContent>
            <form onSubmit={handleSubmit}>{renderStepContent()}</form>
          </CardContent>

          {/* Buttons */}
                   <Box mt={3} display="flex" justifyContent="space-between" p={2}>
            <Button
              variant="outlined"
              onClick={handleBack}
              disabled={step === 1}
              sx={{ mr: 2 }} // Add right margin for spacing
            >
              Previous
            </Button>
            {step === 5 ? (
              <Button variant="contained" type="submit">
                Submit
              </Button>
            ) : (
              <Button variant="contained" onClick={handleNext}>
                Next
              </Button>
            )}
          </Box>

        </Card>
      </Box>
    </Box>
  );
}
