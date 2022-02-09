import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { editStory, getStories } from '../../store/story';
import { useHistory, useParams } from "react-router-dom";

function Story_Detail(){
    const { id } = useParams(); 
    const dispatch = useDispatch();
    const story = useSelector(state => {
        return state.story.list;
      });

    let one = story.find(st => st.id === id)
    useEffect(()=>{
        dispatch(getStories())
      }, [dispatch])

    console.log(one)

    return (
        <div>
            <h2>Hello</h2>
            <p>{id}</p>
        </div>
    )
}

export default Story_Detail;