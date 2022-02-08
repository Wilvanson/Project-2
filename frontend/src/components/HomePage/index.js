import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStories, addStory} from "../../store/story";
import { NavLink, Redirect} from "react-router-dom";
import { Modal } from '../../context/Modal';
import StoryFrom from '../StoryFromPage'
import './Home.css'


function HomePage(){
    const sessionUser = useSelector(state => state.session.user);
    const [showModal, setShowModal]= useState(false)
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

   console.log(showModal)

    return (
        <div>
            {story.map((st)=>{
                return (
                    <NavLink to={`/login`} key={st.id} className="story">
                        <i className="fas fa-user-circle" />
                        <div>
                            <p>{st.title}</p>
                            <p>{st.body}</p>
                            {st.authorId === control && (
                                
                                    <button onClick={() => setShowModal(true)}>EDIT</button>
                                    
                            )}
                            {showModal && (
                                        <Modal onClose={() => setShowModal(false)}>
                                            <StoryFrom st={st} />
                                        </Modal>
                            )}
                        </div>
                    </NavLink>
                )
            })}
        </div>
    )
}

export default HomePage;