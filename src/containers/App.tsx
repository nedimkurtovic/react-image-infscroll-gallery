import React from "react";
import "./App.css";
import Gallery from "./Gallery";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
	*{
		box-sizing:border-box;
	}
	html,body{
		margin:0 auto;
		height:100%;
		width:100%;
	}
	body{
		background-color: #ffffff;
	}
	::-webkit-scrollbar {
	width: 5px;
	}
	::-webkit-scrollbar-thumb {
	background-color: #a9a9a9;
	border: 1px solid #a9a9a9;
	border-radius:2px;
	}
	::-webkit-scrollbar-track {
	background-color: #eee;
}
`;
function App() {
	return (
		<div className="App">
			<GlobalStyle />
			<Gallery />
		</div>
	);
}

export default App;
