import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import * as yup from "yup";
import { Formik } from "formik";
import {
  Avatar,
  Checkbox,
  FormControlLabel,
  Button,
  Paper,
  TextField as MuiTextField,
  Typography,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { Alert as MuiAlert } from "@material-ui/lab";

import { signIn } from "redux/actions/authActions";
import {
  EMAIL_VALID,
  PASSWORD_VALID
} from 'utils/constants/validations';

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)}px;
  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(10)}px;
  }
`;

const BigAvatar = styled(Avatar)`
  width: 92px;
  height: 92px;
  text-align: center;
  margin: 0 auto ${(props) => props.theme.spacing(5)}px;
`;

const schema = yup.object().shape({
  email: EMAIL_VALID,
  password: PASSWORD_VALID
});

function SignIn() {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <Wrapper>
      <Helmet title="Sign In" />
      <BigAvatar alt="Lucy" src="/static/img/avatars/avatar-1.jpg" />

      <Typography component="h1" variant="h4" align="center" gutterBottom>
        Welcome back, Lucy!
      </Typography>
      <Typography component="h2" variant="body1" align="center">
        Sign in to your account to continue
      </Typography>

      <Formik
        initialValues={{
          email: "demo@bootlab.io",
          password: "unsafepassword",
          submit: false,
        }}
        validationSchema={schema}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await dispatch(
              signIn({ email: values.email, password: values.password })
            );
            history.push("/dashboard/default");
          } catch (error) {
            const message = error.message || "Something went wrong";

            setStatus({ success: false });
            setErrors({ submit: message });
            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Alert mt={3} mb={1} severity="info">
              Use <strong>demo@bootlab.io</strong> and{" "}
              <strong>unsafepassword</strong> to sign in
            </Alert>
            {errors.submit && (
              <Alert mt={2} mb={1} severity="warning">
                {errors.submit}
              </Alert>
            )}
            <TextField
              type="email"
              name="email"
              label="Email Address"
              value={values.email}
              error={Boolean(touched.email && errors.email)}
              fullWidth
              helperText={touched.email && errors.email}
              onBlur={handleBlur}
              onChange={handleChange}
              my={2}
            />
            <TextField
              type="password"
              name="password"
              label="Password"
              value={values.password}
              error={Boolean(touched.password && errors.password)}
              fullWidth
              helperText={touched.password && errors.password}
              onBlur={handleBlur}
              onChange={handleChange}
              my={2}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              Sign in
            </Button>
            <Button
              component={Link}
              to="/auth/reset-password"
              fullWidth
              color="primary"
            >
              Forgot password
            </Button>
          </form>
        )}
      </Formik>
    </Wrapper>
  );
}

export default memo(SignIn);
