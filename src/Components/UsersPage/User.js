import React, {useState} from "react";
import styles from './User.module.css'
import CreateOrEditUserPage from "./CreateOrEditUserPage";

//Component for every user.

let User = (props) => {
    const [showEditUserPage, setShowEditUserPage] = useState(() => false)

    return <div>
        <div className={styles.userContainer}>
            <div className={styles.block}>
                <div className={styles.blockContent}>
                    <span className={styles.title}>ID </span>{props.id}
                </div>
                <div className={styles.blockContent}>
                    <span className={styles.title}>Логин</span> {props.username}
                </div>
            </div>
            <div className={styles.block}>
                <div className={styles.blockContent}>
                    <span className={styles.title}>Имя</span> {props.first_name || <span> не указано</span>}
                </div>
                <div className={styles.blockContent}>
                    <span className={styles.title}>Фамилия</span> {props.last_name || <span> не указана</span>}
                </div>
            </div>
            <div className={styles.block}>
                <div className={styles.blockContent}>
                    <span className={styles.title}>Учетная запись включена</span> {props.is_active ? <span>Да</span> :
                    <span>Нет</span>}
                </div>
                <div className={styles.blockContent}>
                    <span className={styles.title}>Повышенные привилегии</span> {props.is_superuser ?
                    <span>Да</span> :
                    <span>Нет</span>}
                </div>
            </div>
            <div className={styles.block}>
                <div className={styles.blockContent}>
                    <span className={styles.title}>Дата последнего входа</span> {props.last_login ||
                <span>Вход не выполнялся</span>}
                </div>
            </div>
            <div className={styles.block}>
                <div className={styles.blockContent}>
                    {showEditUserPage ? <button className="btn btn-primary" onClick={() => {
                            setShowEditUserPage(!showEditUserPage)
                        }}>Отменить
                        </button> :
                        <button className="btn btn-primary" onClick={() => {
                            setShowEditUserPage(!showEditUserPage)
                        }}>Редактировать
                        </button>}
                </div>
            </div>
        </div>
        <div>
            {showEditUserPage &&
            <CreateOrEditUserPage id={props.id}
                                  username={props.username}
                                  first_name={props.first_name}
                                  last_name={props.last_name}
                                  is_active={props.is_active}
                                  onSubmit={props.editExistingUser}
                                  action={'edit'}
                                  closeWindow={setShowEditUserPage}

            />}
        </div>
    </div>
}
export default User