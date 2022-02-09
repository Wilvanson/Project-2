import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { editStory, getStories } from '../../store/story';


function StoryFrom({ st, hide}){
    const sessionUser = useSelector(state => state.session.user);
    const [title, setTitle]= useState(st.title);
    const [body, setBody]= useState(st.body);
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

    useEffect(()=>{
      dispatch(getStories())
    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        const obj = {
            ...st,
            title,
            body
        }
        console.log(obj)
        dispatch(editStory(obj))
        hide();
      }

    const handleStop=(e)=>{
        hide();
    }
    
    return (
        <div>
      <h1>EDIT</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          Title
          <input
            id='title'
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
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

export default StoryFrom;