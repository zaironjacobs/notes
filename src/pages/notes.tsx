import {Main, PageWrapper, NotesHeaderOne, NotesHeaderTwo, MyNote} from '@style/NotesStyled';
import global from 'global';
import withSession from '@lib/session';
import Menu from '@component/Menu';
import Header from '@component/Header';
import axios, {AxiosResponse} from 'axios';
import React, {useState, useEffect, useRef} from 'react';
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
    const page: string | string[] = router.query.page;
    const [notesInView, setNotesInView] = useState<NoteInterface[]>([]);
    const [checkedNotesId, setCheckedNotesId] = useState<string[]>([]);
    const [showNewNotePopup, setShowNewNotePopup] = useState<boolean>(false);
    const [showConfirmationPopup, setShowConfirmationPopup] = useState<boolean>(false);
    const [showTrash, setShowTrash] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [didMount, setDidMount] = useState(false)
    const paginationLimit: number = 5;

    // Set didMount to true upon mounting
    useEffect(() => {
        setDidMount(true);
    }, []);

    // Set the current page
    useEffect(() => {
        fetchNotesAmountPromise()
            .then((response: AxiosResponse) => {
                const newCurrentPage = Number(page);
                if (!isNaN(Number(page))) {
                    if (newCurrentPage > 0 && newCurrentPage <= calculateTotalPages(response.data.amount)) {
                        setCurrentPage(newCurrentPage);
                        return;
                    }
                }
                setCurrentPage(1);
            })
            .catch((error: any) => {
                setCurrentPage(1);
            });
    }, []);

    // Fetch the user notes when the current page changes (only after mounting)
    useEffect(() => {
        // Skip initial render
        if (!didMount) return;

        fetchNotesPromise()
            .then((response: AxiosResponse) => {
                setNotesInView(response.data.notes);
                fetchNotesCountAndSetTotalPages();
            })
            .catch((error: any) => {
                setError(error.response.data.message);
            });
    }, [currentPage]);

    // On checkedNotesId change, show or hide the trash icon
    useEffect(() => {
        // Skip initial render
        if (!didMount) return;

        if (checkedNotesId.length > 0) {
            setShowTrash(true);
        } else {
            setShowTrash(false);
        }
    }, [checkedNotesId]);

    // Set total pages to be shown
    const fetchNotesCountAndSetTotalPages = () => {
        fetchNotesAmountPromise()
            .then((response: AxiosResponse) => {
                setTotalPages(calculateTotalPages(response.data.amount));
            })
            .catch((error: any) => {
                setTotalPages(1);
            });
    }

    // Calculate the total pages
    const calculateTotalPages = (notesAmount) => {
        return Math.ceil(notesAmount / paginationLimit);
    }

    // Create a new note
    const createNewNote = async (name: string) => {

        let newTotalPages: number;
        fetchNotesAmountPromise()
            .then(response => {
                newTotalPages = calculateTotalPages(response.data.amount + 1);
            }).catch((error: any) => {
            newTotalPages = totalPages;
        });

        return createNotePromise(name)
            .then((response: AxiosResponse) => {
                const newNoteId = response.data.id;
                router.push(`${global.paths.note}/${Buffer.from(newNoteId).toString('base64')}?previous=${newTotalPages}&editable=true`);
            })
            .catch((error: any) => {
                return Promise.reject(error);
            });
    }

    // Delete all notes from selectedNotesId
    const deleteSelectedNotes = () => {
        return deleteNotesPromise()
            .then((response: AxiosResponse) => {
                props.showNotification(response.data.message);

                fetchNotesPromise()
                    .then((response: AxiosResponse) => {
                        fetchNotesCountAndSetTotalPages();
                        // Go to previous page
                        if (checkedNotesId.length == notesInView.length && currentPage > 1) {
                            setCurrentPage(prevCurrentPage => prevCurrentPage - 1);
                        }

                        setNotesInView(response.data.notes);
                        setShowConfirmationPopup(false);
                        setCheckedNotesId([]);
                    })
                    .catch((error: any) => {
                        setError(error.response.data.message);
                    });

            })
            .catch((error: any) => {
                return Promise.reject(error);
            });
    }

    // Fetch notes from the user promise
    const fetchNotesPromise = () => {
        return axios.get(global.api.notes + `?page=${currentPage}&limit=${paginationLimit}`);
    }

    // Fetch notes amount promise
    const fetchNotesAmountPromise = () => {
        return axios.get(global.api.notesCount);
    }

    // Delete notes promise
    const deleteNotesPromise = () => {
        return axios.delete(global.api.note, {data: {noteIds: checkedNotesId}})
    }

    // Create note promise
    const createNotePromise = (name: string) => {
        return axios.post(global.api.note, {name: name, content: ''});
    }

    // Add or remove the id of the selected note to selectedNotesId
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

                    {/* Confirmation Popup */}
                    {showConfirmationPopup &&
                    <PopupConfirmation message='Delete all selected notes?'
                                       customFunction={deleteSelectedNotes}
                                       setShowConfirmationPopup={setShowConfirmationPopup}
                    />
                    }

                    {/* New note Popup */}
                    {showNewNotePopup &&
                    <PopupNewNote createNewNote={createNewNote} setShowNewNotePopup={setShowNewNotePopup}/>
                    }

                    {/* Header One */}
                    <NotesHeaderOne>
                        <div className='my-notes'>My notes</div>
                        <div className='notes-header-one-left'>
                            {showTrash &&
                            <div className='notes-trash' onClick={() => {
                                setShowConfirmationPopup(true);
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
                            <Link
                                href={`${global.paths.note}/${Buffer.from(note.id).toString('base64')}?previous=${currentPage}`}>
                                <span className='note-name'>{note.name}</span>
                            </Link>
                        </MyNote>
                    )) : <div className='loading'>Loading....</div>
                    }

                    {/* Pagination */}
                    {notesInView.length > 0 &&
                    <Pagination
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={totalPages}
                    />
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