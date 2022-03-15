import React from 'react';
import Header from "./components/Header/Header";
import './styles/layout.scss';


const Layout = ({ children, contentHeading }) => (
    <>
      <Header />
      { contentHeading && (
          <>
            { contentHeading }
          </>
      )}
      <div className="main-content">
        {children}
      </div>
    </>
);

export default Layout;
