import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStories } from '../../store/story';
import { useParams } from "react-router-dom";
import { Modal } from '../../context/Modal';
import StoryFrom from '../StoryFromPage';
import DeleteFrom from "../DeleteFormPage";
import './story.css'


function Story_Detail(){
    const { id } = useParams(); 
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [showModal, setShowModal]= useState(false);
    const [deleteForm, setDeleteForm] = useState(false);

    let control;
    if(sessionUser){
        control = sessionUser.id;
    }

    const story = useSelector(state => {
        return state.story[id];
      });

    useEffect(()=>{
        dispatch(getStories())
      }, [dispatch])


    return (
      <div key={story.id}>

      <i className="fas fa-user-circle" />
      <div>
          <p>{story.title}</p>
          <p>{story.body}</p>
          {story.id === control&&(
            <div>
              <button onClick={() => setShowModal(true)}>EDIT</button>
              <button onClick={() => setDeleteForm(true)}>DELETE</button>
            </div>
          )}
      </div>
      {showModal && (
          <Modal onClose={() => setShowModal(false)}>
              <StoryFrom st={story} hide={()=> setShowModal(false)} />
          </Modal>
      )}
      {deleteForm && (
          <Modal onClose={() => setDeleteForm(false)}>
              <DeleteFrom story={story} hide={()=> setDeleteForm(false)} />
          </Modal>
      )}
  </div>
    )
}

export default Story_Detail;