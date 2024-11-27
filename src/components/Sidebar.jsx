import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext';
import useConfirmation from '../utils/useConfirmation';
import logo from '../assets/image/logo.png';

const Sidebar = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const { confirm, ConfirmationDialog } = useConfirmation();

  const handleLogout = async () => {

    const isConfirmed = await confirm('Anda yakin akan keluar?');
    if (isConfirmed) {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
    }

  };

  return (
    <div className="sidebar bg-white border-end vh-100 d-flex flex-column align-items-center">
      <img src={logo} alt="" height={71} className='m-3'/>
      <ul className="nav sidebar-menu border-top w-100 flex-column flex-grow-1 align-items-start">
        <li className="nav-item">
          <NavLink to="/document" className="nav-link border-bottom"><i className="bi bi-inboxes"></i>Arsip</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/category" className="nav-link border-bottom"><i className="bi bi-tags"></i>Kategori</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/about" className="nav-link border-bottom"><i className="bi bi-info-circle"></i>About</NavLink>
        </li>
        <li className="nav-item mt-auto">
          <button className="btn btn-logout nav-link d-flex rounded-0 border-top" onClick={handleLogout}><i className="bi bi-box-arrow-left"></i>Keluar</button>
        </li>
      </ul>

      <ConfirmationDialog />
    </div>
  );
};

export default Sidebar;
