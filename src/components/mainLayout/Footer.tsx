import { FunctionComponent, useContext } from "react";
import userConnectInfoContext from "../../context/UserContext";
import { Link } from "react-router-dom";
import styles from '../../style/navbar_footer.module.css'

interface FooterProps {
    
}
 
const Footer: FunctionComponent<FooterProps> = () => {

    const {userBaseInfo} = useContext(userConnectInfoContext);

    const isConnect = Boolean(userBaseInfo);
    const isBusiness = userBaseInfo?.isBusiness ?? false
    const isAdmin = userBaseInfo?.isAdmin ?? false

    return ( <>

        <div id={styles.footerContainer}>

            <div className={styles.inline_container_footer}>
                <span>Develope by: Maayan Meshulam</span>
            </div>

            <div className={styles.inline_container_footer}>

                <Link to="/about" className={styles.footLink}>
                    <i className="fa-solid fa-circle-info" title="about"  style={{color:"yellow"}}/>
                    <p>About</p>
                </Link>

                {isConnect && 
                    <Link to="/fav-cards" className={styles.footLink}>
                        <i className="fa-solid fa-heart" title="fav cards"  style={{color:"red"}}/>
                        <p>Fav</p>
                    </Link>
                }
                    
                {(isBusiness || isAdmin) &&
                    <Link to="/my-cards" className={styles.footLink}>
                        <i className="fa-solid fa-address-card" title="my cards"  style={{color:"orange"}}/>
                        <p>My cards</p>
                    </Link>
                }

                <a href="https://wa.me/0548002752?text= Hi, how can i help you ?" target="blank" className={styles.footLink}>
                    <i className="fa-brands fa-whatsapp" title="054-8002752" style={{color:"green"}}/>
                    <p>wathapp</p>
                </a>

                <a href="mailto:maayanmesh@gmail.com" className={styles.footLink}>
                    <i className="fa-regular fa-envelope" title="maayanmesh@gmail.com" style={{color:"blue"}}/>
                    <p>email</p>
                </a>

            </div>
        </div>
        
    </> );
}
 
export default Footer;