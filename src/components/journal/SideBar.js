import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';
import { JournalEntries } from './JournalEntries'

export const SideBar = () => {

    const {name} = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const handleLogout = ()=>{
        dispatch(startLogout());
    }

    const handleAddNew = ()=>{
        dispatch(startNewNote());
    }

    return (
        <aside
            className="journal__sidebar">

            <div className="journal__sidebar-navbar">
                <h3 className="mt-5">
                    <i className="far fa-moon mr-1"/>
                    <span>{name}</span>
                </h3>

                <button 
                    onClick={handleLogout}
                    className="btn">
                    Logout
                </button>
            </div>

            <div 
                onClick={handleAddNew}
                className="journal__new-entry">
                <i className="far fa-calendar-plus fa-5x"></i>
                <p className="mt-5">New entry</p>
            </div>

            <JournalEntries/>
        </aside>
    )
}
