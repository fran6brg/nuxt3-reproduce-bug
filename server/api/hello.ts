import { useQuery } from "h3";

export default (req: any) => {
	const { name } = useQuery(req);
	return {
		data: `Hello ${name}`,
	};
};
