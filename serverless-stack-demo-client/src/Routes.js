import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

import Home from "./containers/Home";
import Login from "./containers/Login";
import Notes from "./containers/Notes";
import Signup from "./containers/Signup";
import NewNote from "./containers/NewNote";
import NotFound from "./containers/NotFound";

/* import AddUserPermission from "./containers/AddUserPermission";*/
import Users from "./containers/Users";
import CodeGenerator from "./containers/CodeGenerator";
import CodeReader from "./containers/CodeReader";

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <AppliedRoute path="/users" exact component={Users} props={childProps} />

    <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
    <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />
    <AuthenticatedRoute path="/notes/new" exact component={NewNote} props={childProps} />
    <AuthenticatedRoute path="/notes/:id" exact component={Notes} props={childProps} />
    <AuthenticatedRoute path="/qrcode-generator" exact component={CodeGenerator} props={childProps} />
    <AuthenticatedRoute path="/qrcode-reader" exact component={CodeReader} props={childProps} />
    <AuthenticatedRoute path="/users/:id" exact component={Users} props={childProps} />
    <AuthenticatedRoute path="/permissions" exact component={Permissions} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;
