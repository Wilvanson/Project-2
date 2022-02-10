import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../store/comments";
import { useHistory, useParams } from "react-router-dom";

function CommentFrom({ st, hide}){
    const sessionUser = useSelector(state => state.session.user);
    const { id } = useParams(); 
    const dispatch = useDispatch();
    const history = useHistory();
    const [body, setBody] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        let userId = sessionUser.id;
        let storyId = id;
        const obj = {
            userId,
            storyId,
            body
        }
        
        dispatch(addComment(obj))
        hide();
      }

    const handleStop=(e)=>{
        hide();
    }
    
    return (
        <div>
      <h1>COMMENT</h1>
      <form onSubmit={handleSubmit}>
      <label>
          YOUR COMMENT:
          <input
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </label>
        <button type="submit">DONE</button>
        <button onClick={handleStop}>CANCEL</button>
      </form>
    </div>
    )
}

export default CommentFrom;