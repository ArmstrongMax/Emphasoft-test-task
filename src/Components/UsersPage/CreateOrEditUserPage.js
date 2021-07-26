import React, {useState} from "react";
import {Field, Form, Formik} from "formik";
import {AddOrEditUserSchema} from "../../Validation/Validation";
import errorStyles from "../../CommonStyles/ErrorMessage.module.css";
import styles from "./CreateOrEditUserPage.module.css";

//One component for edit and create user (because logic is basically same). They differ by incoming props and preset values
//Submit methods differs and comes from props. Uses Formik with validation

let CreateOrEditUserPage = (props) => {
    const [initialValues,] = useState(() => {
        if (props.action === 'edit') return (
            {
                id: props.id,
                username: props.username,
                first_name: props.first_name,
                last_name: props.last_name,
                password: '',
                is_active: props.is_active
            })
        else if (props.action === 'create') return (
            {
                username: '',
                first_name: '',
                last_name: '',
                password: '',
                is_active: false
            })
    })

    return <div className={styles.container}>
        <Formik
            initialValues={initialValues}
            validationSchema={AddOrEditUserSchema}
            onSubmit={(value) => {
                props.onSubmit(value)
                props.closeWindow(false)
            }}>
            {({errors, touched}) => (
                <Form>
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="username">Логин</label>
                        <Field className="form-control" id="username" name="username" placeholder="Логин" type="text"/>
                        {errors.username && touched.username ? (
                            <div className={errorStyles.errorMessage}>{errors.username}</div>
                        ) : null}
                    </div>
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="first_name">Имя</label>
                        <Field className="form-control" id="first_name" name="first_name" placeholder="Имя"
                               type="text"/>
                        {errors.first_name && touched.first_name ? (
                            <div className={errorStyles.errorMessage}>{errors.first_name}</div>
                        ) : null}
                    </div>
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="last_name">Фамилия</label>
                        <Field className="form-control" id="last_name" name="last_name" placeholder="Фамилия"
                               type="text"/>
                        {errors.last_name && touched.last_name ? (
                            <div className={errorStyles.errorMessage}>{errors.last_name}</div>
                        ) : null}
                    </div>
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="password">Новый пароль</label>
                        <Field className="form-control" id="password" name="password" placeholder="Пароль" type="text"/>
                        {errors.password && touched.password ? (
                            <div className={errorStyles.errorMessage}>{errors.password}</div>
                        ) : null}
                    </div>
                    <div className={styles.radio}>
                        <div className={styles.radioButtons}>
                            <Field component="div" name="is_active">
                                <label htmlFor="is_active">Включить учетную запись?</label>
                                <input
                                    type="radio"
                                    id="active"
                                    defaultChecked={props.is_active === true}
                                    name="is_active"
                                    value={true}
                                />
                                <label htmlFor="radioOne">Да</label>

                                <input
                                    type="radio"
                                    id="nonActive"
                                    defaultChecked={props.is_active === false}
                                    name="is_active"
                                    value={false}
                                />
                                <label htmlFor="radioTwo">Нет</label>
                            </Field>

                        </div>
                        {errors.is_active
                            ? <div className={errorStyles.errorMessage}>{errors.is_active}</div>
                            : null}
                    </div>
                    <div className={styles.submit}>
                        <div className={styles.submitButton}>
                            <button className="btn btn-primary" type="submit">Сохранить изменения</button>
                        </div>
                    </div>
                </Form>)}
        </Formik>
    </div>
}
export default CreateOrEditUserPage