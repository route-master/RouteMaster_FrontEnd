import React from 'react';
import { Outlet } from 'react-router-dom';
import MainHeader from '../MainHeader/MainHeader';

function Layout() {
  return (
    <div style={{width: '80%'}}>
      <header>
        <MainHeader />
      </header>
      <main>
        <Outlet />
      </main>
      <footer style={{ height: '100px', backgroundColor: 'grey' }}>Footer</footer>
    </div>
  );
}

export default Layout;
