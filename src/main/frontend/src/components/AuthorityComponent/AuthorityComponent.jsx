import React from 'react';

const AuthorityComponent = ({roles, children}) => {

  const role = localStorage.getItem("role");
  const isAllowed = roles.includes(role);

  if(isAllowed || (roles.includes(" ") && role === null)) {
    return(
        <>
          {children}
        </>
    )
  }
  return ( //neopravnenemu pouzivatelovi sa nic nezobrazi
      <></>
  )
};
export default AuthorityComponent;