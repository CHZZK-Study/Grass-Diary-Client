export const checkAuth = () => {
  const accessToken = localStorage.getItem('accessToken');
  return !!accessToken;
};
