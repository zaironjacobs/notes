import {Main, UserNote, NotesHeaderOne, NotesHeaderTwo, PageWrapper} from '@style/NotesStyled';
import global from 'global';
import withSession from '@lib/session';
import Menu from '@component/Menu';
import Header from '@component/Header';
import axios, {AxiosResponse} from 'axios';
import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import {NextRouter, useRouter} from 'next/router';
import PopupNewNote from '@component/PopupNewNote';
import PopupConfirmation from '@component/PopupConfirmation';
import Head from 'next/head';
import Footer from '@component/Footer';
import UserInterface from '@interface/User';
import NoteInterface from '@interface/Note';
import Pagination from '@component/Pagination';
import useSWR from 'swr'
import {getNotesCount} from '@api/notes-count';


const Notes = (props) => {
    const router: NextRouter = useRouter();
    const [currentPage, setCurrentPage] = useState<number>(props.currentPage);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [checkedNotesId, setCheckedNotesId] = useState<string[]>([]);
    const [showNewNotePopup, setShowNewNotePopup] = useState<boolean>(false);
    const [showConfirmationPopup, setShowConfirmationPopup] = useState<boolean>(false);
    const [showTrash, setShowTrash] = useState<boolean>(false);

    const {
        data: notesCountData, error: notesCountDataError, mutate: mutateNotesCountData
    } = useSWR(global.api.notesCount);

    const {
        data: notesData, error: notesError, mutate: mutateNotesData
    } = useSWR(`${global.api.notes}?page=${currentPage}&limit=${global.paginationLimit}`);

    // On notesCountData change, update total pages shown
    useEffect(() => {
        if (!notesCountData || notesCountDataError) return;
        setTotalPages(calculateTotalPages(notesCountData.count));
    }, [notesCountData]);

    // On checkedNotesId change, show or hide the trash icon
    useEffect(() => {
        if (checkedNotesId.length > 0) {
            setShowTrash(true);
        } else {
            setShowTrash(false);
        }
    }, [checkedNotesId]);

    // Display notes
    const UserNotes = () => {
        if (notesError) {
            return (
                <>
                    <div className='notes-server-error'>Error</div>
                </>
            );
        }
        if (!notesData) {
            return (
                <>
                    <div className='notes-loading'>Loading...</div>
                </>
            );
        }
        return (
            notesData.notes.map((note, index: number) => (
                <UserNote key={index}>
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
                </UserNote>
            ))
        );
    };

    // Create a new note
    const createNewNote = (name: string) => {
        return createNotePromise(name)
            .then(async (response: AxiosResponse) => {
                const newNotesCountResponse = await mutateNotesCountData();
                const newNoteId = response.data.id;
                const page: number = calculateTotalPages(newNotesCountResponse.count);
                router.push(`${global.paths.note}/${Buffer.from(newNoteId).toString('base64')}?previous=${page}&editable=true`);
            })
            .catch((error: any) => {
                return Promise.reject(error);
            });
    }

    // Delete all notes from selectedNotesId
    const deleteSelectedNotes = () => {
        return deleteNotesPromise()
            .then(async (response: AxiosResponse) => {
                props.showNotification(response.data.message);
                await mutateNotesData();
                await mutateNotesCountData();

                // Go to previous page
                if (checkedNotesId.length == notesData.notes.length && currentPage > 1) {
                    setCurrentPage(prevCurrentPage => prevCurrentPage - 1);
                }

                setShowConfirmationPopup(false);
                setCheckedNotesId([]);
            })

            .catch((error: any) => {
                return Promise.reject(error);
            });
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
            checkAllNotes(notesData.notes, true);
            setCheckedNotesId(() => {
                const selectedNotesId = [];
                notesData.notes.forEach(note => {
                    selectedNotesId.push(note.id);
                });
                return selectedNotesId;
            });
        } else {
            checkAllNotes(notesData.notes, false);
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
                    {!notesError && notesData?.notes &&
                    <NotesHeaderTwo>
                        <input
                            className='notes-checkbox'
                            id='notes-checkbox'
                            type='checkbox'
                            checked={checkedNotesId.length === notesData?.notes.length}
                            onChange={toggleAllNotesCheck}
                        />
                        <span className='notes-name'>Name</span>
                    </NotesHeaderTwo>
                    }

                    {/* Notes */}
                    <UserNotes/>

                    {/* Pagination */}
                    {notesData?.notes &&
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
    );
}

// Calculate the total pages
const calculateTotalPages = (notesAmount) => {
    return Math.ceil(notesAmount / global.paginationLimit);
}

export default Notes;

export const getServerSideProps = withSession(async ({req, res, query}) => {
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

        // Get notes count
        let notesCountData;
        try {
            notesCountData = await getNotesCount(user);
        } catch (error) {
            notesCountData = {count: 0};
        }

        // Get current page to set from query
        let currentPage = query.page;
        const totalPages = calculateTotalPages(notesCountData.count);
        if (currentPage === undefined || isNaN(currentPage) || currentPage < 1 || currentPage > totalPages) {
            currentPage = 1;
        }

        return {props: {user, currentPage}};
    }
);