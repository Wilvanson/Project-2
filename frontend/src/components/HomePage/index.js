import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStories } from "../../store/story";
import { NavLink, Redirect} from "react-router-dom";
import './Home.css'


function HomePage(){
    const story = useSelector(state => {
        return state.story.list;
      });
        
    const dispatch = useDispatch();
    // console.log(story[0])

    useEffect(()=>{
        dispatch(getStories())
      }, [dispatch])
    if(!story){
        return(
            <div>
                <h2>HELLO</h2>
            </div>
    )}

    return (
        <div>
            {story.map((st)=>{
                return (
                    <NavLink to={`/login`} key={st.id} className="story">
                        <i className="fas fa-user-circle" />
                        <div>
                            <p>{st.title}</p>
                            <p>{st.body}</p>
                        </div>
                    </NavLink>
                )
            })}
        </div>
    )
}

export default HomePage;