import React, {useEffect, useRef, useState} from 'react';
import {Main, PageWrapper, NoteHeaderOne, NoteHeaderTwo} from '@style/NoteStyled';
import {CustomTextArea} from '@component/CustomTextArea';
import {CustomInput} from '@component/CustomInput';
import global from 'global';
import withSession from '@lib/session';
import Menu from '@component/Menu';
import Header from '@component/Header';
import {NextRouter, useRouter} from 'next/router';
import PopupConfirmation from '@component/PopupConfirmation';
import axios, {AxiosResponse} from 'axios';
import Head from 'next/head';
import Footer from '@component/Footer';
import NoteInterface from '@interface/Note';
import UserInterface from '@interface/User';
import sha256 from 'crypto-js/sha256';


const Note = (props) => {
    const router: NextRouter = useRouter();
    const noteId: string = Buffer.from(router.query.id.toString(), 'base64').toString();
    const queryEditable: string | string[] = router.query.editable;
    const previous: string | string[] = router.query.previous;
    const [note, setNote] = useState<NoteInterface>(null);
    const [showConfirmationPopup, setShowConfirmationPopup] = useState<boolean>(false);
    const [editable, setEditable] = useState<boolean>(false);
    const textAreaNode = useRef<HTMLInputElement>(null);
    const maxLength: number = 15000000; // note content size less than MEDIUMTEXT max size
    const [originalNoteHashDigest, setOriginalNoteHashDigest] = useState('');

    // New note should be editable by default
    useEffect(() => {
        if (queryEditable === 'true') {
            setEditable(true);
        }
    }, []);

    // Set the focus on the textarea when editable is true
    useEffect(() => {
        if (textAreaNode.current !== null && editable === true) {
            textAreaNode.current.focus();
            textAreaNode.current.setSelectionRange(textAreaNode.current.value.length, textAreaNode.current.value.length);
        }
    }, [editable]);

    // Fetch note
    useEffect(() => {
        fetchNotePromise()
            .then((response: AxiosResponse) => {
                setOriginalNoteHashDigest(sha256(response.data.note.content).toString());
                setNote(response.data.note);
            })
            .catch((error: any) => {
                router.push(global.paths.notfound404);
            });
    }, []);

    // Save the note
    const saveNote = () => {
        if (sha256(note.content).toString() === originalNoteHashDigest) {
            setEditable(false);
            props.showNotification('No changes made');
            return;
        }

        if (editable && note) {
            const noteToSave: NoteInterface = {id: noteId, name: note.name, content: note.content, isChecked: false}
            saveNotePromise(noteToSave)
                .then((response: AxiosResponse) => {
                    setOriginalNoteHashDigest(sha256(note.content).toString())
                    setEditable(false);
                    props.showNotification('Note saved');
                })
                .catch((error: any) => {
                    props.showNotification(error.response.data.message);
                });
        }
    }

    // Delete the note
    const deleteNote = () => {
        return deleteNotePromise()
            .then((response: AxiosResponse) => {
                props.showNotification('Note deleted');
                goToPreviousPage();
            })
            .catch((error: any) => {
                return Promise.reject(error);
            });
    }

    // Fetch note promise
    const fetchNotePromise = () => {
        return axios.get(global.api.note, {params: {id: noteId}});
    }

    // Delete note promise
    const deleteNotePromise = () => {
        return axios.delete(global.api.note, {data: {noteIds: [noteId]}});
    }

    // Save note promise
    const saveNotePromise = (noteToSave) => {
        return axios.put(global.api.note, {note: noteToSave});
    }
    // Dynamically change note name
    const changeNoteName = (event) => {
        let updatedNote = {...note};
        updatedNote.name = event.target.value;
        setNote(updatedNote);
    }

    // Dynamically change note content
    const changeNoteContent = (event) => {
        let updatedNote = {...note};
        updatedNote.content = event.target.value;
        setNote(updatedNote);
    }

    // Enable note editing
    const enableNoteEditing = () => {
        setEditable(true);
    }

    // Go to previous page
    const goToPreviousPage = () => {
        if (typeof previous === 'string') {
            router.push(`${global.paths.notes}?page=${previous}`);
        } else {
            router.push(global.paths.notes);
        }
    }

    return (
        <>
            {/* Menu */}
            <Menu menuOpen={props.menuOpen} setMenuOpen={props.setMenuOpen} user={props.user}/>

            {/* Header */}
            <Header menuOpen={props.menuOpen} setMenuOpen={props.setMenuOpen}/>

            {/* Main */}
            <Main>
                <Head>
                    <title>{note && note.name} – {global.siteName}</title>
                </Head>

                {note ?
                    <PageWrapper>

                        {/* Confirmation popup */}
                        {showConfirmationPopup &&
                        <PopupConfirmation message='Are you sure you want to delete this note?'
                                           customFunction={deleteNote}
                                           setShowConfirmationPopup={setShowConfirmationPopup}
                        />
                        }

                        {/* Header One */}
                        <NoteHeaderOne>
                            <i className='fas fa-arrow-circle-left back' onClick={goToPreviousPage}/>
                        </NoteHeaderOne>

                        {/* Header Two */}
                        <NoteHeaderTwo>
                            <div className='note-name-wrapper'>
                                <CustomInput placeholder='Note name...'
                                             value={note.name}
                                             onChange={changeNoteName}
                                             type='text'
                                             autoComplete='off'
                                             disabled={!editable}
                                />
                            </div>
                            <div className='note-options-wrapper'>
                                <div className='note-edit' onClick={enableNoteEditing}>
                                    <i className='fas fa-edit'/>
                                </div>
                                <div className='note-save' onClick={saveNote}><i className='fas fa-check'/></div>
                                <div className='note-trash' onClick={() => {
                                    setShowConfirmationPopup(true);
                                }}>
                                    <i className='fas fa-trash'/>
                                </div>
                            </div>
                        </NoteHeaderTwo>

                        {/* TextArea */}
                        <CustomTextArea
                            placeholder='Your amazing ideas here...'
                            onChange={changeNoteContent}
                            value={note.content} disabled={!editable}
                            ref={textAreaNode}
                            maxLength={maxLength}
                            autoFocus
                        />

                        <div className='max-length'>{note.content.length >= maxLength ? 'Note full' : ''}</div>
                    </PageWrapper>
                    : <div className='loading'>Loading....</div>
                }
            </Main>

            {/* Footer */}
            <Footer/>
        </>
    )
}

export default Note;

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

        // Else return the user object
        return {props: {user}};
    }
);