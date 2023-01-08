import { Box, Typography, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

const AddressInfo = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  setFieldValue,
}) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <>
      <Box>
        <Typography sx={{ mb: "15px" }} fontSize="18px">
          Billing Information
        </Typography>
      </Box>
      <Box
        display="grid"
        gap="15px"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        }}
      >
        <TextField
          fullWidth
          type="text"
          label="Username"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.username}
          name="username"
          error={errors.username}
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          fullWidth
          type="email"
          label="Email"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email}
          name="email"
          error={errors.email}
          helperText={errors.email && "Email is required!!!"}
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          fullWidth
          type="text"
          label="Address"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.fullAddress}
          name="fullAddress"
          error={errors.fullAddress}
          helperText={errors.fullAddress && "Full Address is required!!!"}
          sx={{ gridColumn: "span 4" }}
        />
      </Box>
    </>
  );
};

export default AddressInfo;
