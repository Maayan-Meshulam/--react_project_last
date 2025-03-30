import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import InputsRegister from "./InputsRegister";
import { registerUser } from "../../../services/userServices";
import { normalizeUser } from "../../utils/users";
import { useFormik } from "formik";
import * as yup from "yup"
import { normalizeUserInterface } from "../../../interfaces/User";
import { alreadyLogdeinMes, errorMesGenery, successMesGenery } from "../../utils/feedbackMessage";
import styles from '../../../style/register.module.css';

interface RegisterProps {
}

const Register: FunctionComponent<RegisterProps> = () => {


        const navigate = useNavigate();


        const formikValidationSchema = {
                firstName: yup.
                        string()
                        .required("requierd field")
                        .min(2, "min 2 characters")
                        .max(256, "max 256 characters"),
                middleName: yup
                        .string()
                        .min(2, "min 2 characters")
                        .max(256, "max 256 characters"),
                lastName: yup
                        .string()
                        .required("requierd field")
                        .min(2, "min 2 characters")
                        .max(256, "max 256 characters"),
                phone: yup
                        .string()
                        .required("requierd field")
                        .min(9, "min 9 characters")
                        .max(11, "max 11 characters"),
                email: yup
                        .string()
                        .required("requierd field")
                        .min(5, "min 5 characters")
                        .email("email not on the right pattern"),

                password: yup
                        .string()
                        .required("requierd field")
                        .min(7, "min 7 characters")
                        .max(20, "max 20 characters")
                        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-]).{7,}$/,
                                "password must include one digit, one capital letter and one special character"),
                PasswordVerification: yup
                        .string()
                        .required("requierd field")
                        .min(7, "min 7 characters")
                        .max(20, "max 20 characters")
                        .oneOf([yup.ref("password")], "passwords nust match"),

                imgUrl: yup
                        .string()
                        .min(14, "min 14 characters")
                        .url("url is not on the right pattern"),
                imgAlt: yup
                        .string()
                        .min(2, "min 2 characters")
                        .max(256, "max 256 characters"),
                state: yup
                        .string()
                        .min(2, "min 2 characters")
                        .max(256, "max 256 characters"),
                country: yup
                        .string()
                        .required("requierd field")
                        .min(2, "min 2 characters")
                        .max(256, "max 256 characters"),
                city: yup
                        .string()
                        .required("requierd field")
                        .min(2, "min 2 characters")
                        .max(256, "max 256 characters"),
                street: yup
                        .string()
                        .required("requierd field")
                        .min(2, "min 2 characters")
                        .max(256, "max 256 characters"),
                houseNumber: yup
                        .number()
                        .required("requierd field")
                        .min(2, "min 2 value")
                        .max(256, "max 256 value"),
                zip: yup
                        .number()
                        .required("requierd field")
                        .min(2, "min 2 value")
                        .max(256, "max 256 value"),
        }


        const formik = useFormik<normalizeUserInterface>({
                initialValues: {
                        firstName: "",
                        middleName: "",
                        lastName: "",
                        phone: "",
                        email: "",
                        password: "",
                        PasswordVerification: "",
                        imgUrl: "",
                        imgAlt: "",
                        state: "",
                        country: "",
                        city: "",
                        street: "",
                        houseNumber: 0,
                        zip: 0,
                        isBusiness: false
                },
                validationSchema: yup.object(formikValidationSchema),
                onSubmit: (values: normalizeUserInterface) => {

                        const normalizeUserInfo = normalizeUser(values);
                        registerUser(normalizeUserInfo)
                                .then(() => {
                                        successMesGenery("Register", "you created a new user, plesae login");
                                        navigate("/login")
                                        formik.resetForm();
                                })
                                .catch(err => {
                                        if (err.response.data = "User already registered") {
                                                alreadyLogdeinMes()
                                                        .then(res => {
                                                                if (res.isConfirmed)
                                                                        navigate("/login")
                                                                else
                                                                        navigate("/register")
                                                        })
                                                        .catch(err => {
                                                                errorMesGenery("", err.response.data)
                                                        })
                                        }
                                        else
                                                errorMesGenery("", err.response.data)

                                })
                }
        })


        return (<>

                <div className="aboveAllContainerGeneral">

                        <h1 className="main-title">Register</h1>
                        <form className={styles.registerForm} onSubmit={formik.handleSubmit}>
                                <InputsRegister
                                        formik={formik}
                                        type="text"
                                        placeholder="first name"
                                        name="firstName"
                                />
                                <InputsRegister
                                        formik={formik}
                                        type="text"
                                        placeholder="middle name"
                                        name="middleName"
                                />
                                <InputsRegister
                                        formik={formik}
                                        type="text"
                                        placeholder="last name"
                                        name="lastName"
                                />
                                <InputsRegister
                                        formik={formik}
                                        type="tel"
                                        placeholder="phone"
                                        name="phone"
                                />
                                <InputsRegister
                                        formik={formik}
                                        type="email"
                                        placeholder="email"
                                        name="email"
                                />
                                <InputsRegister
                                        formik={formik}
                                        type="password"
                                        placeholder="password"
                                        name="password"
                                />
                                <InputsRegister
                                        formik={formik}
                                        type="password"
                                        placeholder="Pass Verification"
                                        name="PasswordVerification"
                                />
                                <InputsRegister
                                        formik={formik}
                                        type="url"
                                        placeholder="img url"
                                        name="imgUrl"
                                />
                                <InputsRegister
                                        formik={formik}
                                        type="text"
                                        placeholder="img alt"
                                        name="imgAlt"
                                />
                                <InputsRegister
                                        formik={formik}
                                        type="text"
                                        placeholder="state"
                                        name="state"
                                />
                                <InputsRegister
                                        formik={formik}
                                        type="text"
                                        placeholder="country"
                                        name="country"
                                />
                                <InputsRegister
                                        formik={formik}
                                        type="text"
                                        placeholder="city"
                                       name="city"
                                />
                                <InputsRegister
                                        formik={formik}
                                        type="text"
                                        placeholder="street"
                                        name="street"
                                />
                                <InputsRegister
                                        formik={formik}
                                        type="number"
                                        placeholder="houseNumber"
                                        name="houseNumber"
                                />
                                <InputsRegister
                                        formik={formik}
                                        type="number"
                                        placeholder="zip"
                                        name="zip"
                                />

                                <div id={styles.isBusinessDiv}>
                                        <input
                                                type="checkbox"
                                                id={styles.isBusiness}
                                                name="isBusiness"
                                                checked={formik.values.isBusiness}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                        />
                                        <label htmlFor={styles.isBusiness}>Signup as business</label>
                                </div>

                                <button
                                        className={styles.submitButton}
                                        type="submit"
                                        disabled={!formik.isValid || !formik.dirty}
                                >Submit</button>

                                <button
                                        className={styles.cancelBtn}
                                        type="button"
                                        onClick={() => {
                                                navigate("/");
                                        }}>
                                        Cancel
                                </button>

                                <button
                                        className={styles.refreshBtn}
                                        type="button"
                                        onClick={() => {
                                                formik.resetForm();
                                        }}>
                                        <i className="fa-solid fa-arrows-rotate"></i>
                                </button>
                        </form>
                </div>
        </>);
}

export default Register;