import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { RouteProps } from 'react-router';
import { history } from '../redux/store/base.store';
import { IAppState } from '../redux/reducers/base.reducer';

interface Props extends RouteProps {
    loggedIn: boolean;
}

class NotLogedInRoute extends Route<Props> {
  componentDidMount() {
    if (this.props.loggedIn) {
      history.push('/site');
    }
  }
}

function mapStateToProps(state: IAppState) {
  return {
    loggedIn: state.authentication.loggedIn,
  }
}

export default connect(mapStateToProps)(NotLogedInRoute);