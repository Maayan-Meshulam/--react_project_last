import { useFormik } from "formik";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import * as yup from "yup";
import { getUserById, updateUser } from "../../services/userServices";
import { errorMesGenery, successMesGenery } from "../utils/feedbackMessage";
import { useNavigate, useParams } from "react-router-dom";
import InputsRegister from "./register/InputsRegister";
import { normalizeUpdateUserInterface, updateUserInterface } from "../../interfaces/User";
import { normalizeUserUpdate } from "../utils/users";
import userConnectInfoContext from "../../context/UserContext";
import styles from '../../style/userInfo.module.css';

interface UpdateUserDetailsProps {

}

const UpdateUserDetails: FunctionComponent<UpdateUserDetailsProps> = () => {

        const [loading, setLoading] = useState(false);

        const navigate = useNavigate();
        const { userBaseInfo } = useContext(userConnectInfoContext);

        //     let id = useRef<string | undefined>(undefined);

        let { id } = useParams<{ id: string }>();

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

        const [user, setUser] = useState<updateUserInterface>({
                name: {
                        first: "",
                        middle: "",
                        last: ""
                },
                phone: "",
                image: {
                        url: "",
                        alt: ""
                },
                address: {
                        state: "",
                        country: "",
                        city: "",
                        street: "",
                        houseNumber: 0,
                        zip: 0
                },
        });

        useEffect(() => {
                getUserById(id as string)
                        .then(res => {
                                setUser(res.data);
                                setLoading(true)
                        })
                        .catch(err => {
                                //כששמים מזהה לא נכון בכתובת זה עושה שגיאה של להקומפוננטה ולא מגיע לפה
                                errorMesGenery(undefined, err.response.data);
                        })
        }, [])

        const formik = useFormik<normalizeUpdateUserInterface>({
                initialValues: {
                        firstName: user.name.first,
                        middleName: user.name.middle,
                        lastName: user.name.last,
                        phone: user.phone,
                        imgUrl: user.image?.url,
                        imgAlt: user.image?.alt,
                        state: user.address.state,
                        country: user.address.country,
                        city: user.address.city,
                        street: user.address.street,
                        houseNumber: user.address.houseNumber,
                        zip: user.address.zip,
                },
                validationSchema: yup.object(formikValidationSchema),
                enableReinitialize: true,
                onSubmit: (values: normalizeUpdateUserInterface) => {

                        const userInfoNormalize: updateUserInterface = normalizeUserUpdate(values);

                        updateUser(id as string, userInfoNormalize)
                                .then(() => {
                                        successMesGenery("update", "user updates succfully");
                                        userBaseInfo?.isAdmin ? navigate("/sandbox") : navigate('/user-info')
                                })
                                .catch(err => {
                                        errorMesGenery("", err.response.err)
                                })

                }
        })


        return (<>
                <div id="aboveAllContainerGeneral">

                        {!loading && <div className="laodingContainer"><i className="spinner-border text-secondary laodingIcon" /><span>...laoding</span></div>}

                        <h1 className="main-title">Update user</h1>
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
                                        type="text"
                                        placeholder="img alt"
                                        name="imgAlt"
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

                                <button
                                        className={styles.submitButton}
                                        type="submit"
                                        disabled={!formik.isValid || !formik.dirty}
                                >Submit</button>

                                <button
                                        className={styles.cancelBtn}
                                        type="button"
                                        onClick={() => {
                                                navigate(-1);
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

export default UpdateUserDetails;