import React, {useEffect} from "react";
import './App.css';
import LoginPageContainer from "./Components/LoginPage/LoginPageContainer";
import UsersPageContainer from "./Components/UsersPage/UsersPageContainer";
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {setIsAuthorized} from "./Redux/AuthReducer";

let App = (props) => {

    useEffect(() => {
        if (localStorage.getItem('token')) {
            props.setIsAuthorized(true)
        }
    }, [])

    return <div>
        <Switch>
            <Route exact path='/' component={() => <LoginPageContainer />}/>
            <Route path='/Users' component={() => <UsersPageContainer />}/>
        </Switch>
    </div>
}

let mapStateToProps =(state) => {
    return {isAuthorized: state.auth.isAuthorized}
}
export default connect (mapStateToProps, {setIsAuthorized})(App);
