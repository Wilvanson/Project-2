import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../store/comments"
import { useHistory, useParams } from "react-router-dom";

function DeleteCommentFrom({ comment, hide}){
    const sessionUser = useSelector(state => state.session.user);
    const { id } = useParams(); 
    const dispatch = useDispatch();
    const history = useHistory();
    console.log(comment)
    const handleSubmit = async(e) => {
        e.preventDefault();
        await dispatch(deleteComment(comment))
        // history.push('/')
        hide()
      }

    const handleStop=(e)=>{
        hide();
    }
    
    return (
        <div>
      <h1>DELETE</h1>
      <form onSubmit={handleSubmit}>
        <button type="submit">YES</button>
        <button onClick={handleStop}>NO</button>
      </form>
    </div>
    )
}

export default DeleteCommentFrom;