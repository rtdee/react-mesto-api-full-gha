import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRouteElement ({ loggedIn, element }) {
  return (
    !loggedIn ? <Navigate to="/login" replace/> : element
)}

export default ProtectedRouteElement;