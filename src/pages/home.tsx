import {MainContainer} from '@style/HomeStyled';
import global from 'global';
import withSession from '@lib/session';
import {useContext, useEffect} from "react";
import IsLoggedInContext from "@component/IsLoggedInContext";


const Home = (props) => {
    const {isLoggedIn, setIsLoggedIn} = useContext(IsLoggedInContext);
    useEffect(() => {
            if (props.user.isLoggedIn) {
                setIsLoggedIn(true);
            }
        }, [],
    );


    return (
        <>
            <MainContainer>
                {props.user.id}
            </MainContainer>
        </>
    )
}

export default Home;

export const getServerSideProps = withSession(async function ({req, res}) {
    // If user does not exist, redirect to login
    const user = req.session.get('user');
    if (!user) {
        return {
            redirect: {
                destination: global.paths.login,
                permanent: false,
            },
        }
    }

    // Else return the user object
    return {props: {user}};
});