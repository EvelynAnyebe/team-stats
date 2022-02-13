import styles from './Form.module.css';


const AppForm = ({ children }) => {
    return (
        <div className={`container-fluid ${styles.formWrapper}`}>
            <div className={`row`}>
                <div className={`col-sm-12 col-md-2 col-lg-3`}>&nbsp;</div>
                <div className={`col-sm-12 col-md-8 col-lg-6`}>
                <div className={`${styles.appForm}`}>{children}</div>
                </div>
                <div className={`col-sm-12 col-md-2 col-lg-3`}>&nbsp;</div>
            </div>
        </div>
    );
}

export default AppForm;
