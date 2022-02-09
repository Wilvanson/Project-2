import { csrfFetch } from './csrf';

const LOAD_STORIES = 'story/loadStories';
const ADD_STORIES = 'story/addStories';
const REMOVE_STORIES = 'story/removeStories';
const ONE_STORY = 'story/oneStory';

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

const removeStories = id => {
    return {
      type: REMOVE_STORIES,
      id
    };
};

const oneStory = list => {
    return {
      type: ONE_STORY,
      list
    };
};

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
    const title = story.title;
    const body = story.title;
    const response = await csrfFetch(`/api/stories/${story.id}`,{
      method:"PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(title, body)
    });
  
    if (response.ok) {
      const story = await response.json();
      console.log(story)
      dispatch(addStories(story));
      return story;
    }
  };

  export const deleteStory = (id) => async dispatch => {
    const response = await csrfFetch(`/api/stories/${id}`,{
      method:"DELETE",
      headers: {"Content-Type": "application/json"}
    });
  
    if (response.ok) {
      const id = await response.json();
      dispatch(removeStories(id));
      
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
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
};

export default storyReducer;