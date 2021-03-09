import {useEffect, useRef, useState} from 'react';
import {MainContainer, TextArea, NoteHeaderOne, NoteHeaderTwo} from '@style/NoteStyled';
import global from 'global';
import withSession from '@lib/session';
import Menu from '@component/Menu';
import Header from '@component/Header';
import Link from 'next/link';
import {useRouter} from 'next/router';
import PopupConfirmation from '@component/PopupConfirmation';
import axios, {AxiosResponse} from 'axios';
import Notification from '@component/Notification';


const Note = (props) => {
    const router = useRouter();
    const noteId: string = Buffer.from(router.query.id.toString(), 'base64').toString();
    const queryEditable: string | string[] = router.query.editable || '';
    const [note, setNote] = useState(null);
    const [noteName, setNoteName] = useState('');
    const [noteContent, setNoteContent] = useState('');
    const [showDeleteNoteConfirmationPopup, setShowDeleteNoteConfirmationPopup] = useState(false);
    const [editable, setEditable] = useState(false);
    const textAreaNode = useRef<HTMLInputElement>(null);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');


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
                .then(function (response: AxiosResponse) {
                    return response.data.note;
                })
                .catch(function (error) {
                    router.push(global.paths.notfound404);
                });
        }
        fetchNote().then(note => {
            setNote(note);
            setNoteName(note.name);
            setNoteContent(note.content);
        });
    }, []);

    // Save the note
    const saveNote = () => {
        if (editable && noteName !== '') {
            axios.put(global.api.note, {id: noteId, name: noteName, content: noteContent})
                .then(function (response: AxiosResponse) {
                    setEditable(false);
                    startShowNotification();
                })
                .catch(function (error) {
                    console.log(error.response);
                });
        }
    }

    // Delete the note
    const deleteNote = () => {
        axios.delete(global.api.note, {data: {id: noteId}})
            .then(function (response: AxiosResponse) {
                router.push(global.paths.notes);
            })
            .catch(function (error) {
                console.log(error.response);
            });
    }

    const changeNoteName = (event) => {
        setNoteName(event.target.value);
    }

    const changeNoteContent = (event) => {
        setNoteContent(event.target.value);
    }

    // Show notification
    const startShowNotification = () => {
        setNotificationMessage('Note saved');
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
            setNotificationMessage('');
        }, 3000);
    }

    return (
        <>
            {/* Menu */}
            <Menu menuOpen={props.menuOpen} setMenuOpen={props.setMenuOpen} user={props.user}/>

            {/* Header */}
            <Header menuOpen={props.menuOpen} setMenuOpen={props.setMenuOpen}/>

            {/* Bottom Notification */}
            {<Notification message={notificationMessage} showMessage={showNotification}/>}

            {/* Main */}
            {note ? <MainContainer>
                    {showDeleteNoteConfirmationPopup &&
                    <PopupConfirmation message='Are you sure you want to delete this note?'
                                       customFunction={deleteNote}
                                       setShowPopUp={setShowDeleteNoteConfirmationPopup}
                    />
                    }
                    <NoteHeaderOne>
                        <Link href={global.paths.notes}>
                            <i className='fas fa-arrow-circle-left back'/>
                        </Link>
                    </NoteHeaderOne>
                    <NoteHeaderTwo>
                        <div className='note-name-wrapper'>
                            <input className='note-name-input'
                                   placeholder='Note name...'
                                   value={noteName}
                                   onChange={changeNoteName}
                                   type='text'
                                   autoComplete='off'
                                   disabled={!editable}/>
                        </div>
                        <div className='note-options-wrapper'>
                            <div className='note-edit' onClick={() => {
                                setEditable(true);
                            }}>
                                <i className='fas fa-edit'/>
                            </div>
                            <div className='note-save' onClick={saveNote}><i className='fas fa-check'/></div>
                            <div className='note-trash' onClick={() => {
                                setShowDeleteNoteConfirmationPopup(true);
                            }}>
                                <i className='fas fa-trash'/>
                            </div>
                        </div>
                    </NoteHeaderTwo>
                    <TextArea
                        placeholder='Your amazing ideas here...'
                        onChange={changeNoteContent}
                        value={noteContent} disabled={!editable}
                        ref={textAreaNode}
                    />
                </MainContainer>
                : null}
        </>
    )
}

export default Note;

export const getServerSideProps = withSession(async function (
{
    req, res
}
)
{
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

    // Else return the user object
    return {props: {user}};
}
);