import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStory, getStories } from '../../store/story';
import { useHistory } from "react-router-dom";


function AddFrom({ hide}){
    const sessionUser = useSelector(state => state.session.user);
    const [title, setTitle]= useState( '');
    const [body, setBody]= useState('');
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();
    let form = 'ADD';
   
    useEffect(()=>{
      dispatch(getStories())
    }, [dispatch])

    const handleSubmit = async(e) => {
        e.preventDefault();
        setErrors([]);
        
          let authorId = sessionUser.id;
          const obj = {
            authorId,
            title,
            body
          }
          const newStory = await dispatch(addStory(obj))
        hide();
        history.push('/')
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

export default AddFrom;