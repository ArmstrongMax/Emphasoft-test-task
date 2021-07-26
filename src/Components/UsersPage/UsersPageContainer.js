import React from "react";
import {connect} from "react-redux";
import UsersPage from "./UsersPage";
import {createNewUser, editExistingUser, getAllUsers, searchByName, setOrderedUsers} from "../../Redux/UsersReducer";
import {logoutRequest} from "../../Redux/AuthReducer";
import {Redirect} from "react-router-dom";

//Container for login page to check authorisation (if page reload/closed) and to connect data from redux state
//and dispatch. Also container got redirect if nobody authorized

let UsersPageContainer = (props) => {

    if (!props.isAuthorized) return <Redirect to={'/'}/>

    return <UsersPage
        getAllUsers={props.getAllUsers}
        allUsers={props.allUsers}
        setOrderedUsers={props.setOrderedUsers}
        searchByName={props.searchByName}
        createNewUser={props.createNewUser}
        editExistingUser={props.editExistingUser}
        logoutRequest={props.logoutRequest}
    />
}

let mapStateToProps = (state) => {
    return {
        allUsers: state.users.allUsers,
        isAuthorized: state.auth.isAuthorized
    }
}
export default connect(mapStateToProps, {
    getAllUsers,
    setOrderedUsers,
    searchByName,
    createNewUser,
    editExistingUser,
    logoutRequest
})(UsersPageContainer)