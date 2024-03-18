const checkAuth = async () => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) return true;

  return false;
};

const clearAuth = () => {
  localStorage.removeItem('accessToken');
};

export { checkAuth, clearAuth };
