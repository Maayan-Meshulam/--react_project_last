import { FunctionComponent, useContext, useEffect, useState } from "react";
import { getAllCards, removeCard } from "../../services/cardservices";
import { useNavigate } from "react-router-dom";
import userConnectInfoContext from "../../context/UserContext";
import { CardInterface } from "../../interfaces/Card";
import { DeltedCardMes, errorMesGenery, successMesGenery } from "../utils/feedbackMessage";
import LikeButton from "./LikeButton";
import { searchContext, searchInterface } from "../../context/SearchContext";
import ErrorPage from "../mainLayout/ErrorPage";
import styles from '../../style/cards.module.css';

interface FavCardsProps {

}

const FavCards: FunctionComponent<FavCardsProps> = () => {

    //user base info
    const { userBaseInfo } = useContext(userConnectInfoContext);
    console.log(userBaseInfo);

    if (!userBaseInfo) {
        console.log(89898989);
        return <ErrorPage />
    }
    else {

        const isAdmin = userBaseInfo?.isAdmin ?? false;

        let userId = userBaseInfo?._id as string;
        console.log(userId);

        const navigate = useNavigate();
        const [loading, setLoading] = useState(false);

        //search
        const { exppToSearch } = useContext<searchInterface>(searchContext);

        const [arrSearch, setArrSearch] = useState<CardInterface[]>([]);



        const [flagRemoveCard, setFlagRemoveCard] = useState<boolean>(false);
        const [arrCards, setArrCards] = useState<CardInterface[]>([]);
        const [favCards, setFavCards] = useState<CardInterface[]>([]);

        const toggleRemoveLike = (cardId: string) => {
            setFavCards(prev => prev.filter((card: CardInterface) => card._id != cardId))
        }

        //נייבא את כל הקלפים => בעת מחיקת 
        useEffect(() => {
            getAllCards()
                .then(res => {
                    setArrCards(res.data);
                    setLoading(true);
                })
                .catch(err => {
                    console.log(err);
                    errorMesGenery("", err.response.data);
                })
        }, [flagRemoveCard])

        //נאתחל את מערך הלייקים
        useEffect(() => {
            console.log(arrCards.length + " 222");
            if (arrCards && arrCards.length == 0) return;
            console.log(userId);
            setFavCards(arrCards.filter((card: CardInterface) => card.likes?.includes(userId)));
            console.log(arrCards);
        }, [arrCards, userBaseInfo])


        //זמני - למחוק
        useEffect(() => {
            console.log(favCards);
            const searchArr = favCards.filter((card: CardInterface) => {
                return card.title.includes(exppToSearch);
            })
            setArrSearch(searchArr);
        }, [favCards, exppToSearch])



        return (<>
            <div className="aboveAllContainerGeneral">

                <h1 className="main-title">Fav cards</h1>

                <div className="laodingContainer">
                    {arrSearch.length == 0 && <p>you dont have favorites cards</p>}
                    {!loading && <div>
                        <i className="spinner-border text-secondary laodingIcon" />
                        <span>...laoding</span>
                    </div>}
                </div>


                <div className={styles.allCardsContainer}>



                    {arrSearch.length > 0 && arrSearch.map((card: CardInterface) => (
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
                                <a href={`tel:${card.phone}`}><i className={`fa-solid fa-phone ${styles.iconsCards}`} /></a>

                                {/* רק אם הכרטיס זה כרטיס שהמשתמש המחובר יצר הוא יוכל למחוק או מנהל */}
                                {(card.user_id?.includes(userBaseInfo?._id as string) || isAdmin) &&
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
                                    />}

                                {(card.user_id?.includes(userBaseInfo?._id as string) || isAdmin) &&
                                    <i className={`fa-solid fa-pencil ${styles.iconsCards}`}

                                        onClick={() => {
                                            navigate(`/update-card/${card._id}`);
                                        }}
                                    />
                                }

                                <LikeButton card={card} removeLikeFuc={toggleRemoveLike} />
                            </div>
                        </div>


                    ))}
                </div>

            </div>

        </>);
    }
}

export default FavCards;