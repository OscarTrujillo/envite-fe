import { authService } from './../../services/auth.service';

export const authActions = {
  register,
};

function register(user: any) {
  return (dispatch: (arg0: { type: string; user: any; }) => void) => {
    dispatch(request(user));

    authService.register(user)
        .then(
            user => { 
                console.log('success');
            },
            error => {
                console.log('error');
            }
        );
  };
  function request(user: any) { return { type: 'register', user } }
}