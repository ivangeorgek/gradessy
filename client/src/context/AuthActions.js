export const LoginStart = (userCredentials) => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const LoginFailure = () => ({
  type: "LOGIN_FAILURE",
});

export const Connect = (userId) => ({
  type: "CONNECT",
  payload: userId,
});

export const Disconnect = (userId) => ({
  type: "DISCONNECT",
  payload: userId,
});

export const Logout = () => ({
  type: "LOGOUT",
});
