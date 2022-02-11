import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { editComment } from '../../store/comments';
import { getStories } from '../../store/story';

function EditFrom({ comment, hide}){
    const sessionUser = useSelector(state => state.session.user);
    const [body, setBody]= useState(comment.body);
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    let form = 'EDIT';
    
    useEffect(()=>{
      dispatch(getStories())
    }, [dispatch])

    const handleSubmit = async(e) => {
        e.preventDefault();
        setErrors([]);
          const obj = {
              ...comment,
              body
          }
        //   console.log(obj)
          await dispatch(editComment(obj))
        hide();
      }

    const handleStop=(e)=>{
        hide();
    }
    
    return (
        <div>
        <h1>{form}</h1>
        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <label>
            Body
            <input
              id='body'
              type="text"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </label>
          <button type="submit">Done</button>
          <button onClick={handleStop}>Cancel</button>
        </form>
    </div>
    )
}

export default EditFrom;