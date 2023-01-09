import * as yup from "yup";
import AddressInfo from "../components/Checkout/AddressInfo";
import Confirmation from "../components/Checkout/Confirmation";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { selectCart } from "../store/cartSlice";
import { useSelector } from "react-redux";
import { Formik } from "formik";
import {
  Container,
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { ORDER_CREATE } from "../queries";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51MMSxDEuhLhcyirl6xCYkC9RZjSyAfFbpgA4iRNIsVlxSYeMsoFf6m7MSv9Wkb84gfJKF2jlFFfcyZamdcA21q8M00N5nRXDIl"
);

const Cehckout = () => {
  const { cart } = useSelector(selectCart);
  const [activeStep, setActiveStep] = useState(0);
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;
  const [placeOrder] = useMutation(ORDER_CREATE);
  const query = new URLSearchParams(window.location.search);

  useEffect(() => {
    if (query.get("canceled")) {
      // setMessage("Order placed! You will receive an email confirmation.");
      alert("Order canceled");
    }
  }, []);

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
      // alert("Payment!");
      makePayment(values);
    }

    actions.setTouched({});
  };

  const makePayment = async (values) => {
    const stripe = await stripePromise;

    const response = await placeOrder({
      variables: {
        products: JSON.stringify(Object.values(cart)),
        username: values.username || values.email,
      },
    });

    const {
      id,
      attributes: { stripeSessionId, url },
    } = response.data.createOrder.data;

    window.location.href = url;
    // const { error } = await stripe.redirectToCheckout({
    //   sessionId: stripeSessionId,
    // });
  };

  return (
    <Container sx={{ display: "flex", flexFlow: "column" }}>
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
              <Box m="2rem 0">
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
                {isSecondStep && <Confirmation values={values} cart={cart} />}
              </Box>
              <Box display="flex" justifyContent="space-between" gap="50px">
                {!isFirstStep && (
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    sx={{
                      padding: "15px 40px",
                    }}
                    onClick={() => setActiveStep(activeStep - 1)}
                  >
                    Back
                  </Button>
                )}
                <Button
                  fullWidth
                  type="submit"
                  color="primary"
                  variant="contained"
                  sx={{
                    // mt: 3,
                    padding: "15px 40px",
                  }}
                >
                  {!isSecondStep ? "Next" : "Place Order"}
                </Button>
              </Box>
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
