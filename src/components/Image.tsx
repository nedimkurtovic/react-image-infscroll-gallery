import React from "react";
import { IImageProps } from "../interfaces";
import styled from "styled-components";

const StyledImage = styled.img<{ grayscale: boolean; blur: number }>`
	margin: 30px;
	height: auto;
	box-shadow: 10px 14px 20px 0px #1f1d1c;
	transition: transform 0.4s;
	filter: grayscale(${(props) => (props.grayscale ? "100%" : "0%")})
		blur(${(props) => props.blur && props.blur + "px"});
	&:hover {
		transform: scale(1.1);
	}
`;
export default function Image(props: IImageProps) {
	const ReduceSize: (src: string | undefined) => string = (
		src: string | undefined
	): string => {
		if (src === undefined) return "";
		let idPos = src.indexOf("id/") + 3;
		let last = src.indexOf("/", idPos);
		let substr = src.substring(0, last) + "/400/300";
		return substr;
	};
	return (
		<StyledImage
			ref={props.refcallback}
			blur={props.blurvalue}
			grayscale={props.grayscalevalue}
			src={ReduceSize(props.src)}
		/>
	);
}
