import { combineReducers } from "redux";
import Authenticate from "./Login/reducer"
import Bookmark from "./Bookmarks/reducer"
const rootReducer = combineReducers({
  login: Authenticate,
  bookmark: Bookmark
});
export default rootReducer;
