import React from "react";
import { Slider, Switch } from "@material-ui/core";
import { IControlProps } from "../interfaces";
import styled from "styled-components";

const ControlsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	width: 200px;
`;

const StyledSlider = styled(Slider)`
	margin-left: 10px !important;
`;

const StyledH2 = styled.h2`
	margin-bottom: 36px;
	color: #212529;
`;
const StyledSpan = styled.span`
	color: #6dd400;
	font-size: 1.5rem;
`;
export default function Controls(props: IControlProps) {
	return (
		<>
			<ControlsWrapper>
				<StyledH2>
					<StyledSpan>#</StyledSpan>
					<span>Blur intensity</span>
				</StyledH2>
				<StyledSlider
					min={0}
					max={15}
					defaultValue={0}
					value={props.blurvalue}
					onChange={props.handleBlur}
					valueLabelDisplay="auto"
				/>
			</ControlsWrapper>
			<ControlsWrapper>
				<StyledH2>
					<StyledSpan>#</StyledSpan>
					<span>Grayscale</span>
				</StyledH2>
				<Switch value={props.grayscale} onChange={props.handleGrayscale} />
			</ControlsWrapper>
		</>
	);
}
