import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../store/comments"
import { useHistory, useParams } from "react-router-dom";
import "./delete.css"

function DeleteCommentFrom({ comment, hide}){
    const sessionUser = useSelector(state => state.session.user);
    const { id } = useParams(); 
    const dispatch = useDispatch();
    const history = useHistory();
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        await dispatch(deleteComment(comment))
        hide()
        history.push(`/stories/${id}`)
        // history.push('/')
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

export default DeleteCommentFrom;