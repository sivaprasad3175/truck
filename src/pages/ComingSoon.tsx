import { Box, Typography } from "@mui/material";

const ComingSoonPage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      textAlign="center"
    >
      <Typography variant="h1" fontSize={80}>
        🚧
      </Typography>
      <Typography variant="h4" fontWeight={600} mb={2}>
        Coming Soon
      </Typography>
      <Typography variant="body1" color="textSecondary">
        We are working hard to bring you this feature. Stay tuned!
      </Typography>
    </Box>
  );
};

export default ComingSoonPage;
