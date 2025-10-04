import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const CommonProtectedRoute = ({ children }) => {
  const { user, isLoggedin, isLoading } = useSelector((state) => state.auth);


   if (isLoading) return <p>Loading....</p>;
   
  if ((user && isLoggedin) ) {
    return children;
  }

  return <Navigate to="/login" replace />;
};

export default CommonProtectedRoute;
