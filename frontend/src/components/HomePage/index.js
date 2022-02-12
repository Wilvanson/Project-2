import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStories, addStory} from "../../store/story";
import { NavLink} from "react-router-dom";
import { Modal } from '../../context/Modal';
import AddFrom from "../AddStoryFormPage";
import './Home.css'


function HomePage(){
    const sessionUser = useSelector(state => state.session.user);
    const [show, setShow] = useState(false)
    const dispatch = useDispatch();
    
    const story = useSelector(state => {
        return state.story.list;
      });

    useEffect(async()=>{
        await dispatch(getStories())
      }, [dispatch])

    return (
        <div className="page">
            <button onClick={() => setShow(true)}>ADD STORY</button>
            <div className="whole">

            {story.map((st)=>{
                return (
                    <div key={st.id}>
                        {/* <i className="fas fa-user-circle" /> */}
                        <div className="story">
                            <NavLink to={`/stories/${st.id}`} key={st.id} >
                                <h2 className="links">{st.title}</h2>
                            </NavLink>
                            <p>{st.body}</p>
                        </div>
                    </div>
                )
            })}
            </div>
            {show && (
                <Modal onClose={() => setShow(false)}>
                    <AddFrom hide={()=> setShow(false)} />
                </Modal>
            )}
        </div>
    )
}

export default HomePage;