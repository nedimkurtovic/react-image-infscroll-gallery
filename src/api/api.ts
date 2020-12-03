import axios from "axios";
import { IQuery, IImageApiObject, IApiObject } from "../interfaces";

const endpoint: string = "https://picsum.photos/";

export async function GetImages(qdata: IQuery | null): Promise<IApiObject> {
	let url = endpoint + "v2/list";
	if (qdata !== null) {
		url += "?page=" + qdata.page;
		url += "&limit=" + qdata.limit;
	}

	return await axios
		.get<IImageApiObject[]>(url)
		.then((response: any) => {
			let loadMore: boolean = true;
			let header: string = response.headers["link"];
			let arr: string[] = header.split(", ");
			if (arr.length === 1 && arr[0].indexOf('rel="next"') === -1)
				loadMore = false;
			return { data: response.data, hasMore: loadMore };
		})
		.catch((error: any) => {
			console.log(error);
			return { data: [], hasMore: false };
		});
}
