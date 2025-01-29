import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
  const { isLoading, error, user, logout } = useAuth0();

  // Handle loading and provide a path for errors.
  if (isLoading || error) {
    return <div className='text-center p-4'>{isLoading ? 'Loading...' : `Oops... ${error.message}`}</div>;
  }

  // Destructure user properties for simplicity.
  const { picture, name, email } = user;

  // Logout function
  const handleLogout = () => logout({ returnTo: window.location.origin });

  return (
    <div className='profile-align'>
      <div className='profile-card'>
        <img src={picture} alt={name} className='profile-img' />
        <h2 className='text-2xl font-semibold mb-2'>{name}</h2>
        <p className='text-gray-700 mb-6'>{email}</p>
        <button onClick={handleLogout} className='profile-btn'>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <div>Redirecting you to the login page...</div>,
});
