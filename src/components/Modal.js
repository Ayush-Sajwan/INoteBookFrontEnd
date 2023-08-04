import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';
import AlertContext from '../context/AlertContext';


export default function Modal(props) {

    const {id,title,description,tag,setModal}=props;

    const {updateNote}=useContext(NoteContext);
    const {showAlert}=useContext(AlertContext);

    const [note,setNote]=useState({title,description,tag});

    //when cross is clicked closing the modal
    const crossClick=()=>{
        setModal(false);
    }

    const handleChange=(e)=>{

        setNote({...note,[e.target.name]:e.target.value});
    }

    const handleUpdateClick=()=>{

        console.log(note);

        updateNote(id,note.title,note.description,note.tag);
        setModal(false);
        showAlert("Success: Note Updated Successfully","success");
    }

    return (
        <div style={{
            position: "fixed",
            zIndex: 1, 
            left: 0,
            top: 0,
            width: "100vw",
            height: "100vh"
        }}>
            <div className='container my-3' style={{width:"50%",
            color:"white",
            borderRadius:"5%",
            padding:"2em",
            backgroundColor: "rgba(16,41,109)"}} >

                <div className="d-flex justify-content-between">
                <h2>Edit Note</h2>
                <i className="fa-solid fa-xmark" style={{color: "#f1f2f3"}} onClick={crossClick}></i>
                </div>
                
                <form>
                    <div className="mb-3">
                        
                        <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                        <input type="text" value={note.title} onChange={handleChange} className="form-control" id="title" name="title" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                        <textarea className="form-control" value={note.description} onChange={handleChange} rows="3" id="description" name="description" ></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Tag</label>
                        <input type="text" className="form-control" value={note.tag} onChange={handleChange} id="tag" name="tag" />
                    </div>


                    <button type='button' className="btn btn-primary" onClick={handleUpdateClick}>Save Changes</button>
                </form>

            </div>
        </div>
    )
}
