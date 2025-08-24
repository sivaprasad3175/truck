
import React from "react";
import { TextField, type TextFieldProps } from "@mui/material";

const CustomTextField: React.FC<TextFieldProps> = (props) => {
  return (
    <TextField
      fullWidth
      size="small"
      margin="normal"
      {...props}
      sx={{
        "& .MuiInputBase-root": {
          height: 44, // slightly taller for balance
          fontSize: "0.85rem",
        },
        "& .MuiInputLabel-root": {
          fontSize: "0.8rem",
          marginBottom: "2px", // spacing between label & box
        },
        "& input": {
          padding: "8px 12px",
        },
        ...props.sx, // allow external overrides
      }}
    />
  );
};

export default CustomTextField;

