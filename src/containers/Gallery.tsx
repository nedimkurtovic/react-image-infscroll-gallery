import React from "react";
import { useState, useRef, useCallback } from "react";
import styled from "styled-components";
import Image from "../components/Image";
import { ControlsWrapper, ImageWrapper } from "./Gallery.styles";
import Controls from "../components/Controls";
import { CircularProgress } from "@material-ui/core";
import useGalleryHook from "./GalleryHook";
//import InfiniteScroll from "react-infinite-scroll-component";

const LoadingWrapper = styled.div`
	display: flex;
	justify-content: center;
	margin: 20px 0;
`;
const StyledH1 = styled.h1`
	display: flex;
	justify-content: center;
`;
/* 
=========This is solution number 2, scroll to the bottom for explanation ===========

const StyledInfiniteScroll = styled(InfiniteScroll)`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
`;
*/
export default function Gallery() {
	const [blur, setBlur] = useState<number>(0);
	const [grayscale, setGrayscale] = useState<boolean>(false);
	const [pageNumber, setPageNumber] = useState<number>(1);
	const { loading, images, canLoad } = useGalleryHook(pageNumber);

	const observer = useRef<IntersectionObserver>();
	const lastImageRef = useCallback(
		(img: HTMLImageElement) => {
			if (loading) {
				return;
			}

			if (observer.current) {
				observer.current.disconnect();
			}
			observer.current = new IntersectionObserver(
				(
					entry: IntersectionObserverEntry[],
					observer1: IntersectionObserver
				) => {
					if (entry[0].isIntersecting && canLoad) {
						setPageNumber((p) => p + 1);
					}
				},
				{ threshold: 0.1, rootMargin: "1000px" }
			);
			if (img) observer.current.observe(img);
		},
		[loading, canLoad]
	);

	const handleBlur: (event: object, val: number | number[]) => void = (
		ev: object,
		val: number | number[]
	) => {
		if (Array.isArray(val)) {
			setBlur(val[0]);
		} else {
			setBlur(val);
		}
	};

	const handleGrayscale: (
		event: React.ChangeEvent<HTMLInputElement>,
		checked: boolean
	) => void = (ev: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
		setGrayscale(checked);
	};

	let ImageList = images.map((x, index) => {
		if (images.length === index + 1) {
			return (
				<Image
					key={x.id}
					src={x.download_url}
					blurvalue={blur}
					grayscalevalue={grayscale}
					refcallback={lastImageRef}
				/>
			);
		}
		return (
			<Image
				key={x.id}
				src={x.download_url}
				blurvalue={blur}
				grayscalevalue={grayscale}
			/>
		);
	});

	/*
		List for solution number 2
	let ThirdPartyComponentList = images.map((x, index) => {
		return (
			<Image
				key={x.id}
				src={x.download_url}
				blurvalue={blur}
				grayscalevalue={grayscale}
			/>
		);
	});
	*/
	return (
		<>
			<ControlsWrapper>
				<Controls
					grayscale={grayscale}
					blurvalue={blur}
					handleBlur={handleBlur}
					handleGrayscale={handleGrayscale}
				/>
			</ControlsWrapper>
			{
				/* Solution number 1 */
				<ImageWrapper>{ImageList}</ImageWrapper>
			}

			{/* 
			=========This is solution number 2===========
				<StyledInfiniteScroll
				dataLength={Lista.length}
				next={() => setPageNumber((p) => p + 1)}
				loader={""}
				hasMore={true}
			>
				{ThirdPartyComponentList}
			</StyledInfiniteScroll> */}
			{loading && (
				<LoadingWrapper>
					<CircularProgress color="primary" />
				</LoadingWrapper>
			)}
			{!canLoad && images.length > 0 && (
				<StyledH1>You've seen it all!</StyledH1>
			)}
		</>
	);
}
/*
	 
	Solution number 2 has a problem that reports constantly an error to the console, i have looked up the problem 
	and saw that other people also had problems: https://github.com/ankeetmaini/react-infinite-scroll-component/issues/140 with
	this library.
	
	Both of the solutions are working, solution 1 is the default one that you will see when you run the application.
	If you wish to try out solution number 2, just uncomment the solution number 2 lines and comment the solution number 1.

*/
