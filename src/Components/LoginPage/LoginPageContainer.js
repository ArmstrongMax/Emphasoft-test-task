import React from "react";
import {connect} from "react-redux";
import LoginPage from "./LoginPage";
import {loginRequest} from "../../Redux/AuthReducer"
import {Redirect} from "react-router-dom";

//Container for login page to check authorisation (if page reload/closed) and to connect data from redux state
//and dispatch. Also container got redirect if someone authorized

let LoginPageContainer = (props) => {

    if (props.isAuthorized) return <Redirect to={'/Users'}/>

    return <LoginPage loginRequest={props.loginRequest} authError={props.authError}/>
}

let mapStateToProps = (state) => {
    return {
        isAuthorized: state.auth.isAuthorized,
        authError: state.auth.authError
    }
}

export default connect(mapStateToProps, {loginRequest})(LoginPageContainer)