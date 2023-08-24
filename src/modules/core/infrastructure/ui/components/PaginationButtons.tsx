
export default function PaginationButtons({count, page, setPage, next}: {count: number; page: number; setPage: Function; next: boolean;}) {
	
	return (
		count > 10 && (
			<div className="flex justify-evenly gap-2">
				<button
					className="disabled:cursor-not-allowed bg-blue-300 disabled:bg-gray-300 px-2 py-1 w-full rounded"
					disabled={page === 1}
					onClick={() => {
						setPage((prevPage: number) => prevPage - 1);
					}}
				>
					<i className="fa-solid fa-arrow-left"></i>
				</button>
				<button
					className="disabled:cursor-not-allowed bg-blue-300 disabled:bg-gray-300 px-2 py-1 w-full rounded"
					disabled={!next}
					onClick={() => {
						setPage((prevPage: number) => prevPage + 1);
					}}
				>
					<i className="fa-solid fa-arrow-right"></i>
				</button>
			</div>
		)
	);
}