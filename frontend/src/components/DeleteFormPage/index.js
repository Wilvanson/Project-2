import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteStory } from '../../store/story';
import { useHistory, useParams } from "react-router-dom";

function DeleteFrom({ st, hide}){
    const sessionUser = useSelector(state => state.session.user);
    const { id } = useParams(); 
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(deleteStory(id))
        history.push('/')
      }

    const handleStop=(e)=>{
        hide();
    }
    
    return (
        <div>
      <h1>DELETE</h1>
      <form onSubmit={handleSubmit} className="delete">
        <button type="submit">YES</button>
        <button onClick={handleStop}>NO</button>
      </form>
    </div>
    )
}

export default DeleteFrom;