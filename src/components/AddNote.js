import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';
import AlertContext from '../context/AlertContext';

export default function AddNote() {

    //creating a note state to track the changes of the input boxes
    const [note,setNote]=useState({title: "" , description: "" ,tag: ""});

    //getting addNote function from the context
    const {addNote}=useContext(NoteContext);

    const {showAlert}=useContext(AlertContext);


    //handling the change in any of the input tags
    const handleChange=(e)=>{

        //setting the value of changed field equal to the field value
        setNote({...note, [e.target.name]: e.target.value});
    }

    //running this event whenever the button is clicked
    const handleClick=()=>{

        showAlert("Success: Note Added Successfully","primary");
        //calling the note function passed from the context to add the note

        addNote(note.title,note.description,note.tag);
        setNote({title: "" , description: "" ,tag: ""});
    }
    return (
        <div className='container my-3'>
        <h2>Add a Note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                    <input type="text" value={note.title} onChange={handleChange} className="form-control" id="title" name="title" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                    <textarea className="form-control" value={note.description} onChange={handleChange}  rows="3" id="description" name="description" required></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Tag</label>
                    <input type="text" value={note.tag} onChange={handleChange} className="form-control" id="tag" name="tag" />
                </div>
                
                
                <button type='button' className="btn btn-primary" onClick={handleClick}>Add note</button>
            </form>

        </div>
    )
}
