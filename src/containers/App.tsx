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
		background-color: rgb(255,254,250);
	}
	::-webkit-scrollbar {
	width: 15px;
	}
	::-webkit-scrollbar-thumb {
	background-color: #2374AB;
	border: 1px solid black;
	border-radius:2px;
	}
	::-webkit-scrollbar-track {
	background-color: rgb(255,254,250);
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
