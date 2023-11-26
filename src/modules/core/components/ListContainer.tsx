import { ReactNode } from "react"

const ListContainer = ({children}: {children: ReactNode}) => {
	return(
		<ul className="flex flex-col divide-y">
			{children}
		</ul>
	)
}

export default ListContainer;