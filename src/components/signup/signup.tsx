import React from 'react';
import { TextField } from '@material-ui/core';
import { withFormik, FormikProps } from "formik";
import * as Yup from "yup";

interface FormValues {
  email: string;
  password: string;
}

interface OtherProps {
  title?: string;
}

interface MyFormProps {
  initialEmail?: string;
  initialPassword?: string;
}


const Form = (props: OtherProps & FormikProps<FormValues>) => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    title
  } = props;

  return (
    <div className="signup">
        <form onSubmit={handleSubmit}>
          <TextField
              id="email"
              label="Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.email ? errors.email : ""}
              error={touched.email && Boolean(errors.email)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
           <TextField
              id="password"
              label="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.password ? errors.password : ""}
              error={touched.password && Boolean(errors.password)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
          <button
              type="submit"
              disabled={
                  isSubmitting ||
                  !!(errors.email && touched.email) ||
                  !!(errors.password && touched.password)
              }
          >
              Sign In
          </button>
        </form>
    </div>
  );
}


const SignUp = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: props => ({
      email: props.initialEmail || "",
      password: props.initialPassword || ""
  }),

  validationSchema: Yup.object().shape({
    email: Yup.string()
          .email("Email not valid")
          .required("Email is required"),
      password: Yup.string().required("Password is required")
  }),

  handleSubmit(
      { email, password }: FormValues,
      { props, setSubmitting, setErrors }
  ) {
      console.log(email, password);
  }
})(Form);


export default SignUp;