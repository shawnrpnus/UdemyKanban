import React from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import { Layout } from "antd";
import Header from "./components/Layout/Header";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import AddProject from "./components/Project/AddProject";
import UpdateProject from "./components/Project/UpdateProject";
import { Provider } from "react-redux";
import store from "./store";
import ErrorPage from "./components/Layout/ErrorPage";
import ProjectBoard from "./components/ProjectBoard/ProjectBoard";
import UpdateProjectTask from "./components/ProjectBoard/ProjectTasks/UpdateProjectTask";
import AddProjectTask from "./components/ProjectBoard/ProjectTasks/AddProjectTask";

// Provider makes store available to child components that have been wrapped with the connect function
const App: React.FC = () => {
	return (
		<ErrorPage>
			<Provider store={store}>
				<Router>
					<div className="App">
						<Layout>
							<Layout.Header>
								<Header />
							</Layout.Header>
							<Layout.Content>
								<Switch>
									<Route exact path="/dashboard" component={Dashboard} />
									<Route exact path="/addProject" component={AddProject} />
									<Route
										exact
										path="/updateProject/:projectIdentifier"
										component={UpdateProject}
									/>
									<Route exact path="/projectBoard/:id" component={ProjectBoard} />
									<Route
										exact
										path="/updateProjectTask/:id"
										component={UpdateProjectTask}
									/>
									<Route exact path="/addProjectTask/:id" component={AddProjectTask} />
									<Route
										exact
										path="/updateProjectTask/:backlogId/:ptId"
										component={UpdateProjectTask}
									/>
									<Route render={() => <Redirect to={{ pathname: "/dashboard" }} />} />
								</Switch>
							</Layout.Content>
						</Layout>
					</div>
				</Router>
			</Provider>
		</ErrorPage>
	);
};

export default App;
