import { FunctionComponent } from "react";

interface AboutProps {

}

const About: FunctionComponent<AboutProps> = () => {

    return (<>
        <div className="aboveAllContainerGeneral" style={{textAlign:"center", padding:" 0 50px"}}>

            <h1 className="main-title">About</h1>
            <div id="aboutContainer">
                <div>
                    Welcome to your business card interface!

                    We are here to give you a convenient and innovative way to browse, create and manage business cards in an easy and accessible way. Whether you are looking for professional services or a business owner looking to expand your business credentials – we are the platform for you.
                </div>

                <br />
                <div>
                    
                    What do we offer?
                    🔹 Browse business cards – Discover a variety of businesses in different fields and connect directly with business owners.
                    🔹 Create a personal business card – If you are registered as a business user, you can add your own card and expose your business to a wide audience.
                    🔹 Likes and Shares – You can save favorite businesses and quickly contact them, even without registering.

                    Join us today and make your business connections easier than ever!
                </div>
            </div>
        </div>

    </>);
}

export default About;