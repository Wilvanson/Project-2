import { csrfFetch } from './csrf';

const LOAD_COMMENT = 'story/loadComment';
const ADD_COMMENT = 'story/addComment';


const addComments = list => {
    return {
      type: ADD_COMMENT,
      list
    };
  };

  const loadComment = list => {
    return {
      type: LOAD_COMMENT,
      list
    };
};

  export const getComments = () => async dispatch => {
    const response = await csrfFetch(`/api/stories/comments`);
  
    if (response.ok) {
      const list = await response.json();
      dispatch(loadComment(list));
    }
  };

  export const addComment = (newComment) => async dispatch => {
    const response = await csrfFetch(`/api/stories/${newComment.storyId}/comments`,{
      method:"POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newComment)
    });
  
    if (response.ok) {
      const comment = await response.json();
      //console.log(comment) // look at this first
      dispatch(addComments(comment));
      return comment;
    }
  };

  const initialState = {
    list: [],
    types: []
  };

  const commentReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_COMMENT:
            const allComment = {};
            action.list.forEach(comment =>{
                allComment[comment.id] = comment;
            });
        return {
            ...allComment,
            ...state,
            list: action.list
        }
        case ADD_COMMENT:
          const newList = [...state.list];
          newList.push(action.list);
          return {
              ...state,
              [action.list.id] : {
                ...action.list
              },
              list: newList
            };
      default:
        return state;
    }
  };
  
  export default commentReducer;