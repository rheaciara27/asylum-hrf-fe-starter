import Logo from '../../assets/logo.png';
import { LoggingButtons } from '../../auth/LoggingButtons.jsx';
import { NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export default function Header() {
  
  // Destructure isAuthenticated prop from Auth0
  const { isAuthenticated } = useAuth0();

  return (
    <header className='flex w-[100%] primary-c justify-between px-14'>
      <div className='flex justify-between'>
        <NavLink to='https://www.humanrightsfirst.org/'>
          <img className='w-[100px]' src={Logo} alt='HRF logo white' />
        </NavLink>
      </div>
      <div className='flex items-center py-4 gap-16'>
        <NavLink to='/' className='nav-btn'>
          Home
        </NavLink>
        <NavLink to='/graphs' className='nav-btn'>
          Graphs
        </NavLink>
        {/* Only show the Profile link if the user is authenticated. */}
        {isAuthenticated && (
          <NavLink to='/profile' className='nav-btn'>
            Profile
          </NavLink>
        )}
        <LoggingButtons />
      </div>
    </header>
  );
}
