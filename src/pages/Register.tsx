import React, {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import bgImage from "../assets/broker.png";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import brokericon from "../assets/brokericon.png";
import CustomTextField from "../components/CustomTextField";
import { useLocation } from "wouter";
import type { User } from "../types";


export default function RegisterMUI() {
  const [step, setStep] = useState<number>(1);
  const [, navigate] = useLocation();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    role: "broker",
    mcNumber: "",
    dotNumber: "",
    plan: "basic",
    paymentMethod: "card",
    cardNumber: "",
    cvv: "",
    expiry: "",
    cardName: "",
    autoRenew: true,
    terms: false,
    privacy: false,
    suretyBond: null as File | null,
    insuranceProof: null as File | null,
    additionalInfo: "",
    password: "",
    confirmPassword: "",
  });

  const [isPrevHovered, setIsPrevHovered] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // useEffect(() => {
  //   if (
  //     window.location.pathname === "/register" &&
  //     sessionStorage.getItem("registered") === "true"
  //   ) {
  //     navigate("/");
  //   }
  // }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };
  const handleBack = (): void => {
    if (step > 1) setStep((prev) => prev - 1);
  };



  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateStep = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
      if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
        newErrors.email = "Valid Email is required";
      if (!formData.mobile.match(/^\d{10}$/))
        newErrors.mobile = "Mobile must be 10 digits";
      if (formData.password.length < 6)
        newErrors.password = "Password must be at least 6 characters";
      if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
    } 


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (): void => {
    if (validateStep()) {
      if (step < 5) setStep((prev) => prev + 1);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!validateStep()) return;

    // save user
    console.log("Submitted ✅", formData);
    sessionStorage.setItem("registered", "true");
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const exists = users.find((u: User) => u.email === formData.email);
    if (exists) {
      alert("Email already registered");
      return;
    }
    users.push(formData);
    localStorage.setItem("users", JSON.stringify(users));
  };


  const plans = [
    {
      key: "basic",
      title: "Basic",
      price: "$29",
      features: [
        "Load Management",
        "Driver Tracking",
        "Basic Reports",
        "Email Support",
      ],
    },
    {
      key: "pro",
      title: "Professional",
      price: "$59",
      features: [
        "Everything in Basic",
        "Advanced Analytics",
        "API Access",
        "Phone Support",
        "Custom Integrations",
      ],
    },
    {
      key: "enterprise",
      title: "Enterprise",
      price: "$99",
      features: [
        "Everything in Pro",
        "Dedicated Account Manager",
        "Custom Features",
        "24/7 Priority Support",
      ],
    },
  ];

  const renderStepContent = (): React.ReactNode => {
    switch (step) {
      case 1:
        return (
          <>
            <CustomTextField
              label="Full Name"
              name="fullName"
              placeholder="Enter Company Name"
              value={formData.fullName}
              onChange={handleChange}
              error={!!errors.fullName}
              helperText={errors.fullName}

            />
            <CustomTextField
              label="Email Address"
              name="email"
              placeholder="Enter Email Address"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}

            />
            <CustomTextField
              label="Mobile Number"
              name="mobile"
              placeholder="Enter Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              error={!!errors.mobile}
              helperText={errors.mobile}
            />
            <CustomTextField
              type="password"
              label="Password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.mobile}
              helperText={errors.password}
            />
            <CustomTextField
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              placeholder="Enter Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />
          </>
        );

      case 2:
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <CustomTextField
              label="MC Number"
              name="mcNumber"
              placeholder="Enter MC Number"
              value={formData.mcNumber}
              onChange={handleChange}
              required
            />
            <CustomTextField
              label="DOT Number"
              name="dotNumber"
              placeholder="Enter DOT Number"
              value={formData.dotNumber}
              onChange={handleChange}
              required
            />

            {/* Surety Bond */}
            <FileUpload
              label="Surety Bond"
              name="suretyBond"
              onChange={handleFileChange}
            />

            {/* Insurance Proof */}
            <FileUpload
              label="Insurance Proof"
              name="insuranceProof"
              onChange={handleFileChange}
            />
          </Box>
        );

      case 3:
        return (
          <Box sx={{ maxWidth: 800, mx: "auto" }}>
            {/* Toggle */}
            <Stack
              direction="row"
              justifyContent="center"
              spacing={2}
              mb={3}
              sx={{ backgroundColor: "#F3F6FB" }}
            >
              <Button variant="contained">Monthly</Button>
              <Button variant="outlined">Yearly</Button>
            </Stack>

            {/* Plans */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              mb={4}
            >
              {plans.map((item) => (
                <Card
                  key={item.key}
                  sx={{
                    flex: 1,
                    p: 2,
                    border:
                      formData.plan === item.key
                        ? "2px solid #1976d2"
                        : "1px solid #ddd",
                    borderRadius: 2,
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, plan: item.key }))
                  }
                >
                  <Typography variant="h6" mb={1}>
                    {item.title}
                  </Typography>
                  <Typography variant="h5" color="primary" mb={2}>
                    {item.price}/mo
                  </Typography>
                  {item.features.map((f, i) => (
                    <Typography key={i} variant="body2">
                      • {f}
                    </Typography>
                  ))}
                </Card>
              ))}
            </Stack>

            <Divider sx={{ my: 3 }} />

            {/* Payment Section */}
            <Box
              sx={{ backgroundColor: "#F3F6FB", p: 2, borderRadius: 2 }}
            >
              <Typography variant="h6" gutterBottom>
                Payment Method
              </Typography>
              <RadioGroup
                row
                value={formData.paymentMethod}
                onChange={handleChange}
                name="paymentMethod"
              >
                <FormControlLabel
                  value="card"
                  control={<Radio />}
                  label="Credit Card"
                />
                <FormControlLabel
                  value="bank"
                  control={<Radio />}
                  label="Bank Transfer"
                />

              </RadioGroup>

              {formData.paymentMethod === "card" && (
                <Stack spacing={2} mt={2}>
                  <CustomTextField
                    label="Cardholder Name"
                    name="cardName"
                    placeholder="John Doe"
                    value={formData.cardName}
                    onChange={handleChange}
                  />
                  <CustomTextField
                    label="Card Number"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={handleChange}
                  />
                  <Stack direction="row" spacing={2}>
                    <CustomTextField
                      label="Expiry Date"
                      name="expiry"
                      placeholder="MM/YY"
                      value={formData.expiry}
                      onChange={handleChange}
                    />
                    <CustomTextField
                      label="CVV"
                      name="cvv"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={handleChange}
                    />
                  </Stack>
                </Stack>
              )}

              {formData.paymentMethod === "paypal" && (
                <CustomTextField
                  label="PayPal Email"
                  name="paypalEmail"
                  placeholder="example@paypal.com"
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  value={(formData as any).paypalEmail || ""}
                  onChange={handleChange}
                />
              )}

              {formData.paymentMethod === "bank" && (
                <CustomTextField
                  label="Account Number"
                  name="bankAccount"
                  placeholder="000123456789"
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  value={(formData as any).bankAccount || ""}
                  onChange={handleChange}
                />
              )}
            </Box>
          </Box>
        );

      case 4:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Review Your Information
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography><strong>Name:</strong> {formData.fullName}</Typography>
            <Typography><strong>Email:</strong> {formData.email}</Typography>
            <Typography><strong>Mobile:</strong> {formData.mobile}</Typography>
            <Typography><strong>MC Number:</strong> {formData.mcNumber}</Typography>
            <Typography><strong>DOT Number:</strong> {formData.dotNumber}</Typography>
            <Typography><strong>Plan:</strong> {formData.plan}</Typography>
            <Typography><strong>Payment:</strong> {formData.paymentMethod}</Typography>
          </Box>
        );

      case 5:
        return (
          <Box textAlign="center" p={3}>
            <Typography variant="h5" color="success.main" gutterBottom>
              Registration Submitted Successfully!
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Thank you for joining our logistics platform.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/login")}
            >
              Click to Login
            </Button>
          </Box>
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
    overflow: "hidden",   // prevent nested scroll issues
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
      <Typography variant="caption" color="text.secondary">
        Fill the required details
      </Typography>
    </Box>

    {!isMobile && (
      <ArrowForwardIcon sx={{ color: "#888", fontSize: 28, mx: 2 }} />
    )}

    <Box flex={1} textAlign="center">
      <Typography variant="subtitle1" fontWeight="bold">
        Registration Progress
      </Typography>
      <Typography variant="caption" color="text.secondary">
        Complete your profile
      </Typography>
    </Box>
  </Box>

  {/* Role Card - keep outside scroll area */}
  <Box sx={{ p: 2 }}>
    <Card sx={{ backgroundColor: "#e3f2fd", borderRadius: 2 }}>
      <CardContent sx={{ display: "flex", alignItems: "center" }}>
        <Box
          component="img"
          src={brokericon}
          alt="Broker"
          sx={{ width: 40, height: 40, mr: 2 }}
        />
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            color="primary"
          >
            Broker
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Freight broker or agent
          </Typography>
        </Box>
      </CardContent>
    </Card>
  </Box>

  {/* Scrollable Form Section */}
  <CardContent sx={{ flex: 1, overflowY: "auto", maxHeight: "60vh" }}>
    <form onSubmit={handleSubmit}>
      {renderStepContent()}

      <Box mt={3} display="flex" justifyContent="space-between" p={2}>
        {step !== 5 && (
          <Button
            variant="outlined"
            onClick={handleBack}
            disabled={step === 1}
            sx={{
              mr: 2,
              color: isPrevHovered ? "#fff" : undefined,
              backgroundColor: isPrevHovered ? "#1976d2" : undefined,
              borderColor: isPrevHovered ? "#1976d2" : undefined,
              "&:hover": {
                color: "#fff",
                backgroundColor: "#1976d2",
                borderColor: "#1976d2",
              },
            }}
            onMouseEnter={() => setIsPrevHovered(true)}
            onMouseLeave={() => setIsPrevHovered(false)}
          >
            {isPrevHovered ? "Go Back" : "Previous"}
          </Button>
        )}
        {step === 5 ? (
          <Button type="submit" variant="contained">
            Complete Registration
          </Button>
        ) : (
          <Button variant="contained" onClick={handleNext}>
            Next
          </Button>
        )}
      </Box>
    </form>
  </CardContent>
</Card>

      </Box>
    </Box>
  );
}

/* File Upload Helper Component */
type FileUploadProps = {
  label: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

function FileUpload({ label, name, onChange }: FileUploadProps) {
  return (
    <Box>
      <Typography variant="body2" fontWeight="bold" mb={1}>
        {label} <span style={{ color: "red" }}>*</span>
      </Typography>
      <Box
        sx={{
          border: "1px dashed #ccc",
          borderRadius: 2,
          p: 2,
          textAlign: "center",
        }}
      >
        <input
          type="file"
          name={name}
          style={{ display: "none" }}
          id={name}
          onChange={onChange}
        />
        <label htmlFor={name} style={{ cursor: "pointer" }}>
          <Typography variant="body2" color="textSecondary">
            Drop files here or{" "}
            <span style={{ color: "#1976d2" }}>Browse</span>, Max: 10MB
          </Typography>
        </label>
      </Box>
    </Box>
  );
}
