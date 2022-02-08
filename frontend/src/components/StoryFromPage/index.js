import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { editStory } from '../../store/story';

function StoryFrom({ st }){
    const sessionUser = useSelector(state => state.session.user);
    const [title, setTitle]= useState(st.title || '');
    const [body, setBody]= useState(st.body || '');
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        const obj = {
            ...st,
            title,
            body
        }
        console.log(obj)
        return dispatch(editStory(obj))
      }
    
    return (
        <div>
      <h1>EDIT</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          Username or Email
          <input
            id='title'
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            id='body'
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </label>
        <button type="submit">Done</button>
        {/* <button onClick={handleDemo}>Can</button> */}
      </form>
    </div>
    )
}

export default StoryFrom;