import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import routes from "./routing/routes";
import './App.scss';
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import MainPage from "./pages/MainPage/MainPage";
import AuthorityComponent
  from "./components/AuthorityComponent/AuthorityComponent";
import {LOGGED, NOT_LOGGED} from "./constants";

export default () => {
  return (
      <BrowserRouter>
        <div id="tp-frontend">
          <Routes>
            <Route exact path={routes.index} element={<MainPage />} />
            <Route exact path={routes.login} element={<>
              <AuthorityComponent
                roles={NOT_LOGGED}><LoginPage />
              </AuthorityComponent>
              <AuthorityComponent
                  roles={LOGGED}><MainPage />
              </AuthorityComponent></>} />
            <Route exact path={routes.registration} element={
              <>
                <AuthorityComponent roles={NOT_LOGGED}>
                  <RegistrationPage />
                </AuthorityComponent>
                <AuthorityComponent roles={LOGGED}>
                  <MainPage />
                </AuthorityComponent>
            </>
            } />
            </Routes>
        </div>
      </BrowserRouter>
  );
};
