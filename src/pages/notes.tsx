import {Main, PageWrapper, NotesHeaderOne, NotesHeaderTwo, MyNote} from '@style/NotesStyled';
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
import Pagination from '@component/Pagination';


const Notes = (props) => {
    const router: NextRouter = useRouter();
    const [notesInView, setNotesInView] = useState<NoteInterface[]>([]);
    const [checkedNotesId, setCheckedNotesId] = useState<string[]>([]);
    const [showNewNotePopup, setShowNewNotePopup] = useState<boolean>(false);
    const [showConfirmationPopUp, setShowConfirmationPopUp] = useState<boolean>(false);
    const [showTrash, setShowTrash] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const paginationLimit: number = 5;

    // Fetch the user notes
    useEffect(() => {
        fetchNotes()
            .then((response: AxiosResponse) => {
                setNotesInView(response.data.notes);
                calculateTotalPages();
            })
            .catch(error => {
                setError(error.response.data.message);
            });
    }, [currentPage]);

    // On selectedNotesId change
    useEffect(() => {
        // Show the trash icon or not
        if (checkedNotesId.length > 0) {
            setShowTrash(true);
        } else {
            setShowTrash(false);
        }
    }, [checkedNotesId]);

    // Calculate total pages to be shown
    const calculateTotalPages = () => {
        axios.get(global.api.notesCount)
            .then((response: AxiosResponse) => {
                const amount: number = response.data.amount;
                const totalPages: number = amount / paginationLimit;
                setTotalPages(Math.ceil(totalPages));
            })
            .catch(error => {
                setTotalPages(1);
            });
    }

    // Create a new note
    const createNewNote = (name: string) => {
        return axios.post(global.api.note, {name: name, content: ''})
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
    const deleteSelectedNotes = () => {
        return axios.delete(global.api.note, {data: {noteIds: checkedNotesId}})
            .then((response: AxiosResponse) => {
                props.showNotification(response.data.message);
                fetchNotes()
                    .then((response: AxiosResponse) => {
                        calculateTotalPages();

                        // Go to previous page
                        if (checkedNotesId.length == notesInView.length && currentPage > 1) {
                            setCurrentPage(prevCurrentPage => prevCurrentPage - 1);
                        }

                        setNotesInView(response.data.notes);
                        setShowConfirmationPopUp(false);
                        setCheckedNotesId([]);
                    })
                    .catch(error => {
                        setError(error.response.data.message);
                    });
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    // Fetch notes from the user
    const fetchNotes = () => {
        return axios.get(global.api.notes + `?page=${currentPage}&limit=${paginationLimit}`);
    }

    // Add the ids of the selected notes to selectedNotesId
    const onNoteCheckBoxChange = (e, note: NoteInterface) => {
        if (e.target.checked) {
            note.isChecked = true;
            checkedNotesId.push(note.id);
            setCheckedNotesId(checkedNotesId.filter(id => id));
        } else {
            setCheckedNotesId(checkedNotesId.filter(id => id !== note.id));
            note.isChecked = false;
        }
    }

    // Toggle all notes check
    const toggleAllNotesCheck = () => {
        if (checkedNotesId.length < 1) {
            checkAllNotes(notesInView, true);
            setCheckedNotesId(() => {
                const selectedNotesId = [];
                notesInView.forEach(note => {
                    selectedNotesId.push(note.id);
                });
                return selectedNotesId;
            });
        } else {
            checkAllNotes(notesInView, false);
            setCheckedNotesId([]);
        }
    }

    // Uncheck or check notes
    const checkAllNotes = (notes: NoteInterface[], isChecked: boolean) => {
        notes.forEach((note) => {
            note.isChecked = isChecked;
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
            <Main>
                <Head>
                    <title>My notes – {global.siteName}</title>
                </Head>
                <PageWrapper>

                    {/* Confirmation popup */}
                    {showConfirmationPopUp &&
                    <PopupConfirmation message='Delete all selected notes?'
                                       customFunction={deleteSelectedNotes}
                                       setShowConfirmationPopUp={setShowConfirmationPopUp}
                    />
                    }

                    {/* New note popup */}
                    {showNewNotePopup &&
                    <PopupNewNote createNewNote={createNewNote} setShowNewNotePopup={setShowNewNotePopup}/>
                    }

                    {/* Header One */}
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
                            <div className='new-note' onClick={() => setShowNewNotePopup(true)}>
                                <i className='fas fa-plus-circle'/>
                            </div>
                        </div>
                    </NotesHeaderOne>

                    {/* Header Two */}
                    <NotesHeaderTwo>
                        {notesInView.length > 0 &&
                        <>
                            <input
                                className='notes-checkbox'
                                id='notes-checkbox'
                                type='checkbox'
                                checked={checkedNotesId.length === notesInView.length}
                                onChange={toggleAllNotesCheck}
                            />
                            <span className='notes-name'>Name</span>
                        </>
                        }
                    </NotesHeaderTwo>

                    {error && <div className='notes-server-error'>{error}</div>}

                    {/* Notes */}
                    {notesInView ? notesInView.map((note, index: number) => (
                        <MyNote key={index}>
                            <input
                                className='note-checkbox'
                                id={note.id}
                                type='checkbox'
                                checked={note.isChecked}
                                onChange={(e) => {
                                    onNoteCheckBoxChange(e, note);
                                }}
                            />
                            <Link href={global.paths.note + '/' + Buffer.from(note.id).toString('base64')}>
                                <span className='note-name'>{note.name}</span>
                            </Link>
                        </MyNote>
                    )) : <div className='loading'>Loading....</div>
                    }

                    {/* Pagination */}
                    {notesInView && <Pagination
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={totalPages}/>
                    }

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