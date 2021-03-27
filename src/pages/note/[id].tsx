import React, {useEffect, useRef, useState} from 'react';
import {Main, PageWrapper, NoteHeaderOne, NoteHeaderTwo} from '@style/NoteStyled';
import {CustomTextArea} from '@component/CustomTextArea';
import {CustomInput} from '@component/CustomInput';
import global from 'global';
import withSession from '@lib/session';
import Menu from '@component/Menu';
import Header from '@component/Header';
import Link from 'next/link';
import {NextRouter, useRouter} from 'next/router';
import PopupConfirmation from '@component/PopupConfirmation';
import axios, {AxiosResponse} from 'axios';
import Head from 'next/head';
import Footer from '@component/Footer';
import NoteInterface from '@interface/Note';
import UserInterface from '@interface/User';


const Note = (props) => {
    const router: NextRouter = useRouter();
    const noteId: string = Buffer.from(router.query.id.toString(), 'base64').toString();
    const queryEditable: string | string[] = router.query.editable || '';
    const [note, setNote] = useState<NoteInterface>(null);
    const [showConfirmationPopUp, setShowConfirmationPopUp] = useState<boolean>(false);
    const [editable, setEditable] = useState<boolean>(false);
    const textAreaNode = useRef<HTMLInputElement>(null);
    const maxLength: number = 15000000; // note content size less than MEDIUMTEXT max size

    // New note should be editable by default
    useEffect(() => {
        if (queryEditable === 'true') {
            setEditable(true);
        }
    }, []);

    // Set the focus on the textarea on queryEditable is true
    useEffect(() => {
        if (textAreaNode.current !== null && editable === true) {
            textAreaNode.current.focus();
        }
    }, [textAreaNode.current]);

    // Set the focus on the textarea when enabled is true
    useEffect(() => {
        if (textAreaNode.current !== null && editable === true) {
            textAreaNode.current.focus();
        }
    }, [editable]);

    // Fetch note
    useEffect(() => {
        const fetchNote = async () => {
            return axios.get(global.api.note, {params: {id: noteId}})
                .then((response: AxiosResponse) => {
                    return response.data.note;
                })
                .catch((error) => {
                    router.push(global.paths.notfound404);
                });
        }
        fetchNote().then(note => {
            if (note) {
                setNote(note);
            } else {
                router.push(global.paths.notfound404);
            }
        });
    }, []);

    // Save the note
    const saveNote = () => {
        if (editable && note) {
            const toSaveNote: NoteInterface = {id: noteId, name: note.name, content: note.content, isChecked: false}
            axios.put(global.api.note, {note: toSaveNote})
                .then((response: AxiosResponse) => {
                    setEditable(false);
                    props.showNotification('Note saved');
                })
                .catch((error) => {
                    props.showNotification(error.response.data.message);
                });
        }
    }

    // Delete the note
    const deleteNote = () => {
        return axios.delete(global.api.note, {data: {noteIds: [noteId]}})
            .then((response: AxiosResponse) => {
                props.showNotification('Note deleted');
                router.push(global.paths.notes);
            })
            .catch((error) => {
                return Promise.reject(error);
            });
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
                        {showConfirmationPopUp &&
                        <PopupConfirmation message='Are you sure you want to delete this note?'
                                           customFunction={deleteNote}
                                           setShowConfirmationPopUp={setShowConfirmationPopUp}
                        />
                        }
                        <NoteHeaderOne>
                            <Link href={global.paths.notes}>
                                <i className='fas fa-arrow-circle-left back'/>
                            </Link>
                        </NoteHeaderOne>
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
                                <div className='note-edit' onClick={() => {
                                    setEditable(true);
                                }}>
                                    <i className='fas fa-edit'/>
                                </div>
                                <div className='note-save' onClick={saveNote}><i className='fas fa-check'/></div>
                                <div className='note-trash' onClick={() => {
                                    setShowConfirmationPopUp(true);
                                }}>
                                    <i className='fas fa-trash'/>
                                </div>
                            </div>
                        </NoteHeaderTwo>
                        <CustomTextArea
                            placeholder='Your amazing ideas here...'
                            onChange={changeNoteContent}
                            value={note.content} disabled={!editable}
                            ref={textAreaNode}
                            maxLength={maxLength}
                        />
                        <div className='max-length'>{note.content.length >= maxLength ? 'Note full' : ''}</div>
                    </PageWrapper>
                    : <div className='loading'>Loading....</div>}
            </Main>

            {/* Footer */}
            <Footer/>
        </>
    )
}

export default Note;

export const getServerSideProps = withSession(async (
    {
        req, res
    }
    ) => {
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