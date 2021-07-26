import {Field, Form, Formik} from "formik";
import React from "react";
import {LoginSchema} from "../../Validation/Validation";
import styles from './LoginPage.module.css'
import errorStyles from '../../CommonStyles/ErrorMessage.module.css'

//Login Page uses Formik with validation schema and errors messages. Submit goes to redux thunk

let LoginPage = (props) => {
    return <div className={styles.loginPageContainer}>
        <div className={styles.loginFormContainer}>
            <Formik
                initialValues={{login: '', password: ''}}
                validationSchema={LoginSchema}
                onSubmit={(values) => {
                    props.loginRequest(values.login, values.password)
                }}>
                {({errors, touched}) => (
                    <Form>
                        <div className={styles.loginForm}>
                            <h1>Авторизация</h1>
                            <div>
                                <label htmlFor="login">Логин</label>
                                <Field className = "form-control" id="login" name="login" placeholder="Логин"/>
                                {errors.login && touched.login ? (
                                    <div className={errorStyles.errorMessage}>{errors.login}</div>
                                ) : null}
                            </div>
                            <div>
                                <label htmlFor="password">Пароль</label>
                                <Field className = "form-control" id="password" name="password" placeholder="Пароль" type="password"/>
                                {errors.login && touched.login ? (
                                    <div className={errorStyles.errorMessage}>{errors.password}</div>
                                ) : null}
                            </div>
                            <div>
                                <button type="submit" className="btn btn-primary">Авторизация</button>
                            </div>
                            {props.authError && <div className={errorStyles.errorMessage}>
                                Неверные имя пользователя или пароль
                            </div>}
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    </div>
}

export default LoginPage