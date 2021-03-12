import {MainContainer, NotesHeaderOne, Note} from '@style/NotesStyled';
import {PageWrapper} from '@style/NotesStyled';
import global from 'global';
import withSession from '@lib/session';
import Menu from '@component/Menu';
import Header from '@component/Header';
import axios, {AxiosResponse} from "axios";
import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import PopupNewNote from '@component/PopupNewNote';
import PopupConfirmation from '@component/PopupConfirmation';
import Head from 'next/head';


const Notes = (props) => {
    const router = useRouter();
    const user: {} = props.user;
    const [notes, setNotes] = useState(null);
    const [showNewNotePopup, setShowNewNotePopup] = useState(false);
    const [showDeleteNoteConfirmationPopup, setShowDeleteNoteConfirmationPopup] = useState(false);
    const [showTrash, setShowTrash] = useState(false);
    const [selectedNotesId, setSelectedNotesId] = useState([]);
    const [error, setError] = useState('');

    // After render, fetch the user's notes
    useEffect(() => {
        fetchNotes().then(notes => {
            setAllNotesChecked(notes, false);
            setNotes(notes);
        });
    }, []);

    // After render or when selectedNotesId changes, show the trash icon or not
    useEffect(() => {
        setShowTrash(selectedNotesId.length > 0);
    }, [selectedNotesId]);

    // Fetch all notes from the user
    const fetchNotes = async () => {
        return axios.post(global.api.notes)
            .then((response: AxiosResponse) => {
                return response.data.notes;
            })
            .catch((error) => {
                setError(error.response.data.message);
                return [];
            });
    }

    // Set all notes to checked or not checked
    const setAllNotesChecked = (notes, isChecked) => {
        notes.forEach((note) => {
            note.isChecked = isChecked;
        })
    }

    // Create a new note
    const createNewNote = (name) => {
        return axios.post(global.api.createNote, {name: name, content: ''})
            .then((response: AxiosResponse) => {
                const newNoteId = response.data.id;
                router.push(global.paths.note + '/' + Buffer.from(newNoteId).toString('base64')
                    + '?editable=true');
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    // Delete all notes from selectedNotesId
    const deleteSelected = () => {
        selectedNotesId.forEach((noteId) => {
            axios.delete(global.api.note, {data: {id: noteId}})
                .then((response: AxiosResponse) => {
                    setSelectedNotesId([]);
                    fetchNotes().then(notes => {
                        setAllNotesChecked(notes, false);
                        setNotes(notes);
                        setShowDeleteNoteConfirmationPopup(false);
                        props.showNotification('Notes deleted');
                    });
                })
                .catch((error) => {
                    console.log(error.response);
                });
        })
    }

    // Add the id of the selected notes to selectedNotesId
    const onCheckBoxChange = (e, note) => {
        if (e.target.checked) {
            selectedNotesId.push(note.id);
            setSelectedNotesId(selectedNotesId.filter(id => id));
            note.isChecked = true;
        } else {
            setSelectedNotesId(selectedNotesId.filter(id => id !== note.id));
            note.isChecked = false;
        }
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
                <Head>
                    <title>My notes – {global.siteName}</title>
                </Head>
                <PageWrapper>
                    {showDeleteNoteConfirmationPopup &&
                    <PopupConfirmation message='Delete all selected notes?'
                                       customFunction={deleteSelected}
                                       setShowPopUp={setShowDeleteNoteConfirmationPopup}
                    />
                    }
                    {showNewNotePopup &&
                    <PopupNewNote
                        createNewNote={createNewNote}
                        setShowNewNotePopup={setShowNewNotePopup}
                    />
                    }
                    <NotesHeaderOne>
                        <div className='my-notes'>My notes</div>
                        <div className='notes-header-one-left'>
                            {showTrash &&
                            <div className='notes-trash' onClick={() => {
                                setShowDeleteNoteConfirmationPopup(true);
                            }}>
                                <i className='fas fa-trash'/>
                            </div>
                            }
                            <i onClick={() => setShowNewNotePopup(true)} className='fas fa-plus-circle new-note'/>
                        </div>
                    </NotesHeaderOne>
                    {error && <div className='notes-server-error'>{error}</div>}
                    {notes !== null && notes.map((note, index: number) => (
                        <Note key={index}>
                            <input
                                className='note-checkbox'
                                id={note.id}
                                type='checkbox'
                                checked={note.isChecked}
                                onChange={(e) => {
                                    onCheckBoxChange(e, note);
                                }}
                            />
                            <Link href={global.paths.note + '/' + Buffer.from(note.id).toString('base64')}>
                                <span className='note-name'>{note.name}</span>
                            </Link>
                        </Note>
                    ))}
                </PageWrapper>
            </MainContainer>
        </>
    )
}

export default Notes;

export const getServerSideProps = withSession(async ({req, res}) => {
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