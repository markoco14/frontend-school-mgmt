export default function CurriculumNav({tab, setTab}: {tab: number, setTab: Function}) {
	return (
		<nav className="flex gap-4 mb-6">
			<button
				className={`${tab === 1 ? "text-blue-500 underline underline-offset-2" : "text-gray-600"} text-lg hover:text-blue-700 ease-in-out duration-200`} 
				onClick={() => setTab(1)}
			>
				Subjects
			</button>
			<button
				className={`${tab === 2 ? "text-blue-500 underline underline-offset-2" : "text-gray-600"} text-lg hover:text-blue-700 ease-in-out duration-200`} 
				onClick={() => setTab(2)}
			>
				Levels
			</button>
			<button
				className={`${tab === 3 ? "text-blue-500 underline underline-offset-2" : "text-gray-600"} text-lg hover:text-blue-700 ease-in-out duration-200`} 
				onClick={() => setTab(3)}
			>
				Modules
			</button>
			<button
				className={`${tab === 4 ? "text-blue-500 underline underline-offset-2" : "text-gray-600"} text-lg hover:text-blue-700 ease-in-out duration-200`} 
				onClick={() => setTab(4)}
			>
				Module Types
			</button>
		</nav>
	);
}