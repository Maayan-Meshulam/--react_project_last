import { useFormik } from "formik";
import { FunctionComponent, useContext, useState } from "react";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { getUserById, loginUser, saveNameInStorage } from "../../services/userServices";
import { encodingToken, saveTokenInStorage } from "../../services/tokenServices";
import { errorMesGenery, successMesGenery } from "../utils/feedbackMessage";
import userConnectInfoContext, { userInfoConnectContextInterface } from "../../context/UserContext";
import { loginUserInterface } from "../../interfaces/User";
import { TokenInterface } from "../../interfaces/tokenInterface";
import styles from '../../style/login.module.css';

interface LoginProps {
}


const Login: FunctionComponent<LoginProps> = () => {

    const [errorMes, setErrorMes] = useState<string>("");

    const [stayConnect, setStayConnect] = useState<boolean>(false); // הישאר מחובר גם שהסשיין נסגר

    const { setUserBaseInfo } = useContext<userInfoConnectContextInterface>(userConnectInfoContext);


    const formikValidationSchema = {
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
                "password must include one digit, one capital letter and one special character")
    }

    const navigate = useNavigate();

    const formik = useFormik<loginUserInterface>({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: yup.object(formikValidationSchema),
        onSubmit: (values: loginUserInterface) => {
            loginUser(values)
                .then(res => {
                    saveTokenInStorage(stayConnect, res.data); //שמירת הטוקן בזיכרון
                    const tokenPayload: TokenInterface = encodingToken(res.data);

                    //נשמור את שם המשתמש המחובר
                    getUserById(tokenPayload._id)
                        .then(res => {
                            const nameAsString = `${res.data.name.first} ${res.data.name.last}`;
                            saveNameInStorage(stayConnect, nameAsString);
                            setUserBaseInfo(tokenPayload); //שמירת פרטי המשתמש הבסיסיים => מזהה, עסקי ומנהל                        
                            successMesGenery(`Welcome 
                            ${nameAsString}
                            `, "you loged in !");
                            navigate('/');

                        })
                        .catch(err => errorMesGenery("", err.response.data))

                })
                .catch(err => {
                    setErrorMes(err.response.data);
                })

            formik.resetForm();
        }
    })


    return (<>
        <div className="aboveAllContainerGeneral">

            <h1 className="main-title">Login</h1>

            {errorMes != "" && <p className="errorP">{errorMes}</p>}

            <form className={styles.loginForm} onSubmit={formik.handleSubmit}>

                <div id="containerInputsLogin">

                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            id={styles.email}
                            name="email"
                            className={`form-control ${formik.touched.email && formik.errors.email && 'is-invalid'}`}
                            placeholder="name@example.com"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>

                    {formik.touched.email && formik.errors.email && (<p className="errorP">{formik.errors.email}</p>)}


                    <div className="form-floating">
                        <input
                            type="password"
                            id={styles.password}
                            name="password"
                            className={`form-control ${formik.touched.password && formik.errors.password && 'is-invalid'}`}
                            placeholder="Password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    {formik.touched.password && formik.errors.password && (<p className="errorP">{formik.errors.password}</p>)}

                    <p className={styles.isRegiser}>not register yet ? <Link to="/register" style={{ color: "blue" }}>click here</Link> to register</p>

                </div>

                <div id={styles.isStayLoginDiv}>
                    <input
                        type="checkbox"
                        id={styles.isStayLogin}
                        onClick={() => setStayConnect(!stayConnect)}
                    />
                    <label htmlFor={styles.isStayLogin}> keep me signed in</label>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", marginBottom:"5px" }}>

                    <button
                        style={{ width: "49%", padding: "7px" }}
                        className={styles.cancelBtn}
                        type="button"
                        onClick={() => {
                            navigate("/");
                        }}>
                        Cancel
                    </button>

                    <button
                        style={{ width: "49%", padding: "7px" }}
                        className={styles.refreshBtn}
                        type="button"
                        onClick={() => {
                            formik.resetForm();
                            document.getElementById("loginErrorMes")?.remove();
                        }}>
                        <i className="fa-solid fa-arrows-rotate"></i>
                    </button>
                </div>

                <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={!formik.isValid || !formik.dirty}
                >Submit</button>
            </form>
        </div>

    </>);
}

export default Login;