import {MainContainer} from '@style/HomeStyled';
import global from 'global';
import withSession from '@lib/session';
import Menu from '@component/Menu';
import Header from '@component/Header';


const Home = (props) => {
    const user = props.user;

    return (
        <>
            {/* Menu */}
            <div ref={props.menuNode}>
                <Menu menuOpen={props.menuOpen} setMenuOpen={props.setMenuOpen} user={props.user}/>
            </div>

            {/* Header */}
            <Header menuOpen={props.menuOpen} setMenuOpen={props.setMenuOpen}/>

            {/* Main */}
            <MainContainer>
                First Name: {user.firstName}
                Last Name: {user.lastName}
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