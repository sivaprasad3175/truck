import type { User } from "../types";
import {
    Card,
    CardContent,
    Typography,
    Button,
    Divider,
    Box,
    Stack,
} from "@mui/material";

interface Props {
    user: string; // We'll pass email to identify the logged-in user
    onLogout: () => void;
}

export default function Dashboard({ user, onLogout }: Props) {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const currentUser = users.find((u) => u.email === user);

    if (!currentUser) {
        return (
            <Card sx={{ maxWidth: 500, mx: "auto", mt: 4, textAlign: "center" }}>
                <CardContent>
                    <Typography variant="h6">User not found</Typography>
                    <Button
                        variant="contained"
                        color="error"
                        sx={{ mt: 2 }}
                        onClick={onLogout}
                    >
                        Logout
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 2 }}>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    Welcome, {currentUser.name} 👋
                </Typography>
                <Divider sx={{ mb: 2 }} />

                {/* Basic + Account Info */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        gap: 3,
                    }}
                >
                    {/* Basic Info */}
                    <Stack spacing={1} flex={1}>
                        <Typography><strong>Email:</strong> {currentUser.email}</Typography>
                        <Typography><strong>Mobile:</strong> {currentUser.mobile}</Typography>
                    </Stack>

                    {/* Account / Role Info */}
                    <Stack spacing={1} flex={1}>
                        <Typography><strong>Role:</strong> {currentUser.role || "-"}</Typography>
                        <Typography><strong>Plan:</strong> {currentUser.plan}</Typography>
                        <Typography><strong>Privacy Accepted:</strong> {currentUser.privacy ? "Yes" : "No"}</Typography>
                        <Typography><strong>Terms Accepted:</strong> {currentUser.terms ? "Yes" : "No"}</Typography>
                    </Stack>
                </Box>

                {/* Payment Info */}
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6">Payment Details</Typography>
                <Stack spacing={1} mt={1}>
                    <Typography><strong>Method:</strong> {currentUser.paymentMethod}</Typography>
                    {currentUser.paymentMethod === "card" && (
                        <>
                            <Typography><strong>Card Name:</strong> {currentUser.cardName}</Typography>
                            <Typography><strong>Card Number:</strong> {currentUser.cardNumber}</Typography>
                            <Typography><strong>Expiry:</strong> {currentUser.expiry}</Typography>
                            <Typography><strong>CVV:</strong> {currentUser.cvv}</Typography>
                        </>
                    )}
                </Stack>

                {/* Compliance Info */}
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6">Compliance Info</Typography>
                <Stack spacing={1} mt={1}>
                    <Typography><strong>MC Number:</strong> {currentUser.mcNumber}</Typography>
                    <Typography><strong>DOT Number:</strong> {currentUser.dotNumber}</Typography>
                    <Typography variant="body1">
                        <strong>Insurance Proof:</strong>{" "}
                        {currentUser.insuranceProof ? currentUser.insuranceProof.name : "Not uploaded"}
                    </Typography>
                </Stack>

                {/* Additional Info */}
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6">Additional Info</Typography>
                <Typography>{currentUser.additionalInfo || "No extra details provided"}</Typography>

                <Button
                    variant="contained"
                    color="error"
                    sx={{ mt: 3 }}
                    onClick={onLogout}
                >
                    Logout
                </Button>
            </CardContent>
        </Card>
    );
}
