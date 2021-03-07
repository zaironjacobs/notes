import {MainContainer, NotesHeaderOne, Note} from '@style/NotesStyled';
import global from 'global';
import withSession from '@lib/session';
import Menu from '@component/Menu';
import Header from '@component/Header';
import axios, {AxiosResponse} from "axios";
import {useState, useEffect} from 'react';
import Link from 'next/link';


const Notes = (props) => {
    const user = props.user;
    const [notes, setNotes] = useState(null);

    // Fetch notes
    useEffect(() => {
        const fetchNotes = async () => {
            return axios.post(global.api.notes)
                .then(function (response: AxiosResponse) {
                    return response.data.notes;
                })
                .catch(function (error) {
                    console.log(error.response);
                    return [];
                });
        }
        fetchNotes().then(notes => setNotes(notes));
    }, []);

    const goToNote = (noteId) => {

    }

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

                <NotesHeaderOne>
                    <div className='my-notes'>My notes</div>
                </NotesHeaderOne>

                {notes !== null && notes.map((note, index: number) => (
                    <Link href={global.paths.note + '/' + encodeURIComponent(note.id)} key={index}>
                        <Note>
                            <input className='note-checkbox' type='checkbox'/>
                            <div className='note'>{note.name}</div>
                        </Note>
                    </Link>
                ))}


            </MainContainer>
        </>
    )
}

export default Notes;

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

    // Else return the user object and notes
    return {props: {user}};
});