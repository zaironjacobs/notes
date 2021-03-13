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
    const [noteName, setNoteName] = useState<string>('');
    const [noteContent, setNoteContent] = useState<string>('');
    const [showConfirmationPopUp, setShowConfirmationPopUp] = useState<boolean>(false);
    const [editable, setEditable] = useState<boolean>(false);
    const textAreaNode = useRef<HTMLInputElement>(null);

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
            return axios.post(global.api.note, {id: noteId})
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
                setNoteName(note.name);
                setNoteContent(note.content);
            } else {
                router.push(global.paths.notfound404);
            }
        });
    }, []);

    // Save the note
    const saveNote = () => {
        if (editable && noteName !== '') {
            const note: NoteInterface = {id: noteId, name: noteName, content: noteContent, isChecked: false}
            axios.put(global.api.note, {note: note})
                .then((response: AxiosResponse) => {
                    setEditable(false);
                    props.showNotification('Note saved');
                })
                .catch((error) => {
                    console.log(error.response);
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
        setNoteName(event.target.value);
    }

    // Dynamically change note content
    const changeNoteContent = (event) => {
        setNoteContent(event.target.value);
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
                    <title>{note && noteName} – {global.siteName}</title>
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
                                             value={noteName}
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
                            value={noteContent} disabled={!editable}
                            ref={textAreaNode}
                        />
                    </PageWrapper>
                    : null}
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