import { FunctionComponent, useContext } from "react";
import FormInputsCard from "../FormInputsCards";
import { useNavigate } from "react-router-dom";
import { createCard } from "../../../services/cardservices";
import { normalizeCard } from "../../utils/card";
import { useFormik } from "formik";
import * as yup from "yup";
import { normalizeCardInterface } from "../../../interfaces/Card";
import userConnectInfoContext, { userInfoConnectContextInterface } from "../../../context/UserContext";
import ErrorPage from "../../mainLayout/ErrorPage";
import styles from '../../../style/cards.module.css';

interface CreateCardProps {
}

const CreateCard: FunctionComponent<CreateCardProps> = () => {

    const { userBaseInfo } = useContext<userInfoConnectContextInterface>(userConnectInfoContext);

    if (!userBaseInfo || (!userBaseInfo?.isBusiness && !userBaseInfo.isAdmin)) {
        return <ErrorPage />
    }
    else {

        const navigate = useNavigate();

        const formikValidationSchema = {
            title: yup
                .string()
                .required("requird field")
                .min(2, "min 2 characters")
                .max(256, "max 256 characters"),
            subtitle: yup
                .string()
                .required("requird field")
                .min(2, "min 2 characters")
                .max(256, "max 256 characters"),
            description: yup
                .string()
                .required("requird field")
                .min(2, "min 2 characters")
                .max(1024, "max 1024 characters"),
            phone: yup
                .string()
                .required("requird field")
                .min(9, "min 9 characters")
                .max(11, "max 11 characters"),
            email: yup
                .string()
                .required("requird field")
                .email("email is not in the right pattern")
                .min(5, "min 5 characters"),
            web: yup
                .string()
                .min(14, "min 14 characters"),
            imgUrl: yup
                .string()
                .url("url is not in the right pattern")
                .min(14, "min 14 characters"),
            imgAlt: yup
                .string()
                .min(2, "min 2 characters")
                .max(256, "max 256 characters"),
            state: yup
                .string(),
            country: yup
                .string()
                .required("requird field"),
            city: yup
                .string()
                .required("requird field"),
            street: yup
                .string()
                .required("requird field"),
            houseNumber: yup
                .number()
                .required("requird field")
                .min(1, "min 1 characters"),
            zip: yup
                .number()
        }

        const formik = useFormik({
            initialValues: {
                title: "",
                subtitle: "",
                description: "",
                phone: "",
                email: "",
                web: "",
                imgUrl: "",
                imgAlt: "",
                state: "",
                country: "",
                city: "",
                street: "",
                houseNumber: 0,
                zip: 0,
            },
            validationSchema: yup.object(formikValidationSchema),
            onSubmit: (values: normalizeCardInterface) => {
                let normalizeInfoCard = normalizeCard(values); // נמיר את המבנה למבנה שהשרת מצפה
                createCard(normalizeInfoCard)
                    .then(() => {
                        import("../../utils/feedbackMessage").then(module => module.successMesGenery("yayy", "you created a new card"));
                        formik.resetForm();
                        navigate("/my-cards");
                    })
                    .catch(err => {
                        import("../../utils/feedbackMessage").then(module => module.errorMesGenery("", err.response.data));
                    })
            }
        })


        return (<>
            <div className="aboveAllContainerGeneral">

                <h1 className="main-title">create card</h1>

                <p className="infoP">
                    -  you can create only one card with the same email -
                </p>

                <form className={styles.cardInputs_container} onSubmit={formik.handleSubmit}>
                    <FormInputsCard
                        type="text"
                        placeholder="title"
                        name="title"
                        formik={formik}
                    />
                    <FormInputsCard
                        type="text"
                        placeholder="subtitle"
                        name="subtitle"
                        formik={formik}
                    />
                    <FormInputsCard
                        type="text"
                        placeholder="description"
                        name="description"
                        formik={formik}
                    />
                    <FormInputsCard
                        type="tel"
                        placeholder="phone"
                        name="phone"
                        formik={formik}
                    />
                    <FormInputsCard
                        type="url"
                        placeholder="web"
                        name="web"
                        formik={formik}
                    />
                    <FormInputsCard
                        type="email"
                        placeholder="email"
                        name="email"
                        formik={formik}
                    />
                    <FormInputsCard
                        formik={formik}
                        type="url"
                        placeholder="img url"
                        name="imgUrl"
                    />
                    <FormInputsCard
                        formik={formik}
                        type="text"
                        placeholder="img alt"
                        name="imgAlt"
                    />
                    <FormInputsCard
                        formik={formik}
                        type="text"
                        placeholder="state"
                        name="state"
                    />
                    <FormInputsCard
                        formik={formik}
                        type="text"
                        placeholder="country"
                        name="country"
                    />
                    <FormInputsCard
                        formik={formik}
                        type="text"
                        placeholder="city"
                        name="city"
                    />
                    <FormInputsCard
                        formik={formik}
                        type="text"
                        placeholder="street"
                        name="street"
                    />
                    <FormInputsCard
                        formik={formik}
                        type="number"
                        placeholder="houseNumber"
                        name="houseNumber"
                    />
                    <FormInputsCard
                        formik={formik}
                        type="number"
                        placeholder="zip"
                        name="zip"
                    />

                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={!formik.isValid || !formik.dirty}
                    >Submit</button>

                    <button
                        className={styles.cancelBtn}
                        type="button"
                        onClick={() => {
                            navigate("/my-cards");
                        }}>
                        Cancel
                    </button>

                    <button
                        className={styles.refreshBtn}
                        type="button"
                        onClick={() => { formik.resetForm() }}>
                        <i className="fa-solid fa-arrows-rotate" />
                    </button>

                </form>
            </div>
        </>);
    }
}

export default CreateCard;