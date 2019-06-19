import React from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import { Layout } from "antd";
import Header from "./components/Layout/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddProject from "./components/Project/AddProject";
import UpdateProject from "./components/Project/UpdateProject";
import { Provider } from "react-redux";
import store from "./store";
import ErrorPage from "./components/Layout/ErrorPage";

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
								<Route exact path="/dashboard" component={Dashboard} />
								<Route exact path="/addProject" component={AddProject} />
								<Route
									exact
									path="/updateProject/:projectIdentifier"
									component={UpdateProject}
								/>
							</Layout.Content>
						</Layout>
					</div>
				</Router>
			</Provider>
		</ErrorPage>
	);
};

export default App;
