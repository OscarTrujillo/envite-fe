import React from 'react';
import { TextField } from '@material-ui/core';
import { withFormik, FormikProps } from "formik";
import * as Yup from "yup";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from "redux-thunk";
import { register } from '../../redux/actions/auth.actions';

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
        <Card className='card'>
          <CardContent>
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
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.password ? errors.password : ""}
                error={touched.password && Boolean(errors.password)}
                margin="dense"
                variant="outlined"
                fullWidth
              />
            </CardContent>
            <CardActions className='actions'>          
              <Button
                  type="submit"
                  disabled={
                      isSubmitting ||
                      !!(errors.email && touched.email) ||
                      !!(errors.password && touched.password)
                  }
              >
                Sign Up
              </Button>
            </CardActions>
          </Card>

        </form>
    </div>
  );
}

function actionCreator(dispatch: ThunkDispatch<any, any, AnyAction>) {
  return {
    register: (user:any) => dispatch(register(user))
  };
}

const formikSignUp = withFormik<MyFormProps & ReturnType<typeof actionCreator>, FormValues>({
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
      props.register({username: email, password});
      // setSubmitting(false);
  }
})(Form);

function mapState(state: any) {
  const { registering } = state.registration;
  return { registering };
}

const SignUp = connect(
  mapState,
  actionCreator
)(formikSignUp)

export default SignUp;