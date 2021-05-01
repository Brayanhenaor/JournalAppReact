import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes'
import { useForm } from '../../hooks/useForm'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const dispatch = useDispatch();
    const {active:note} = useSelector(state => state.notes)

    const [formValues, handleInputChange, reset] = useForm(note);
    const {body, title}=formValues;

    const activeId = useRef(note.id);

    const handleDelete = () => {
        dispatch(startDeleting(activeId.current));
    }

    useEffect(() => {
        if(note.id !== activeId.current){
            reset(note);
            activeId.current = note.id;
        }

    }, [note, reset])

    useEffect(() => {

        dispatch(activeNote(formValues.id, {...formValues}));

    }, [formValues, dispatch])

    return (
        <div className="notes__main-content">
            <NotesAppBar/>

            <div className="notes__content">
                <input
                    type="text"
                    autoComplete="off"
                    placeholder="some awesome title"
                    value={title}
                    name="title"
                    onChange={handleInputChange}                
                    className="notes__title-input"/>

                <textarea
                    value={body}
                    name="body"
                    onChange={handleInputChange}
                    placeholder="What happened today"
                    className="notes__textarea">

                </textarea>

                {
                    note.url &&
                    <div className="notes__image">
                        <img
                            alt="imagen" 
                            src={note.url}/>
                    </div>
                }
                
            </div>


            <button
                onClick={handleDelete}
                className="btn btn-danger">
                Delete
            </button>
        </div>
    )
}
