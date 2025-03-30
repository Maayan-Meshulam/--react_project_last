import { FunctionComponent } from "react";
import styles from '../../style/cards.module.css';

interface FormInputsCardsProps {
    type: string,
    placeholder?: string,
    name: string,
    formik: any,
}

const FormInputsCards: FunctionComponent<FormInputsCardsProps> = ({ type, placeholder, name, formik }) => {
    return (<>

        <div className={`form-floating ${styles[`${name}Container`]}`}>
                <input
                    type={type}
                    id={name}
                    className={`form-control ${formik.touched[name] && formik.errors[name] && 'is-invalid'}`}
                    value={formik.values[name]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <label htmlFor="floatingInput" className="floatingLabels">{placeholder}</label>

            {formik.touched[name] && formik.errors[name] && (<p className="errorP">{formik.errors[name]}</p>)}

        </div>

    </>);
}

export default FormInputsCards;