import {MainContainer, NotesHeaderOne, Note} from '@style/NotesStyled';
import global from 'global';
import withSession from '@lib/session';
import Menu from '@component/Menu';
import Header from '@component/Header';
import axios, {AxiosResponse} from "axios";
import {useState, useEffect, useRef} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import PopupNewNote from '@component/PopupNewNote';


const Notes = (props) => {
    const router = useRouter();
    const user = props.user;
    const [notes, setNotes] = useState(null);
    const [showNewNotePopup, setShowNewNotePopup] = useState(false);

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

    const newNote = (name) => {
        return axios.post(global.api.createNote, {name: name, content: ''})
            .then(function (response: AxiosResponse) {
                const newNoteId = response.data.id;
                router.push(global.paths.note + '/' + Buffer.from(newNoteId).toString('base64')
                    + '?editable=true');
            })
            .catch(function (error) {
                console.log(error.response);
                return [];
            });
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
                {showNewNotePopup &&
                <PopupNewNote
                    createNewNote={newNote}
                    setShowNotePopup={setShowNewNotePopup}
                />
                }
                <NotesHeaderOne>
                    <div className='my-notes'>My notes</div>
                    <span onClick={() => setShowNewNotePopup(true)}><i className='fas fa-plus-circle new-note'/></span>
                </NotesHeaderOne>
                {notes !== null && notes.map((note, index: number) => (
                    <Note key={index}>
                        <input className='note-checkbox' type='checkbox'/>
                        <Link href={global.paths.note + '/' + Buffer.from(note.id).toString('base64')}>
                            <div className='note-name'>{note.name}</div>
                        </Link>
                    </Note>

                ))}
            </MainContainer>
        </>
    )
}

export default Notes;

export const getServerSideProps = withSession(async function (
    {
        req, res
    }
    ) {
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
    }
);