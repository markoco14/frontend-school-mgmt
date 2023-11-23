export default function CurriculumNav({tab, setTab}: {tab: number, setTab: Function}) {
	return (
		<nav className="flex gap-4 mb-6 overflow-x-auto">
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
		</nav>
	);
}