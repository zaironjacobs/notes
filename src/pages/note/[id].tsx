import {useEffect, useState} from 'react';
import {MainContainer, TextArea, NoteHeaderOne, NoteHeaderTwo} from '@style/NoteStyled';
import global from 'global';
import withSession from '@lib/session';
import Menu from '@component/Menu';
import Header from '@component/Header';
import Link from 'next/link';
import {useRouter} from 'next/router';
import axios, {AxiosResponse} from 'axios';


const Note = (props) => {
    const router = useRouter();
    const [note, setNote] = useState(null);
    const noteId = router.query.id;

    // Fetch note
    useEffect(() => {
        const fetchNotes = async () => {
            return axios.post(global.api.note, {id: noteId})
                .then(function (response: AxiosResponse) {
                    return response.data.note;
                })
                .catch(function (error) {
                    console.log(error.response);
                    return [];
                });
        }
        fetchNotes().then(note => setNote(note));
    }, []);

    const saveNote = () => {

    }

    const deleteNote = () => {
        axios.delete(global.api.note, {data: {id: noteId}})
            .then(function (response: AxiosResponse) {
                console.log(response);
                router.push(global.paths.notes);
            })
            .catch(function (error) {
                console.log(error.response);
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
            <MainContainer>
                <NoteHeaderOne>
                    <Link href={global.paths.notes}>
                        <div className='note-back'><i className='fas fa-arrow-circle-left'/></div>
                    </Link>
                </NoteHeaderOne>
                <NoteHeaderTwo>
                    <div className='note-name'>{note && note.name}</div>
                    <div className='note-options'>
                        <div className='note-save' onClick={saveNote}><i className='fas fa-check'/></div>
                        <div className='note-trash' onClick={deleteNote}><i className='fas fa-trash'/></div>
                    </div>
                </NoteHeaderTwo>
                <TextArea className='text-area' defaultValue={note && note.content}/>
            </MainContainer>
        </>
    )
}

export default Note;

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

    // Else return the user object
    return {props: {user}};
});