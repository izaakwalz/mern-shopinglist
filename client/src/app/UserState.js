import React, { createContext, useReducer } from 'react';
import UserReduser from './UserReduser';
import axios from 'axios';

const initialState = {
  user: [],
  error: null,
  isAuthenticated: null,
  isLoading: false,
};

export const UserContext = createContext(initialState);

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReduser, initialState);

  const register = async (user) => {
    // headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post(/* your api route */ user, config);
      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'REGISTER_FAIL',
        payload: err.response.data.error,
      });
    }
  };

  const login = async (user) => {
    // headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post(/* your api route */ user, config);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'LOGIN_FAIL',
        payload: err.response.data.error,
      });
    }
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        isLoading: state.isLoading,
        isAuthenticated: state.isAuthenticated,
        register,
        login,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
