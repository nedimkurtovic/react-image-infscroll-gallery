import { useState, useEffect } from "react";
import { IQuery, IApiObject, IImageApiObject } from "../interfaces";
import { GetImages } from "../api/api";

interface ReturnObject {
	loading: boolean;
	images: IImageApiObject[];
	canLoad: boolean;
}

export default function useGalleryHook(pageNumber: number): ReturnObject {
	const [loading, setLoading] = useState<boolean>(true);
	const [images, setImages] = useState<IImageApiObject[]>([]);
	const [canLoad, setcanLoad] = useState<boolean>(false);

	useEffect(() => {
		const apiCall = async () => {
			setLoading(true);
			let q: IQuery = { page: pageNumber, limit: 30 };
			let result: IApiObject = await GetImages(q);
			setImages((imgs) => [...imgs, ...result.data]);
			setcanLoad(result.hasMore);
			setLoading(false);
		};
		apiCall();
	}, [pageNumber]);

	return {
		loading: loading,
		images: images,
		canLoad: canLoad,
	};
}
