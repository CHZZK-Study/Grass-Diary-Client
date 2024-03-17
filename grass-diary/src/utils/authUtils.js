export const checkAuth = () => {
  const accessToken = localStorage.getItem('accessToken');
  return !!accessToken;
};

const clearAuth = () => {
  localStorage.removeItem('accessToken');
};

export { checkAuth, clearAuth };
