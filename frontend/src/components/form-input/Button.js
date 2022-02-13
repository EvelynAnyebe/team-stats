import styles from './Input.module.css';

const Button=({type, onClick, children, ...rest})=>{
 
    return(
        <button type={type} className={`${styles.btn}`} {...rest} onClick={onClick}>{children}</button>
    );
}

export default Button;