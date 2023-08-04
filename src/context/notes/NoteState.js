import { useState } from "react";
import NoteContext from "./NoteContext";


const NoteState = (props) => {
  const host="http://localhost:5000/api";

  //creating state to store all the notes
  const [notes, setNotes] = useState([]);

  //this function is responsible for getting all the notes from database initially
  const getNotes=async ()=>{

    const response=await fetch(`${host}/notes/fetchAllNotes`,{
      method:"GET",
      headers:{
        "auth-token":localStorage.getItem('token')
      }
    });
    const data=await response.json();
    setNotes(data);
  }



  //addnote function
  const addNote=async (title,description,tag)=>{
    const response=await fetch(`${host}/notes/addNote`,{
      method:"POST",
      headers:{
        "content-type":"application/json",
        "auth-token": localStorage.getItem('token')
      },
      body:JSON.stringify({title,description,tag})
    });

    //data will contain the added note details
    const data=await response.json();
    console.log(data)

    //concatenating the added note to notes array
    setNotes(notes.concat(data));
    
    
    
  }


  //deleteNote function
  const deleteNote=async (id)=>{
    const response=await fetch(`${host}/notes/deleteNote/${id}`,{
      method:"DELETE",
      headers:{
        "auth-token": localStorage.getItem('token')
      }
    });

    //data will contain the deleted note details
    const data=await response.json();
    console.log(data);

    //concatenating the added note to notes array
    setNotes(notes.filter((note)=>{
      return note._id!==id;
    }));
    
  }



    //updatenote function
    const updateNote=async (id,title,description,tag)=>{
      const response=await fetch(`${host}/notes/updateNote/${id}`,{
        method:"PATCH",
        headers:{
          "content-type":"application/json",
          "auth-token": localStorage.getItem('token')
        },
        body:JSON.stringify({title,description,tag})
      });
  
      //data will contain the updated note details
      const data=await response.json();
  
      console.log(data);
      getNotes();
      
      
    }

  

  return (

    <NoteContext.Provider value={{ notes, setNotes,addNote,getNotes ,deleteNote,updateNote}}>
      {props.children}
    </NoteContext.Provider>

  )
}

export default NoteState;