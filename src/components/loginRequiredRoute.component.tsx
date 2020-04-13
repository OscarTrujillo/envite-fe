import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { RouteProps } from 'react-router';
import { history } from '../redux/store/base.store';
import { IAppState } from '../redux/reducers/base.reducer';

interface Props extends RouteProps {
    loggedIn: boolean;
}

class LoginRequiredRoute extends Route<Props> {
  componentDidMount() {
    if (!this.props.loggedIn) {
      history.push('/auth');
    }
  }
}

function mapStateToProps(state: IAppState) {
  return {
    loggedIn: state.authentication.loggedIn,
  }
}

export default connect(mapStateToProps)(LoginRequiredRoute);