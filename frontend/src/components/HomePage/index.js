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

    return (
        <div>
            {story.map((st)=>{
                return (
                    <div>

                        <i className="fas fa-user-circle" />
                        <div>
                            <NavLink to={`/login`} key={st.id}>{st.title}</NavLink>
                            <p>{st.body}</p>
                            {st.authorId === control && (
                                    
                                <button onClick={() => setShowModal(true)}>EDIT</button>
                                        
                            )}
                        </div>
                        {showModal && (
                            <Modal onClose={() => setShowModal(false)}>
                                <StoryFrom st={st} hide={()=> setShowModal(false)} />
                            </Modal>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default HomePage;