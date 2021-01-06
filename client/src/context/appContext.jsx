import { createContext, useReducer } from "react";

// App Reducer
import { reducer } from "../reducers/AppReducer";
export const AppContext = createContext();

const initialState = {
  // Login state
  isLogin: false,
  // Loading state
  isLoading: true,
  // Modal (just message without button)
  isModalOpen: false,
  modalMessage: null,
  // State for user
  user: [],
  // User playlist
  playlist: [],
  // Transactions list
  transactions: [],
  // List of Artist
  artists: [],
  // List of Musics
  musics: [],
};

export const AppContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {props.children}
    </AppContext.Provider>
  );
};
