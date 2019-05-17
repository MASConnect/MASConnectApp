
import {LOAD_USER} from "../constants/user"


const initialState = {
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER:
      return state;
    default:
      return state;
  }
};
