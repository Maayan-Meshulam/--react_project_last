import { FunctionComponent, useContext, useEffect, useState } from "react";
import { getAllCards, removeCard } from "../../services/cardservices";
import { DeltedCardMes, errorMesGenery, successMesGenery } from "../utils/feedbackMessage";
import userConnectInfoContext, { userInfoConnectContextInterface } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { CardInterface } from "../../interfaces/Card";
import LikeButton from "./LikeButton";
import { searchContext, searchInterface } from "../../context/SearchContext";
import ErrorPage from "../mainLayout/ErrorPage";
// import { useLikes } from "../../services/useCards";
import styles from '../../style/cards.module.css';

interface MyCardsProps {

}

const MyCards: FunctionComponent<MyCardsProps> = () => {

    //user base info
    const { userBaseInfo } = useContext<userInfoConnectContextInterface>(userConnectInfoContext);
    console.log(userBaseInfo);


    if (!userBaseInfo || (!userBaseInfo?.isBusiness && !userBaseInfo.isAdmin)){
        console.log(89898989);
        return <ErrorPage />
    }        
    else {

        //get search word
        const { exppToSearch } = useContext<searchInterface>(searchContext);
        const [arrSearch, setArrSearch] = useState<CardInterface[]>([]);


        const [arrCards, setArrCards] = useState<CardInterface[]>([]);
        const [flagRemoveCard, setFlagRemoveCard] = useState<boolean>(false);

        const [arrMyCards, setMyArrCards] = useState<CardInterface[]>([]);

        const [loading, setLoading] = useState(false);

        const navigate = useNavigate();


        //זמני
        useEffect(() => {
            console.log(arrMyCards);

        }, [arrMyCards])


        useEffect(() => {
            getAllCards()
                .then((res) => {
                    setArrCards(res.data);
                    setLoading(true)
                }).catch(err => {
                    console.log(err);
                    errorMesGenery("", err.response.data);
                })

        }, [flagRemoveCard]) // נקבל את כל הקלפים ונבצע את זה כל פעם שיש מחיקה של כרטיס


        useEffect(() => {
            if (arrCards && arrCards.length == 0) return;
            //נמצא את הקלפים שהמשתמש יצר
            setMyArrCards(arrCards.filter((card: CardInterface) => {
                return card.user_id == userBaseInfo?._id;
            }))

        }, [arrCards, userBaseInfo]) // נבצע את הקוד כל פעם שיש שינוי במערך הקלפים המקורי


        useEffect(() => {
            //נסנן את המערך לתצוגה
            const searchArr = arrMyCards.filter((card: CardInterface) => {
                const expressionToSearch = exppToSearch.trimStart();
                console.log(card.title, expressionToSearch);

                return card.title.includes(expressionToSearch);
            })

            setArrSearch(searchArr);
        }, [exppToSearch, arrMyCards])

        return (

            <div className="aboveAllContainerGeneral">

                <h1 className="main-title">My cards</h1>

                <div className="laodingContainer">
                    {arrSearch.length == 0 && <p>you dont have your own cards</p>}
                    {!loading && <div>
                        <i className="spinner-border text-secondary laodingIcon" />
                        <span>...laoding</span>
                    </div>}
                </div>

                <button
                    id={styles.addCardBtn}
                    onClick={() => {
                        navigate("/create-card");
                    }}
                ><span>+</span></button>

                <div className={styles.allCardsContainer}>

                    {arrSearch?.length > 0 && arrSearch.map((card: CardInterface) => (
                        <div className={styles.card_container} key={card._id}>
                            <div className={styles.inline_container_card} onClick={() => navigate(`/card-info/${card._id}`)}>
                                <img className={styles.img_card} src={card.image.url} alt={card.image.alt} />

                                <div className={styles.inline_container_card}>
                                    <h1 className="main-title-card">{card.title}</h1>
                                    <h3 className="sub-title3">{card.subtitle}</h3>
                                </div>

                                <hr style={{ width: "100%" }}></hr>

                                <div className={styles.inline_container_card} style={{ paddingTop: "0" }}>
                                    <p><span className="span-subTitle">{card.phone} </span></p>
                                    <p><span className="span-subTitle">{card.address.country}, {card.address.city}, {card.address.street}</span></p>
                                    <p><span className="span-subTitle">{card.email}</span></p>
                                </div>

                            </div>

                            <div className={styles.iconsCardContainer}>
                                <a href={`tel:${card.phone}`}>
                                    <i className={`fa-solid fa-phone ${styles.iconsCards}`} />
                                </a>

                                <i className={`fa-solid fa-trash ${styles.iconsCards} trash`}
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
                                />

                                <i className={`fa-solid fa-pencil ${styles.iconsCards}`}

                                    onClick={() => {
                                        navigate(`/update-card/${card._id}`);
                                    }}
                                />

                                <LikeButton card={card} />

                            </div>
                        </div>
                    ))}

                </div>
            </div>


        )
    }
}

export default MyCards;