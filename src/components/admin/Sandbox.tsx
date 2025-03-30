import { FunctionComponent, useContext, useEffect, useState } from "react";
import { deleteUser, getAllUsers } from "../../services/userServices";
import { UserInterface } from "../../interfaces/User";
import { useNavigate } from "react-router-dom";
import { DeltedUserMes, errorMesGenery, successMesGenery } from "../utils/feedbackMessage";
import { searchContext, searchInterface } from "../../context/SearchContext";
import styles from '../../style/admin.module.css';

interface SandboxProps {

}

const Sandbox: FunctionComponent<SandboxProps> = () => {


    const navigate = useNavigate();
    const [tableUsers, setTableUsers] = useState<UserInterface[]>([]);
    const { exppToSearch } = useContext<searchInterface>(searchContext);

    const [arrUsers, setArrUsers] = useState<UserInterface[]>([])
    const [arrUsersFlag, setArrUsersFlag] = useState<boolean>(false)



    useEffect(() => {
        getAllUsers()
            .then(res => {
                setArrUsers(res.data);
            })
            .catch((err) => {
                errorMesGenery(err.response.data, "refresh the page");
            })
    }, [arrUsersFlag])


    useEffect(() => {
        setTimeout(() => {
            const searchUsers = arrUsers.filter((user: UserInterface) => {
                const fullName = `${user.name.first} ${user.name.middle} ${user.name.last}`;
                return fullName.includes(exppToSearch);
            })

            setTableUsers(searchUsers);

        }, 2000);

    }, [exppToSearch, arrUsers])


    return (<>

        <div className="aboveAllContainerGeneral" style={{ width: "calc(100vw - 5%)" }}>

            <h1 className="main-title">sandbox</h1>


            {tableUsers.length < 1 && <div className="laodingContainer">
                <i className="spinner-border text-secondary laodingIcon" />
                <span>...laoding</span>
            </div>}

            <p className="infoP" style={{ textAlign: "left" }}><i className="fa-solid fa-circle-info" /> you can search user by his name</p>

            {tableUsers && tableUsers.length > 0 &&
                <div id={styles.scrollerContainerTable}>

                    <table id={styles.usersTable}>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th style={{ left: "0", zIndex: "20" }}>full name</th>
                                <th>email</th>
                                <th>phone</th>
                                <th>state</th>
                                <th>country</th>
                                <th>city</th>
                                <th>street</th>
                                <th>house number</th>
                                <th>zip</th>
                                <th>is isBusiness</th>
                                <th>is admin</th>
                                <th>info</th>
                                <th>edit</th>
                                <th>delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableUsers.length > 0 && tableUsers.map((user: UserInterface) => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td className={styles.freezCol} style={{ left: "0" }}>{user.name.first} {user.name.middle} {user.name.last}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.address.state}</td>
                                    <td>{user.address.country}</td>
                                    <td>{user.address.city}</td>
                                    <td>{user.address.street}</td>
                                    <td>{user.address.houseNumber}</td>
                                    <td>{user.address.zip}</td>
                                    <td>{String(user.isBusiness)}</td>
                                    <td>{String(user.isAdmin)}</td>
                                    <td>
                                        <i
                                            className={`fa-solid fa-eye ${styles.iconsCards}`}
                                            onClick={() => {
                                                navigate(`/user-info/${user._id}`)
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <i
                                            className={`fa-solid fa-pencil ${styles.iconsCards}`}
                                            onClick={() => {
                                                navigate(`/update-user/${user._id}`)
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <i
                                            className={`fa-solid fa-trash ${styles.iconsCards} ${user.isAdmin ? "fa-trashDisable" : "trash"}`}
                                            onClick={() => {
                                                !user.isAdmin &&
                                                    DeltedUserMes(user)
                                                        .then(res => {
                                                            if (res.isConfirmed)
                                                                deleteUser(user._id as string)
                                                                    .then(() => {
                                                                        setArrUsersFlag(!arrUsersFlag);
                                                                        successMesGenery("", "user deleted succfully");
                                                                    })
                                                                    .catch(err => {
                                                                        errorMesGenery(err.response.data, '');
                                                                    })
                                                        })
                                            }}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            }
        </div>


    </>);
}

export default Sandbox;