import React from 'react';
import { ErrorMessage, useField } from 'formik';
import styles from './Input.module.css';

const InputField = ({label,placeholder, ...props}) => {
    const [field, meta ] = useField(props);
    return (
        <>
            <input 
            className={`${styles.input} ${meta.touched && meta.error && 'is invalid'}`}
            {...field} {...props}
            autoComplete="off"
            placeholder={placeholder}
            />
        <span className={styles.error}><ErrorMessage name={field.name}/></span></>
    )
}

export default InputField;