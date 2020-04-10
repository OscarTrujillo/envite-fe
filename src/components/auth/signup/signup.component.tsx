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
import { register } from '../../../redux/actions/auth.actions';
import { History } from 'history';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { authConstants } from '../../../redux/store/constants.store';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textfiled: {
      height: '63px',
      marginBottom: '0',
    },
    actionButton: {
      marginLeft: 'auto'
    },
    actions: {
      padding: '0 16px 16px 16px'
    }
  }),
);

interface FormValues {
  email: string;
  password: string;
  passwordTwo: string;
}

interface OtherProps {
  // title?: string;
}

interface ISignUpProps {
  initialEmail?: string;
  initialPassword?: string;
  history: History;
}

const Form = (props: OtherProps & FormikProps<FormValues>) => {
  const classes = useStyles();
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    // title
  } = props;

  return (
    <div className="signup">
        <form onSubmit={handleSubmit}>
        <Card className='card'>
          <CardContent>
            <TextField
                className={classes.textfiled}
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
                className={classes.textfiled}
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
            <TextField
                className={classes.textfiled}
                id="passwordTwo"
                value={values.passwordTwo}
                label="Repeat password"
                type='password'
                onChange={handleChange}
                onBlur={handleBlur}

                helperText={touched.passwordTwo ? errors.passwordTwo : ""}
                error={touched.passwordTwo && Boolean(errors.passwordTwo)}
                margin="dense"
                variant="outlined"
                fullWidth
              />

            </CardContent>
            <CardActions className={classes.actions}>          
              <Button
                  className={classes.actionButton}
                  variant="outlined"
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

const formikSignUp = withFormik<ISignUpProps & ReturnType<typeof actionCreator>, FormValues>({
  mapPropsToValues: props => ({
      email: props.initialEmail || "",
      password: props.initialPassword || "",
      passwordTwo: props.initialPassword || "",
  }),

  validationSchema: Yup.object().shape({
    email: Yup.string()
          .email("Email not valid")
          .required("Email is required"),
    password: Yup.string().required("Password is required"),
    passwordTwo: Yup.string()
          .required("Password is required")
          .when("password", {
            is: val => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
              [Yup.ref("password")],
              "Both password need to be the same"
            )
          }),
  }),

  handleSubmit(
      { email, password }: FormValues,
      { props, setSubmitting, setErrors }
  ) {
      console.log(email, password);
      // props.register({username: email, password});
      setSubmitting(false);
      props.history.push('/site');
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