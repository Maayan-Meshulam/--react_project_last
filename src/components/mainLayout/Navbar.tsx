import { FunctionComponent, useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import userConnectInfoContext, { userInfoConnectContextInterface } from "../../context/UserContext";
import { webModeContext, WebModeInterface } from "../../context/DarkLightMode";
import { successMesGenery } from "../utils/feedbackMessage";
import { importNameInStorage, saveNameInStorage } from "../../services/userServices";
import { searchContext, searchInterface } from "../../context/SearchContext";
import styles from '../../style/navbar_footer.module.css';

interface NavbarProps {

}


const Navbar: FunctionComponent<NavbarProps> = () => {

    //user base info => id, isbuisness, is admin
    const { userBaseInfo, setUserBaseInfo } = useContext<userInfoConnectContextInterface>(userConnectInfoContext);

    //search
    const { exppToSearch, setSearchExpp } = useContext<searchInterface>(searchContext);
    const [name, setName] = useState<string>('');
    console.log(exppToSearch + "  search word");

    //dark-light mode
    const { mode, setMode } = useContext<WebModeInterface>(webModeContext)
    console.log(mode);

    const navigate = useNavigate();

    const isConnect: boolean = Boolean(userBaseInfo); // if undefined=>false
    const isBusiness: boolean = userBaseInfo?.isBusiness ?? false
    const isAdmin: boolean = userBaseInfo?.isAdmin ?? false;

    console.log(isConnect + " connect");
    console.log(isBusiness + "is bussiness");
    console.log(isAdmin + " is admin");

    //בכל שינוי סטטו התחרות או יציאה נשנה בהתאם את השם
    useEffect(() => {
        setName(importNameInStorage())
    }, [userBaseInfo])

    //אלמנט שיוצג במסכים קטנים יותר
    const dropDownNav = <div id={styles.myLinks}>

        {<NavLink className={styles.navlink} to="/" style={{ fontFamily: '"Bebas Neue", serif', fontSize: "30px" }}>Cards</NavLink>}

        <NavLink className={styles.navlink} to="/about">ABOUT</NavLink>

        {isConnect && <NavLink className={styles.navlink} to="/fav-cards">FAV CARDS</NavLink>}

        {((isConnect && isBusiness) || (isConnect && isAdmin)) && <NavLink className="navlink" to="/my-cards">MY CARDS</NavLink>}
        {isConnect && isAdmin && <NavLink className={styles.navlink} to="/sandbox">SANDBOX</NavLink>}

        {isConnect ? <>
            <span
                id={styles.exit}
                onClick={() => {
                    setUserBaseInfo(undefined);
                    import('../../services/tokenServices').then(module => module.removeTokenFromStorage());
                    console.log(2);
                    localStorage.getItem("Gust") ? saveNameInStorage(true, "Gust") : saveNameInStorage(false, "Gust");
                    successMesGenery("user exit", `goodbay 
                             ${name}`);
                    navigate("/");
                }}>
                exit </span>
            <NavLink className={styles.navlink} to="/user-info">userInfo</NavLink>
        </> :
            <>
                <NavLink className={styles.navlink} to="/register">register</NavLink>
                <NavLink className={styles.navlink} to="/login">login</NavLink>
            </>
        }

    </div>

    {
        const myLinks =document.getElementById('myLinks');
        if (myLinks && getComputedStyle(myLinks).display != "none") {
            console.log(7);
            
            document.querySelectorAll('.navlink').forEach((link) => {
                console.log(9);
                
                link.addEventListener('click', () => {
                    console.log(3);
                    
                    myLinks.style.display = "none"
                })
            })
        }
    }


    return (<>

        <nav id={styles.navbarContainer}>

            {/* את זה יראו רק במסכים קטנים יותר */}
            <div id={styles.topNav}>

                <label id={styles.burgerNavIcon} htmlFor="burgerNavInput">&#9776;</label>
                <input type="checkbox" id={styles.burgerNavInput} />

                <div id="sideTopNav">

                    <span style={{ position: "relative" }}>
                        <i className={`fa-solid fa-magnifying-glass ${styles.searchIcon}`} />
                        <input type="text" className={styles.searchInputNav} onChange={(e) => {
                            setSearchExpp(e.target.value);
                        }} />
                    </span>

                    <span>
                        {mode == "light" ?
                            <i className="fa-solid fa-moon modeIcon"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    setMode()
                                }}
                            /> :
                            <i className="fa-solid fa-sun modeIcon"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    setMode()
                                }}
                            />}
                    </span>
                </div>

                {dropDownNav}

            </div>

            <div className={styles.inline_container_navbar}>

                <NavLink className={styles.navlink} to="/" style={{ fontFamily: '"Bebas Neue", serif', fontSize: "30px" }}>Cards</NavLink>
                <NavLink className={styles.navlink} to="/about">ABOUT</NavLink>

                {isConnect && <NavLink className={styles.navlink} to="/fav-cards">FAV CARDS</NavLink>}

                {((isConnect && isBusiness) || (isConnect && isAdmin)) && <NavLink className={styles.navlink} to="/my-cards">MY CARDS</NavLink>}
                {isConnect && isAdmin && <NavLink className={styles.navlink} to="/sandbox">SANDBOX</NavLink>}


            </div>

            <div className={styles.inline_container_navbar}>

                <span style={{ position: "relative" }}>
                    <i className={`fa-solid fa-magnifying-glass ${styles.searchIcon}`} />
                    <input type="text" className={styles.searchInputNav} onChange={(e) => {
                        setSearchExpp(e.target.value);
                    }} />
                </span>

                <span>
                    {mode == "light" ?
                        <i className="fa-solid fa-moon modeIcon"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                setMode()
                            }}
                        /> :
                        <i className="fa-solid fa-sun modeIcon"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                setMode()
                            }}
                        />}
                </span>

                {isConnect ? <>
                    <span
                        id={styles.exit}
                        onClick={() => {
                            setUserBaseInfo(undefined);
                            import('../../services/tokenServices').then(module => module.removeTokenFromStorage());
                            localStorage.getItem("userName") ? localStorage.removeItem("userName") :  sessionStorage.removeItem("userName") ;
                            successMesGenery("user exit", `נתראה בקרוב  
                             ${name}`);
                            navigate("/");
                        }}>
                        exit </span>
                    <NavLink className={styles.navlink} to="/user-info">userInfo</NavLink>
                </> :
                    <>
                        <NavLink className={styles.navlink} to="/register">register</NavLink>
                        <NavLink className={styles.navlink} to="/login">login</NavLink>
                    </>
                }
            </div>
        </nav>

        <p id={styles.nameNav}> שלום {name}</p>


    </>);
}

export default Navbar;