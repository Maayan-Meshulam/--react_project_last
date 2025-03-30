import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

interface ErrorPageProps {

}

const ErrorPage: FunctionComponent<ErrorPageProps> = () => {


    const styleDivBtnContainer : any = {
        textAlign:"center"
    }

    const btn = {
        backgroundColor: "#3c0157",
        color: "white",
        border: "none",
        padding: "15px 20px",
        fontSize: "14px",
        fontWeight: "bold",
        borderRadius: "10px",
        transition: "0.5s",
        cursor: "pointer",
        margin:"10px"
    }


    const navigate = useNavigate();

    return (<>
        <div style={styleDivBtnContainer}>
            <h1 className="main-title" style={{ color: "red", fontWeight: "bold" }}>PAGE NOT FOUND</h1>
            <div>
                <button
                    style={btn}
                    onClick={() => {
                        navigate('/');
                    }}
                >לדף הבית
                </button>
                <button
                    onClick={() => {
                        navigate(-1);
                    }}
                    style={btn} > אחורה
                </button>
            </div>
        </div>
    </>);
}

export default ErrorPage;