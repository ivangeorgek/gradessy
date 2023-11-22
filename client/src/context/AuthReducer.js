const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: true,
      };
    case "CONNECT":
      return {
        ...state,
        user: {
          ...state.user,
          connections: [...state.user.connections, action.payload],
        },
      };
    case "DISCONNECT":
      return {
        ...state,
        user: {
          ...state.user,
          connections: state.user.connections.filter(
            (connection) => connection !== action.payload
          ),
        },
      };
      case "LOGOUT":
        return {
          user: null,
          isFetching: false,
          error: false,
        };
    default:
      return state;
  }
};

export default AuthReducer;
