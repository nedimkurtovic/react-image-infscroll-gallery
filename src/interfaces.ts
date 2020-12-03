export interface IQuery {
	page: number;
	limit: number;
}

export interface IImageApiObject {
	id: number;
	author: string;
	width: number;
	height: number;
	url: string;
	download_url: string;
}

export interface IApiObject {
	data: IImageApiObject[];
	hasMore: boolean;
}
export interface IImageProps {
	src?: string;
	grayscalevalue: boolean;
	blurvalue: number;
	refcallback?: any;
}

export interface IControlProps {
	handleGrayscale: (
		event: React.ChangeEvent<HTMLInputElement>,
		checked: boolean
	) => void;
	handleBlur: (event: object, val: number | number[]) => void;
	grayscale: boolean;
	blurvalue: number;
}
