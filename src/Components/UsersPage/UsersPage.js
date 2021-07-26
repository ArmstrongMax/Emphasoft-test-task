import React, {useEffect, useState} from "react";
import User from "./User";
import _ from 'lodash';
import {Field, Form, Formik} from "formik";
import CreateOrEditUserPage from "./CreateOrEditUserPage";
import styles from "../UsersPage/UsersPage.module.css";

//Page with users. Using "useEffect" without dependency to make request for users only when component is rendered for the first time.
//Just like componentDidMount

let UsersPage = (props) => {

    const [sortType, setSortType] = useState(() => 'asc')
    const [sortField,] = useState(() => 'id')
    const [showCreateNewUserPage, setShowCreateNewUserPage] = useState(() => false)

    useEffect(() => {
        props.getAllUsers()
    }, [])

    //triggers sort method if locale state is changed
    useEffect(() => {
        onSort(sortField, sortType)
    }, [sortField, sortType])
    //sorting method
    let onSort = (sortingField, sortType) => {
        const orderedData = _.orderBy(props.allUsers.concat(), sortingField, sortType)
        props.setOrderedUsers(orderedData)
    }

    return <div className={styles.usersPageContainer}>
        <div className={styles.logoutButton}>
            <button className="btn btn-primary" onClick={props.logoutRequest}>Выйти</button>
        </div>
        <div className={styles.title}>
            <h1>Пользователи</h1>
        </div>
        <Formik
            //form for search by login name. Uses Formik with validation
            initialValues={{
                searchByName: ''
            }}
            onSubmit={(value) => {
                props.searchByName(value)
            }}>
            <Form>
                <div className={styles.addAndSearch}>
                    <div className="input-group mb-3">

                        {showCreateNewUserPage ?
                            <button type="button" className="btn btn-primary" onClick={() => {
                                setShowCreateNewUserPage(!showCreateNewUserPage)
                            }}>Отменить создание нового пользователя
                            </button> :
                            <button type="button" className="btn btn-primary" onClick={() => {
                                setShowCreateNewUserPage(!showCreateNewUserPage)
                            }}>&#43; Создать нового пользователя
                            </button>}
                        <Field className="form-control" id="searchByName" name="searchByName"
                               placeholder="Поиск по логину" type="text"/>
                        <button className="btn btn-primary" type="submit">Поиск</button>
                    </div>
                </div>
            </Form>
        </Formik>

        {showCreateNewUserPage &&
        <CreateOrEditUserPage onSubmit={props.createNewUser} action={'create'} closeWindow={setShowCreateNewUserPage}/>}
        <div className={styles.sortButton}>
            <button className="btn btn-primary" onClick={() => {
                sortType === "asc" ? setSortType("desc") : setSortType("asc")
            }}>Сортировать по ID {sortType === "asc" ? <>&#9650;</> : <>&#9660;</>}</button>
        </div>
        <div className={styles.usersContainer}>
            {props.allUsers.map(user =>
                <div key={user.id}>
                    <User
                        id={user.id}
                        username={user.username}
                        first_name={user.first_name}
                        last_name={user.last_name}
                        is_active={user.is_active}
                        last_login={user.last_login}
                        is_superuser={user.is_superuser}
                        editExistingUser={props.editExistingUser}/>
                </div>
            )}
        </div>
    </div>
}
export default UsersPage