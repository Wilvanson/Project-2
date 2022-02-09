import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStories, addStory} from "../../store/story";
import { NavLink} from "react-router-dom";

import './Home.css'


function HomePage(){
    const sessionUser = useSelector(state => state.session.user);
    
    const story = useSelector(state => {
        return state.story.list;
      });
        
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getStories())
      }, [dispatch])

    let control;
    if(sessionUser){
        control = sessionUser.id;
    }

    return (
        <div>
            {story.map((st)=>{
                return (
                    <div key={st.id}>

                        <i className="fas fa-user-circle" />
                        <div>
                            <NavLink to={`/stories/${st.id}`} key={st.id}>{st.title}</NavLink>
                            <p>{st.body}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default HomePage;