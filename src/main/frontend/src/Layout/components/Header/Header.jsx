import React from 'react';
import {useLocation, useNavigate} from 'react-router';
import { Link } from 'react-router-dom';
import './header.scss';
import routes from "../../../routing/routes";
import AuthorityComponent
  from "../../../components/AuthorityComponent/AuthorityComponent";
import {LOGGED, NOT_LOGGED} from "../../../constants";


const pathEqualsOrStartsWith = (path, routesToMatch) => routesToMatch.some(route => {
  const isEqual = path === route;
  const startsWith = route !== routes.index && path.startsWith(`${route}/`);

  return isEqual || startsWith;
});

const getClassName = (path, routesToMatch) => (
  pathEqualsOrStartsWith(path, routesToMatch)
    ? 'primary-navigation-item primary-navigation-item-active'
    : 'primary-navigation-item');

const Header = () => {
  const { pathname: path } = useLocation();
  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate(routes.index);
  }

  return (
    <header className="header">
      <Link to={routes.index}><h1 className="header-heading">Team project</h1></Link>
      <nav className="primary-navigation">
        <Link
          className={getClassName(path, [routes.index])}
          to={routes.index}
        >
          Hlavná stránka
        </Link>
        <AuthorityComponent roles={NOT_LOGGED}>
          <Link className={getClassName(path, [routes.login])} to={routes.login}>Prihlásenie</Link>
          <Link className={getClassName(path, [routes.registration])} to={routes.registration}>Registrácia</Link>
        </AuthorityComponent>
        <AuthorityComponent roles={LOGGED}>
          <Link className="primary-navigation-item" onClick={logout} to={routes.index}>Odhlásiť sa</Link>
        </AuthorityComponent>

      </nav>
    </header>
  );
};

export default Header;
