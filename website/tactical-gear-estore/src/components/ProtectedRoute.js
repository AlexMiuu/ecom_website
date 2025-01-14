// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ isAllowed, redirectPath = '/', children }) => {
  console.log('ProtectedRoute - isAllowed:', isAllowed);

  if (!isAllowed) {
    console.log('ProtectedRoute - Redirecting to:', redirectPath);
    return <Navigate to={redirectPath} replace />;
  }

  console.log('ProtectedRoute - Rendering children.');
  return children;
};

ProtectedRoute.propTypes = {
  isAllowed: PropTypes.bool.isRequired,
  redirectPath: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
