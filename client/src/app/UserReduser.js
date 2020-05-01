export default (state, action) => {
  switch (action.type) {
    case 'GET_AGENT':
      return {
        ...state,
        loading: false,
        agents: action.payload,
      };
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        user: [...state.user, action.payload],
      };
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', action.payload);
      return {
        ...state,
        user: [...state.user, action.payload],
        isAuthenticated: true,
        isLoading: false,
      };
    case 'REGISTER_FAIL':
    case 'LOGIN_FAIL':
      localStorage.removeItem('token');
      return {
        ...state,
        error: action.payload,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
};
