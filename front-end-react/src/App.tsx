import React from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import { Layout } from "antd";
import Header from "./components/Layout/Header";

const App: React.FC = () => {
	return (
		<div className="App">
			<Layout>
				<Layout.Header>
					<Header />
				</Layout.Header>
				<Layout.Content>
					<Dashboard />
				</Layout.Content>
			</Layout>
		</div>
	);
};

export default App;
