import React from "react";
import { Component } from "react";
import { Button } from "@material-ui/core";
import { AnyAction } from "redux";
import { connect } from "react-redux";
import { logout } from "../../redux/actions/auth.actions";
import { ThunkDispatch } from "redux-thunk";

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, AnyAction>) {
    return {
      logout: () => dispatch(logout())
    };
}

type TConnectedLogoutProps = ReturnType<typeof mapDispatchToProps>;
  
class ConnectedLogout extends Component<TConnectedLogoutProps> {

    onclickLogout = () => { 
        this.props.logout();
    }  
    
    render() {
        return ( 
            <Button
                variant="outlined"
                onClick={this.onclickLogout}
                type="submit"
            >
                Logout
            </Button>
        )
    }
}

const Logout = connect(
    null,
    mapDispatchToProps
)(ConnectedLogout)

export default Logout;