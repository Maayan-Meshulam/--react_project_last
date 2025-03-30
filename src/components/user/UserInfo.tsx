import { FunctionComponent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userConnectInfoContext from "../../context/UserContext";
import { getUserById } from "../../services/userServices";
import { UserInterface } from "../../interfaces/User";
import styles from '../../style/userInfo.module.css';
import { errorMesGenery } from "../utils/feedbackMessage";

interface UserInfoProps {

}

const UserInfo: FunctionComponent<UserInfoProps> = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const {id}  = useParams(); // במקרה שהמשתמש המחובר הוא מנהל ואז נעביר את המשתמש שהוא רוצה לצפות בו כפרמטר 

    const [user, setUser] = useState<UserInterface>();

    const { userBaseInfo } = useContext(userConnectInfoContext);
    let userId: string = userBaseInfo?._id as string

    useEffect(() => {
        if(userBaseInfo?.isAdmin)
            userId = id as string;
        getUserById(userId as string)
            .then(res => {
                setUser(res.data);
                setLoading(true)
            })
            .catch(err => {
                errorMesGenery("", err.response.data)
            })
    }, [userId])


    return (<>
        <div className="aboveAllContainerGeneral" style={{ backgroundColor: "#ebeb55", padding: "30px 20px" }}>

        {!loading && <div className="laodingContainer"><i className="spinner-border text-secondary laodingIcon" /><span>...laoding</span></div>}

            <h1 className="main-title">User info</h1>

            {user &&
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div id={styles.userInfoContainer} >

                        <div className={styles.inlineUserInfoConntainer} style={{ width: "70%" }}>
                            <p><span className={styles.miniTitleUserInfo}>name:</span> {user.name.first} {user.name.middle} {user.name.last} </p>
                            <p>
                                <span className={styles.miniTitleUserInfo}>address: </span>
                                {user.address.state} , {user.address.country} , 
                                {user.address.street} , {user.address.city} ,
                                {user.address.houseNumber} {user.address.zip}
                            </p>
                            <p> <span className={styles.miniTitleUserInfo}>phone:</span> {user.phone}</p>
                            <p><span className={styles.miniTitleUserInfo}>email:</span> {user.email}</p>
                        </div>

                        <img src={user.image.url} alt={user.image.alt} style={{ width: "30%" }} />
                    </div>

                    <button
                        className={styles.updateUserButton}
                        onClick={() => {
                            navigate(`/update-user/${userId}`)
                        }}>update details user
                    </button>

                </div>
            }

        </div>

    </>);
}

export default UserInfo;