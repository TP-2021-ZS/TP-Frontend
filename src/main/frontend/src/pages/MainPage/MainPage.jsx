import React from "react";
import "./mainPage.scss";
import Layout from "../../Layout";
import AuthorityComponent
  from "../../components/AuthorityComponent/AuthorityComponent";
import {LOGGED, NOT_LOGGED} from "../../constants";

const MainPage = () => (
      <Layout>
        <div className="main-page">
          <div className="content-container">
            <h2 className="form-header row-centered">Hlavná stránka</h2>
            <AuthorityComponent roles={LOGGED}>
              <div className="row-centered">
                <p>Vitaj {localStorage.getItem("username")}! :) Tvoj email
                  je {localStorage.getItem("email")} a tvoja rola v aplikácií
                  je: {localStorage.getItem("role")}</p>
              </div>
            </AuthorityComponent>
            <AuthorityComponent roles={NOT_LOGGED}>
              <div className="row-centered">
                <p>Nezabudni sa prihlásiť :)</p>
              </div>
            </AuthorityComponent>
          </div>
        </div>
      </Layout>
  );

export default MainPage;