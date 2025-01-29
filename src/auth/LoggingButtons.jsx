import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const LoggingButtons = () => {
  // Destructure auth methods and properties
  const {
    isAuthenticated,
    loginWithRedirect,
    logout,
  } = useAuth0();

  // Show log out only if user is authenticated
  const buttonText = isAuthenticated ? 'Log Out' : 'Log In';

  // Ensure proper log in/out functionality is followed if authenticated, or not.
  const handleLogging = () => {
    if (isAuthenticated) {
      logout({
        returnTo: window.location.origin
      })
    } else {
      loginWithRedirect()
    }
  };

  // a dynamic button with text and actions based on auth status.
  return (
    <button className='nav-btn  px-4 py-1' onClick={handleLogging}>
      {buttonText}
    </button>
  );
};
