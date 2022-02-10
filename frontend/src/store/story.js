import { csrfFetch } from './csrf';

const LOAD_STORIES = 'story/loadStories';
const ADD_STORIES = 'story/addStories';
const REMOVE_STORIES = 'story/removeStories';
const EDIT_STORY = 'story/editStory';


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

const edit_Story = list => {
    return {
      type: EDIT_STORY,
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
      body: JSON.stringify({title, body})
    });
  
    if (response.ok) {
      const story = await response.json();
      dispatch(edit_Story(story));
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
        const newList = [...state.list];
        newList.push(action.list);
    
        return {
            ...state,
            [action.list.id] : {
              ...action.list
            },
            list: newList
          };
      case EDIT_STORY:
        let newState = [...state.list];
        let body = action.list.body;
        let title = action.list.title;
        const obj = {
          ...action.list,
          body,
          title
        }
        newState[action.list.id] = obj;
        return {
          ...state,
          [action.list.id] : {
            ...action.list
          },
          list: newState
        };
    case REMOVE_STORIES:
      const newStates = { ...state };
      delete newStates[action.id];
      return newStates;
    default:
      return state;
  }
};

export default storyReducer;