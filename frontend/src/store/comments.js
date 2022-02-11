import { csrfFetch } from './csrf';

const LOAD_COMMENT = 'story/loadComment';
const ADD_COMMENT = 'story/addComment';
const EDIT_COMMENT = 'story/editComment';
const REMOVE_COMMENT = 'story/removeComment';

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

const removeComment = id => {
    return {
      type: REMOVE_COMMENT,
      id
    };
};

const edit_Comment = list => {
    return {
      type: EDIT_COMMENT,
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

      dispatch(addComments(comment));
      return comment;
    }
  };

  export const editComment = (comment) => async dispatch => {
    const body = comment.body;
    const id = comment.id;
    const response = await csrfFetch(`/api/stories/${comment.storyId}/comments/:commentId`,{
      method:"PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({body, id})
    });
  
    if (response.ok) {
      const comment = await response.json();
    
      dispatch(edit_Comment(comment));
      return comment;
    }
  };

  export const deleteComment = (comment) => async dispatch => {
      const id = comment.id;
    const response = await csrfFetch(`/api/stories/${comment.storyId}/comments/:commentId`,{
      method:"DELETE",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({id})
    });
  
    if (response.ok) {
      const ids = await response.json();
      
      dispatch(removeComment(ids.id));
      
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
        case EDIT_COMMENT:
            let newState = [...state.list];
            let body = action.list.body;
            const obj = {
              ...action.list,
              body
            }
            newState[action.list.id] = obj;

            let oldList = state.list;
            let update = oldList.map(obj =>{
                if(obj.id === action.list.id){
                    return action.list
                }
                return obj;
            })
            return {
              ...state,
              [action.list.id] : {
                ...action.list
              },
              list: update
            };
        case REMOVE_COMMENT:
            let newStates = { ...state, list:[...state.list] };
            let arr = newStates.list.filter(ele => ele.id !== action.id)
            delete newStates[action.id];
            newStates.list = arr;
            return newStates;
      default:
        return state;
    }
  };
  
  export default commentReducer;