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
import { History } from 'history';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { login, IAuthInput } from '../../../redux/actions/auth.actions';
import { IAppState } from '../../../redux/reducers/base.reducer';

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
  // email: string;
  username: string;
  password: string;
}

interface OtherProps {
  // title?: string;
}

interface ILoginProps {
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
    <div className="login">
        <form onSubmit={handleSubmit}>
        <Card className='card'>
          <CardContent>
            <TextField
                className={classes.textfiled}
                id="username"
                label="Usuario"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.username ? errors.username : ""}
                error={touched.username && Boolean(errors.username)}
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

            </CardContent>
            <CardActions className={classes.actions}>          
              <Button
                  className={classes.actionButton}
                  variant="outlined"
                  type="submit"
                  disabled={
                      isSubmitting ||
                      !!(errors.username && touched.username) ||
                      !!(errors.password && touched.password)
                  }
              >
                Login
              </Button>
            </CardActions>
          </Card>

        </form>
    </div>
  );
}

function actionCreator(dispatch: ThunkDispatch<any, any, AnyAction>) {
  return {
    login: (user: IAuthInput) => dispatch(login(user))
  };
}

const formikLogin = withFormik<ILoginProps & ReturnType<typeof actionCreator>, FormValues>({
  mapPropsToValues: props => ({
    username: "",
    password: "",
  }),

  validationSchema: Yup.object().shape({
    username: Yup.string()
          // .email("Email not valid")
          .required("Este camppo es requerido"),
    password: Yup.string().required("Este camppo es requerido"),
  }),

  handleSubmit(
      { username, password }: FormValues,
      { props, setSubmitting, setErrors }
  ) {
      props.login({username, password});
  }
})(Form);

function mapState(state: IAppState) {
  const { loggingIn } = state.authentication;
  return { loggingIn };
}

const Login = connect(
  mapState,
  actionCreator
)(formikLogin)

export default Login;