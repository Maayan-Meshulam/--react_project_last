import { FunctionComponent, useContext, useEffect, useState } from "react";
import { searchContext, searchInterface } from "../context/SearchContext";
import { CardInterface } from "../interfaces/Card";
import { useNavigate } from "react-router-dom";
import userConnectInfoContext from "../context/UserContext";
import { getAllCards, removeCard } from "../services/cardservices";
import styles from '../style/cards.module.css';
import { DeltedCardMes, errorMesGenery, successMesGenery } from "./utils/feedbackMessage";
import LikeButton from "./card/LikeButton";


interface HomeProps {
}

const Home: FunctionComponent<HomeProps> = () => {

    //get search word
    const { exppToSearch } = useContext<searchInterface>(searchContext);
    const [arrSearch, setArrSearch] = useState<CardInterface[]>([]);


    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);

    const [flagRemoveCard, setFlagRemoveCard] = useState<boolean>(false);

    const [arrCards, setArrCards] = useState<CardInterface[]>([]);

    const { userBaseInfo } = useContext(userConnectInfoContext);
    const isconnect = Boolean(userBaseInfo);
    const isAdmin = userBaseInfo?.isAdmin ?? false;



    //בטעינה הראשונית נקרא לכל הקלפים
    useEffect(() => {
        getAllCards()
            .then(res => {
                setArrCards(res.data);
                setLoading(true);
            })
            .catch(err => {
                import("./utils/feedbackMessage").then(module => module.errorMesGenery("", err.message));
            })
    }, [flagRemoveCard, userBaseInfo])

    useEffect(() => {
        const searchArr = arrCards.filter((card: CardInterface) => card.title.includes(exppToSearch));
        setArrSearch(searchArr);
    }, [arrCards, exppToSearch])


    return (<>

        <div className="aboveAllContainerGeneral">
            <h1 className="main-title">Card Pages</h1>

            <div className="laodingContainer">
                {!loading && <div>
                    <i className="spinner-border text-secondary laodingIcon" />
                    <span>...laoding</span>
                </div>}
                {arrSearch.length == 0 && <p>none cards</p>}
            </div>

            <div className={styles.allCardsContainer}>

                {arrSearch?.length > 0 && arrSearch.map(card => (
                    <div className={styles.card_container} key={card._id}>
                        <div className={styles.inline_container_card} onClick={() => navigate(`/card-info/${card._id}`)}>
                            <img loading="lazy" className={styles.img_card} src={card.image.url} alt={card.image.alt} />

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
                            
                            {isconnect && (card.user_id?.includes(userBaseInfo?._id as string) || isAdmin) &&
                                <i className={`fa-solid fa-trash  ${styles.iconsCards} trash`}
                                    onClick={() => {
                                        DeltedCardMes().then(res => {
                                            if (res.isConfirmed) {
                                                removeCard(card._id as string)
                                                    .then(() => {
                                                        successMesGenery("", "card delted succfully");
                                                        setFlagRemoveCard(!flagRemoveCard); // נגרום למשיכה מחדש של כל הקלפים
                                                    })
                                                    .catch(err => {
                                                        errorMesGenery("", err.response.data);
                                                    })
                                            }
                                        })

                                    }}
                                />}

                            {isconnect && (card.user_id?.includes(userBaseInfo?._id as string) || isAdmin) &&
                                <i className={`fa-solid fa-pencil ${styles.iconsCards} `}

                                    onClick={() => {
                                        navigate(`/update-card/${card._id}`);
                                    }}
                                />
                            }


                            {isconnect && <LikeButton card={card} />}

                        </div>
                    </div>
                ))}

            </div>
        </div>


    </>);
}

export default Home;