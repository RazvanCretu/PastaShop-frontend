import * as yup from "yup";
import { useState } from "react";
import { Formik } from "formik";
import {
  Container,
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import AddressInfo from "../components/Checkout/AddressInfo";

const Cehckout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;

  const handleFormSubmit = async (values, actions) => {
    setActiveStep(activeStep + 1);

    // this copies the billing address onto shipping address
    // if (isFirstStep && values.shippingAddress.isSameAddress) {
    //   actions.setFieldValue("shippingAddress", {
    //     ...values.billingAddress,
    //     isSameAddress: true,
    //   });
    // }

    if (isSecondStep) {
      alert("Payment!");
      // makePayment(values);
    }

    actions.setTouched({});
  };

  return (
    <Container sx={{ height: "500px", display: "flex", flexFlow: "column" }}>
      <Stepper
        activeStep={activeStep}
        sx={{ m: "45px auto", height: "100px", width: "80%" }}
      >
        <Step>
          <StepLabel>Address Information</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment Confirmation</StepLabel>
        </Step>
      </Stepper>
      <Box>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema[activeStep]}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              {isFirstStep && (
                <AddressInfo
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              <Button
                fullWidth
                type="submit"
                color="primary"
                variant="contained"
                sx={{
                  color: "white",
                  mt: 3,
                  padding: "15px 40px",
                }}
              >
                {!isSecondStep ? "Next" : "Place Order"}
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

const initialValues = {
  username: "",
  email: "",
  fullAddress: "",
};

const checkoutSchema = [
  yup.object().shape({
    username: yup.string(),
    email: yup.string().required("required"),
    fullAddress: yup.string().required("required"),
  }),
];

export default Cehckout;
