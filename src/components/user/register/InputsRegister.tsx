import { FormikValues } from "formik";
import { FunctionComponent } from "react";
import styles from '../../../style/register.module.css'

interface InputsRegisterProps {
    formik: FormikValues,
    type: string,
    placeholder?: string,
    name: string
}

const InputsRegister: FunctionComponent<InputsRegisterProps> = ({ formik, type, placeholder, name }) => {
    
    return (<>
            <div className={`form-floating ${styles.allRegistersContainerInputs} ${styles[`${name}Container`]}`}>
              <input
                    type={type}
                    className={`form-control ${formik.touched[name] && formik.errors[name] && 'is-invalid'}`} 
                    name = {name}
                    id={name}
                    placeholder={placeholder}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values[name]}
                />
                <label htmlFor="floatingInput" className={styles.floatingLabels}>{placeholder}</label>

                {formik.touched[name] && formik.errors[name] && (<p className={styles.errorP}>{formik.errors[name]}</p>)}

            </div>

    </>);
}

export default InputsRegister;