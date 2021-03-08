import {MainContainer, NotesHeaderOne, NotesHeaderTwo, Note} from '@style/NotesStyled';
import global from 'global';
import withSession from '@lib/session';
import Menu from '@component/Menu';
import Header from '@component/Header';
import axios, {AxiosResponse} from "axios";
import {useState, useEffect} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import PopupNewNote from '@component/PopupNewNote';
import PopupConfirmation from "@component/PopupConfirmation";


const Notes = (props) => {
    const router = useRouter();
    const user: {} = props.user;
    const [notes, setNotes] = useState(null);
    const [showNewNotePopup, setShowNewNotePopup] = useState(false);
    const [showDeleteNoteConfirmationPopup, setShowDeleteNoteConfirmationPopup] = useState(false);
    const [showTrash, setShowTrash] = useState(false);
    const [selectedNotesId, setSelectedNotesId] = useState([]);

    // Fetch all notes from the user
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

    // Create a new note
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

    // Delete all notes from selectedNotesId
    const deleteSelected = () => {
        selectedNotesId.forEach((noteId) => {
            axios.delete(global.api.note, {data: {id: noteId}})
                .then(function (response: AxiosResponse) {
                    // Delete the note from notes
                })
                .catch(function (error) {
                    console.log(error.response);
                });
        })
    }

    // Add the id of the selected notes to selectedNotesId
    const onCheckBoxChange = (e, noteId) => {
        if (e.target.checked) {
            selectedNotesId.push(noteId);
            setSelectedNotesId(selectedNotesId.filter(id => id));
        } else {
            setSelectedNotesId(selectedNotesId.filter(id => id !== noteId));
        }
    }

    useEffect(() => {
        setShowTrash(selectedNotesId.length > 0);
    }, [selectedNotesId]);

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
                {showDeleteNoteConfirmationPopup &&
                <PopupConfirmation message='Delete all selected notes?'
                                   customFunction={deleteSelected}
                                   setShowPopUp={setShowDeleteNoteConfirmationPopup}
                />
                }
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
                <NotesHeaderTwo>
                    {showTrash &&
                    <div className='notes-trash' onClick={() => {
                        setShowDeleteNoteConfirmationPopup(true);
                    }}>
                        <i className='fas fa-trash'/>
                    </div>
                    }
                </NotesHeaderTwo>
                {notes !== null && notes.map((note, index: number) => (
                    <Note key={index}>
                        <input
                            className='note-checkbox'
                            id={note.id}
                            type='checkbox'
                            onChange={(e) => {
                                onCheckBoxChange(e, note.id);
                            }}
                        />
                        <Link href={global.paths.note + '/' + Buffer.from(note.id).toString('base64')}>
                            <label className='note-name' htmlFor={note.id}>{note.name}</label>
                        </Link>
                    </Note>

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
    }
);