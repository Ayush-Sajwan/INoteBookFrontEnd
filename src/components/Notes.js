import React, { useContext, useEffect } from 'react'
import NoteContext from '../context/notes/NoteContext'
import NoteItem from './NoteItem';
import { useNavigate } from "react-router-dom";

export default function Notes() {

    const navigate=useNavigate();

    const { notes,getNotes} = useContext(NoteContext);

    //running the getnotes function in the context to load all the notes intially
    useEffect(()=>{

        if(!localStorage.getItem('token')){
            navigate("/login");

        }
        else{
            getNotes();
        }
        
    },[getNotes,navigate]);


    return (
        <div className='container my-3'>
            <h2>Your Notes</h2>

            <div className="row my-3">

            {notes.length===0?<div className='container'> No Notes to Display</div>:""}


                {notes.map((note) => {
                    return(<div className="col-md-3 my-3" key={note._id}>
                         <NoteItem  id={note._id} title={note.title} tag={note.tag} description={note.description} />
                    </div>
                    );
                })}

            </div>

        </div>
    )
}
