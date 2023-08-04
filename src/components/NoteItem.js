import React, {useContext, useState} from 'react'
import NoteContext from '../context/notes/NoteContext'
import AlertContext from '../context/AlertContext';
import Modal from './Modal';

export default function NoteItem(props) {

    const { deleteNote} = useContext(NoteContext);
    const {showAlert}=useContext(AlertContext);

    //creating a state for modal to show and unshow
    const [modal,setModal]=useState(false);

    const handleClick=()=>{

        showAlert("Success: Note Deleted Successfully","success");
        deleteNote(props.id);
    }

    //this is will update the state of modal when update button is clicked
    const modalClick=()=>{
        setModal(true);
    }

    return (
        <div>
            
            {modal&&<Modal title={props.title} setModal={setModal} tag={props.tag} description={props.description} id={props.id} />}

            <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">


                    <div className="d-flex justify-content-between">
                        <h5 className="card-title">{props.title}</h5>
                        <i className="fa-solid fa-pen-to-square fa-beat-fade" onClick={modalClick}></i>
                    </div>


                    <p className="card-text">{props.description}</p>
                    <p className="card-text"><strong>Tag:</strong> {props.tag}</p>


                    <i className="fa-solid fa-trash fa-bounce" onClick={handleClick}></i>

                </div>
            </div>
        </div>
    )
}
