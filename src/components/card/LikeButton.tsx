import { FunctionComponent, useContext, useState } from "react";
import { CardInterface } from "../../interfaces/Card";
import userConnectInfoContext from "../../context/UserContext";
import { updateLikes } from "../../services/cardservices";
import { errorMesGenery } from "../utils/feedbackMessage";

interface LikeButtonProps {
    card: CardInterface,
    removeLikeFuc?: (cardId: string) => void;
}

const LikeButton: FunctionComponent<LikeButtonProps> = ({ card, removeLikeFuc }: LikeButtonProps) => {

    const { userBaseInfo } = useContext(userConnectInfoContext);
    const id: any = userBaseInfo?._id;
    const [isLike, setIsLike] = useState<boolean | undefined>(card.likes?.includes(id))

    function toggleLikes() {

        updateLikes(card._id as string)
            .then(() => {
                setIsLike(!isLike);
                if (removeLikeFuc && isLike) removeLikeFuc(card._id as string); // אם הפוקנציה הזו קיימת אז נשתמש בז=ה =>נבדוק לייתר ביטחון גם את הלייק
            })
            .catch(err => {
                console.log(err);
                errorMesGenery("", err.response.err);
            })

    }

    return (<i
    style={{cursor:"pointer"}}
        className={`fa-regular fa-heart iconsCards ${isLike ? `FullHeartIcon` : ""}`}
        onClick={() => {
            toggleLikes();
        }}>
    </i>);
}

export default LikeButton;