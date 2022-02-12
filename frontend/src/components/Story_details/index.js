import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStories } from '../../store/story';
import { useParams } from "react-router-dom";
import { Modal } from '../../context/Modal';
import StoryFrom from '../StoryFromPage';
import DeleteFrom from "../DeleteFormPage";
import { getComments } from "../../store/comments";
import CommentFrom from "../AddCommentPage";
import DeleteCommentFrom from "../DeleteCommentForm";
import './story.css'
import EditFrom from "../EditCommentPage";


function Story_Detail(){
    const { id } = useParams(); 
    const sessionUser = useSelector(state => state.session.user);
    const cos = useSelector(state => state.comment.list);
    const dispatch = useDispatch();

    const [showModal, setShowModal]= useState(false);
    const [deleteForm, setDeleteForm] = useState(false);
    const [comment, setComment] = useState(false);
    const [edit, setEdit] = useState(false);
    const [deleteCommentForm, setDeleteCommentForm] = useState(false);
    const [value, setvalue] = useState();

    const sto = parseInt(id, 10)
    let comments = cos.filter(c => c.storyId === sto);
    
    let control;
    if(sessionUser){
        control = sessionUser.id;
    }

    const story = useSelector(state => {
        return state.story[id];
      });

    useEffect(()=>{
        dispatch(getStories())
        dispatch(getComments())
      }, [dispatch])


    return (
      <div key={story.id}>

      <div className="storys">
          <p className="links">{story.title}</p>
          <p>{story.body}</p>
          {story.authorId === control&&(
            <div>
              <button onClick={() => setShowModal(true) }>EDIT</button>
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
      <div className="pages">
        <h2>Comments</h2>
        {sessionUser && (
            <button onClick={() => setComment(true)}>ADD A COMMENT</button>
        )}
        {comments.map((co)=>{
                return (
                    <div key={co.id}>
                      <p>{co.body}</p>
                      {co.userId === control &&(
                          <div>
                            <button onClick={(e) => {
                                setvalue(co)
                                return setEdit(true)}}>EDIT</button>
                            <button onClick={(e) => {
                                  setvalue(co)
                                  return setDeleteCommentForm(true)}}>DELETE</button>
                          </div>
                            
                      )}
                    </div>
                )
            })}
      </div>
      {comment && (
          <Modal onClose={() => setComment(false)}>
              <CommentFrom story={story} hide={()=> setComment(false)} />
          </Modal>
      )}
      {deleteCommentForm && (
        <Modal onClose={() => setDeleteCommentForm(false)}>
            <DeleteCommentFrom comment={value} hide={()=> setDeleteCommentForm(false)} />
        </Modal>
        )}
        {edit && (
        <Modal onClose={() => setEdit(false)}>
            <EditFrom comment={value} hide={()=> setEdit(false)} />
        </Modal>
        )}
  </div>
    )
}

export default Story_Detail;