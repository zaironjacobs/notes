import {Main, PageWrapper, NotesHeaderOne, MyNote} from '@style/NotesStyled';
import global from 'global';
import withSession from '@lib/session';
import Menu from '@component/Menu';
import Header from '@component/Header';
import axios, {AxiosResponse} from 'axios';
import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import {NextRouter, useRouter} from 'next/router';
import PopupNewNote from '@component/PopupNewNote';
import PopupConfirmation from '@component/PopupConfirmation';
import Head from 'next/head';
import Footer from '@component/Footer';
import UserInterface from '@interface/User';
import NoteInterface from '@interface/Note';


const Notes = (props) => {
    const router: NextRouter = useRouter();
    const [notes, setNotes] = useState<NoteInterface[]>(null);
    const [showNewNotePopup, setShowNewNotePopup] = useState<boolean>(false);
    const [showConfirmationPopUp, setShowConfirmationPopUp] = useState<boolean>(false);
    const [showTrash, setShowTrash] = useState<boolean>(false);
    const [selectedNotesId, setSelectedNotesId] = useState<string[]>([]);
    const [error, setError] = useState<string>('');

    // After render, fetch the user's notes
    useEffect(() => {
        fetchNotes()
            .then((notes: NoteInterface[]) => {
                setAllNotesChecked(notes, false);
                setNotes(notes);
            })
            .catch(error => {
                setError(error.response.data.message);
            });
    }, []);

    // After render or when selectedNotesId changes, show the trash icon or not
    useEffect(() => {
        setShowTrash(selectedNotesId.length > 0);
    }, [selectedNotesId]);

    // Fetch all notes from the user
    const fetchNotes = async () => {
        return axios.get(global.api.notes)
            .then((response: AxiosResponse) => {
                return response.data.notes;
            })
            .catch(error => {
                return error;
            });
    }

    // Set all notes to checked or not checked
    const setAllNotesChecked = (notes: NoteInterface[], isChecked: boolean) => {
        notes.forEach((note) => {
            note.isChecked = isChecked;
        })
    }

    // Create a new note
    const createNewNote = (name: string) => {
        return axios.post(global.api.createNote, {name: name, content: ''})
            .then((response: AxiosResponse) => {
                const newNoteId = response.data.id;
                router.push(global.paths.note + '/' + Buffer.from(newNoteId).toString('base64')
                    + '?editable=true');
            })
            .catch(error => {
                return Promise.reject(error);
            });
    }

    // Delete all notes from selectedNotesId
    const deleteSelected = () => {
        return axios.delete(global.api.note, {data: {noteIds: selectedNotesId}})
            .then((response: AxiosResponse) => {
                setSelectedNotesId([]);
                fetchNotes()
                    .then(notes => {
                        setAllNotesChecked(notes, false);
                        setNotes(notes);
                        setShowConfirmationPopUp(false);
                        props.showNotification(response.data.message);
                    })
                    .catch(error => {
                        setError(error.response.data.message);
                    });
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    // Add the id of the selected notes to selectedNotesId
    const onCheckBoxChange = (e, note: NoteInterface) => {
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
            <Main>
                <Head>
                    <title>My notes – {global.siteName}</title>
                </Head>
                <PageWrapper>
                    {showConfirmationPopUp &&
                    <PopupConfirmation message='Delete all selected notes?'
                                       customFunction={deleteSelected}
                                       setShowConfirmationPopUp={setShowConfirmationPopUp}
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
                                setShowConfirmationPopUp(true);
                            }}>
                                <i className='fas fa-trash'/>
                            </div>
                            }
                            <div className='new-note'>
                                <i onClick={() => setShowNewNotePopup(true)}
                                   className='fas fa-plus-circle'/>
                            </div>
                        </div>
                    </NotesHeaderOne>
                    {error && <div className='notes-server-error'>{error}</div>}
                    {notes ? notes.map((note, index: number) => (
                        <MyNote key={index}>
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
                        </MyNote>
                    )) : <div className='loading'>Loading....</div>}
                </PageWrapper>
            </Main>

            {/* Footer */}
            <Footer/>
        </>
    )
}

export default Notes;

export const getServerSideProps = withSession(async ({req, res}) => {
        // If user does not exist, redirect to login
        const user: UserInterface = req.session.get('user');
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