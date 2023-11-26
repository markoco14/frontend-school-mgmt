import { ReactNode } from "react";

const CardContainer = ({children}: {children: ReactNode}) => {
	return (
		<article className="p-4 border shadow rounded">
			{children}
		</article>
	)
}

export default CardContainer;