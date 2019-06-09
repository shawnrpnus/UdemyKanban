import React from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import { Layout } from "antd";
import Header from "./components/Layout/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddProject from "./components/Project/AddProject";

const App: React.FC = () => {
	return (
		<Router>
			<div className="App">
				<Layout>
					<Layout.Header>
						<Header />
					</Layout.Header>
					<Layout.Content>
						<Route exact path="/dashboard" component={Dashboard} />
						<Route exact path="/addProject" component={AddProject} />
					</Layout.Content>
				</Layout>
			</div>
		</Router>
	);
};

export default App;
