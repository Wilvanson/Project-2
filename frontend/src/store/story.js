import { csrfFetch } from './csrf';

const LOAD_STORIES = 'story/loadStories';
const ADD_STORIES = 'story/addStories';
const REMOVE_STORIES = 'story/removeStories';
// const EDIT_STORIES = 'story/editStories';

const loadStories = list => {
    return {
      type: LOAD_STORIES,
      list
    };
};

const addStories = list => {
    return {
      type: ADD_STORIES,
      list
    };
};

// const removeStories = id => {
//     return {
//       type: REMOVE_STORIES,
//       id
//     };
// };

// const editStories = list => {
//     return {
//       type: ADD_STORIES,
//       list
//     };
// };

export const getStories = () => async dispatch => {
    const response = await csrfFetch(`/api/stories`);
  
    if (response.ok) {
      const list = await response.json();
      dispatch(loadStories(list));
    }
  };
  
  export const addStory = (newStories) => async dispatch => {
    const response = await csrfFetch(`/api/stories`,{
      method:"POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newStories)
    });
  
    if (response.ok) {
      const story = await response.json();
      // console.log(story)
      dispatch(addStories(story));
      return story;
    }
  };
  
  export const editStory = (story) => async dispatch => {
    const response = await csrfFetch(`/api/stories/${story.id}`,{
      method:"PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(story)
    });
  
    if (response.ok) {
      const story = await response.json();
      dispatch(addStories(story));
      return story;
    }
  };


  const initialState = {
    list: [],
    types: []
  };

const storyReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_STORIES:
      const allStories = {};
      action.list.forEach(story =>{
        allStories[story.id] = story;
      });
      return {
        ...allStories,
        ...state,
        list: action.list
      }
    case ADD_STORIES:
      if (!state[action.story.id]) {
        const newState = {
          ...state,
          [action.story.id]: action.story
        };
      const storyList = newState.list.map(id => newState[id]);
      storyList.push(action.story);
      newState.list = storyList;
      return newState;
    }
    return {
      ...state,
      [action.pokemon.id]: {
        ...state[action.pokemon.id],
        ...action.pokemon
      }
    };
      
    case REMOVE_STORIES:
        return newState;
    default:
      return state;
  }
};

export default storyReducer;