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
import NewUser from "./containers/NewUser";
import CodeGenerator from "./containers/CodeGenerator";
import CodeReader from "./containers/CodeReader";
import Permissions from "./containers/Permissions";
import NewPermission from "./containers/NewPermission";
import UpdatePermission from "./containers/UpdatePermission";

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <AppliedRoute path="/users" exact component={Users} props={childProps} />
    <AppliedRoute path="/permissions" exact component={Permissions} props={childProps} />

    <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
    <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />
    <AuthenticatedRoute path="/notes/new" exact component={NewNote} props={childProps} />
    <AuthenticatedRoute path="/notes/:id" exact component={Notes} props={childProps} />
    <AuthenticatedRoute path="/qrcode-generator" exact component={CodeGenerator} props={childProps} />
    <AuthenticatedRoute path="/qrcode-reader" exact component={CodeReader} props={childProps} />
    <AuthenticatedRoute path="/users/new" exact component={NewUser} props={childProps} />
    <AuthenticatedRoute path="/users/:id" exact component={Users} props={childProps} />
    <AuthenticatedRoute path="/permissions/new" exact component={NewPermission} props={childProps} />
    <AuthenticatedRoute path="/permissions/:id" exact component={UpdatePermission} props={childProps} />

    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;
