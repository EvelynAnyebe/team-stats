import styles from 'Form.module.css';


const AppForm = ({children}) => {
    return (
        <div className={`container-fluid ${styles.formWrapper}`}>
            <form>
                {children}
            </form>
        </div>
    );
}

export default AppForm;
