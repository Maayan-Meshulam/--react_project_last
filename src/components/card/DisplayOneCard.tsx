import { FunctionComponent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCardById, removeCard } from "../../services/cardservices";
import { DeltedCardMes, errorMesGenery, successMesGenery } from "../utils/feedbackMessage";
import { CardInterface } from "../../interfaces/Card";
import userConnectInfoContext from "../../context/UserContext";
import LikeButton from "./LikeButton";
import styles from '../../style/cards.module.css';

interface DisplayOneCardProps {

}

const DisplayOneCard: FunctionComponent<DisplayOneCardProps> = () => {

    const { id } = useParams();
    console.log(id);

    const [loading, setLoading] = useState(false);

    //user base info
    const { userBaseInfo } = useContext(userConnectInfoContext);
    console.log(userBaseInfo);
    const isconnect = Boolean(userBaseInfo);
    const isAdmin = userBaseInfo?.isAdmin ?? false;

    const [flagRemoveCard, setFlagRemoveCard] = useState<boolean>(false);

    const navigate = useNavigate();
    const [card, setCard] = useState<CardInterface>();


    useEffect(() => {
        setLoading(true);
        getCardById(id as string)
            .then(res => {
                setCard(res.data);
                setLoading(false)
            })
            .catch(err => {
                errorMesGenery("", err.respone.data);
                navigate(-1);
            })
    }, [])

    return (<>

        {loading && <div><i className="spinner-border text-secondary laodingIcon" /><span>...laoding</span></div>}


        {card ? (
            <div className={`aboveAllContainerGeneral ${styles.containerOneCard}`}>

                <div style={{ width: "fit-content", margin: "auto", display: "flex", flexDirection: "column", alignItems: "center" }}>

                    <div className={styles.inline_container_card}>
                        <h1 className="main-title-card">{card.title}</h1>
                        <h3 className="sub-title3">{card.subtitle}</h3>
                        <img src={card.image?.url} alt={card.image?.alt} />
                    </div>

                    <div className={styles.inline_container_card}>

                        <p><span className="span-subTitle">{card.phone} </span></p>
                        <p><span className="span-subTitle">{card.address.country}, {card.address.city}, {card.address.street}</span></p>
                        <p><span className="span-subTitle">{card.email}</span></p>
                        <div className={styles.iconsCardContainer}>
                            <div>
                                <a href="tel:0548002752">
                                    <i className={`fa-solid fa-phone ${styles.iconsCards}`} />
                                </a>

                                {isconnect && (card.user_id?.includes(userBaseInfo?._id as string) || isAdmin) &&
                                    <i className={`fa-solid fa-trash trash ${styles.iconsCards}`}
                                        onClick={() => {
                                            DeltedCardMes().then(res => {
                                                console.log(res);
                                                if (res.isConfirmed) {
                                                    removeCard(card._id as string)
                                                        .then(() => {
                                                            successMesGenery("", "card delted succfully");
                                                            setFlagRemoveCard(!flagRemoveCard); // נגרום למשיכה מחדש של כל הקלפים
                                                        })
                                                        .catch(err => {
                                                            console.log(err);
                                                            errorMesGenery("", err.response.data);
                                                        })
                                                }
                                            })

                                        }}
                                    />}

                                {isconnect && (card.user_id?.includes(userBaseInfo?._id as string) || isAdmin) &&
                                    <i className={`fa-solid fa-pencil ${styles.iconsCards}`}

                                        onClick={() => {
                                            navigate(`/update-card/${card._id}`);
                                        }}
                                    />
                                }

                                {isconnect && <LikeButton card={card} />}
                            </div>
                        </div>
                    </div>
                </div>

                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3354.122309000826!2d34.96055048481763!3d32.789016080968366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151dbbc23cc99ad7%3A0xbbd34b02f05a858a!2sGoogle%2C%20Haifa!5e0!3m2!1siw!2sil!4v1743310015924!5m2!1siw!2sil" width="400" height="300" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

            </div>

        ) : (
            <p>no card</p>
        )
        }



    </>);
}

export default DisplayOneCard;