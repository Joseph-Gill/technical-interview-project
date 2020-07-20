import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../components/Pages/Home";
import ChallengeTitle from "../components/Pages/Challenge";
import Login from "../components/Pages/Authentication/Login";
import Registration from "../components/Pages/Authentication/Registration";
import ManageUsers from "../components/Pages/ManageUsers";
import ManageQuestions from "../components/Pages/ManageQuestions";
import StartChallenge from "../components/Pages/StartChallenge";
import FinishedChallenge from "../components/Pages/FinishedChallenge";
import Navigation from "../components/Shared/Navigation";
import Challenge from "../components/Pages/Challenge";
import MyChallenges from "../components/Pages/MyChallenges";
import AuthComponent from '../HOC';

const Routes = () => {
    return (
        <>
            <Router>
                <Switch>
                    <Navigation>
                        <Route exact path="/" component={AuthComponent(Home)}/>
                        <Route exact path="/login" component={Login}/>
                        <Route path="/verification/:userId" component={Registration}/>
                        <Route exact path="/mychallenges" component={AuthComponent(MyChallenges)}/>
                        <Route exact path="/startchallenge" component={AuthComponent(StartChallenge)}/>
                        <Route exact path="/challenge" component={AuthComponent(Challenge)}/>
                        <Route exact path="/finishedchallenge" component={AuthComponent(FinishedChallenge)}/>
                        <Route exact path="/manageusers" component={AuthComponent(ManageUsers)}/>
                        <Route exact path="/managequestions" component={AuthComponent(ManageQuestions)}/>
                    </Navigation>
                </Switch>
            </Router>
        </>
    );
};

export default Routes;