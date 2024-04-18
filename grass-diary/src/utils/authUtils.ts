type TCheckAuth = () => Promise<boolean>;

export const checkAuth: TCheckAuth = async () => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) return true;

  return false;
};
