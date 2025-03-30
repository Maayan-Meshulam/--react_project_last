import { useFormik } from "formik";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import FormInputsCard from "../FormInputsCards";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup"
import { normalizeCard } from "../../utils/card";
import { errorMesGenery, updateCardMes } from "../../utils/feedbackMessage";
import { CardInterface, normalizeCardInterface } from "../../../interfaces/Card";
import { editCard, getCardById } from "../../../services/cardservices";
import userConnectInfoContext, { userInfoConnectContextInterface } from "../../../context/UserContext";
import ErrorPage from "../../mainLayout/ErrorPage";
import styles from '../../../style/cards.module.css';

interface UpdateCardProps {

}

const updateCard: FunctionComponent<UpdateCardProps> = () => {
    
    //user base info
    const { userBaseInfo } = useContext<userInfoConnectContextInterface>(userConnectInfoContext);

    if (!userBaseInfo || (!userBaseInfo?.isBusiness && !userBaseInfo.isAdmin)) {
        return <ErrorPage />
    }
    else {
        const navigate = useNavigate();

        const { id } = useParams();

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

        const [card, setCard] = useState<CardInterface>({
            title: "",
            subtitle: "",
            description: "",
            phone: "",
            email: "",
            web: "",
            image: {
                url: "",
                alt: ""
            },
            address: {
                state: "",
                country: "",
                city: "",
                street: "",
                houseNumber: -1,
                zip: -1,
            }
        })

        useEffect(() => {
            getCardById(id as string)
                .then(res => {
                    setCard(res.data);
                })
                .catch(err => {
                    errorMesGenery("", err.response.data);
                })

        }, [])


        const formik = useFormik<normalizeCardInterface>({
            initialValues: {
                title: card.title,
                subtitle: card.subtitle,
                description: card.description,
                phone: card.phone,
                email: card.email,
                web: card.web,
                imgUrl: card.image?.url,
                imgAlt: card.image?.alt,
                state: card.address.state,
                country: card.address.country,
                city: card.address.city,
                street: card.address.street,
                houseNumber: card.address.houseNumber,
                zip: card.address.zip,
            },
            validationSchema: yup.object(formikValidationSchema),
            enableReinitialize: true,
            onSubmit: (values: normalizeCardInterface) => {
                let normalizeInfoCard = normalizeCard(values);
                editCard(normalizeInfoCard, id as string)
                    .then(() => {
                        updateCardMes();
                        navigate(-1);
                    })
                    .catch(err => {
                        errorMesGenery("", err.response.data);
                    })

                formik.resetForm();
            }
        })


        return (<>
            <div className="aboveAllContainerGeneral">

                <h1 className="main-title">Update card</h1>
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
}

export default updateCard;