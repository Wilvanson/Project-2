import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { editStory, getStories } from '../../store/story';
import "./edit-story.css";

function StoryFrom({ st, hide}){
    const sessionUser = useSelector(state => state.session.user);
    const [title, setTitle]= useState(st.title);
    const [body, setBody]= useState(st.body);
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
              ...st,
              title,
              body
          }
          
          await dispatch(editStory(obj))
        hide();
      }

    const handleStop=(e)=>{
        hide();
    }
    
    return (
        <div>
        <h1>{form}</h1>
        <form onSubmit={handleSubmit} className="forms">
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <p className="ladd"> Title: </p>
            <input
              id='title'
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          <p className="ladd">Body:</p>
            <textarea
              id='body'
              type="text"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />

          <button type="submit" className="b">Done</button>
          <button onClick={handleStop} className="b">Cancel</button>
        </form>
    </div>
    )
}

export default StoryFrom;