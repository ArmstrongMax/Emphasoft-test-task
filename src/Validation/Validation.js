import * as Yup from 'yup'
//Common validation schema for all forms
export const LoginSchema = Yup.object().shape({
    login: Yup.string()
        .min(2, 'Слишком короткий')
        .required('Обязательное поле'),
    password: Yup.string()
        .min(2, 'Слишком короткий')
        .required('Обязательное поле')
});

export const AddOrEditUserSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, 'Логин слишком коротий')
        .max(150, 'Логин слишком длинный')
        .matches(/^[\w.@+-]+$/, 'Недопустимый символ. Только буквы, цифры и символы @ . + - _')
        .required('Обязательное поле'),
    first_name: Yup.string()
        .max(30, 'Имя слишком длинное'),
    last_name: Yup.string()
        .max(150, 'Фамилия слишком длинная'),
    password: Yup.string()
        .min(8, 'Пароль слишком короткий')
        .max(128, 'Пароль слишком длинный')
        .matches(/^(?=.*[A-Z])(?=.*\d).{8,}$/, 'Только латиница, минимум: 8 знаков, 1 заглавная буква, 1 цифра')
        .required('Обязательное поле'),
    is_active: Yup.boolean()
        .required('Обязательное поле')
});