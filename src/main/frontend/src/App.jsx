import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import routes from "./routing/routes";
import './App.scss';
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import MainPage from "./pages/MainPage/MainPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import AllProjects from "./pages/AllProjects/AllProjects";
import AccountSettings from "./pages/AccountSettings/AccountSettings";
import AuthorityComponent
  from "./components/AuthorityComponent/AuthorityComponent";
import {LOGGED, NOT_LOGGED} from "./constants";
import AddNewProject from "./pages/AddNewProject/AddNewProject";
import EditProject from "./pages/EditProject/EditProject";
import Help from "./pages/Help/Help";

export default () => {
  return (
      <BrowserRouter>
        <div id="tp-frontend">
          <Routes>
            <Route exact path={routes.index} element={<MainPage />} />
            <Route exact path={routes.dashboard} element={<Dashboard />} />
            <Route exact path={routes.addproject} element={<AddNewProject />} />
            <Route exact path={routes.allprojects} element={<AllProjects />} />
            <Route exact path={routes.editproject} element={<EditProject />} />
            <Route exact path={routes.accountsettings} element={<AccountSettings />} />
            <Route exact path={routes.help} element={<Help />} />
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
