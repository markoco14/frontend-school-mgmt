import { Level } from "@/src/modules/curriculum/domain/entities/Level";

export default function LevelSection({levels, handleDeleteLevel}: {levels: Level[], handleDeleteLevel: Function}) {
  
  
  return (
		<div className="mb-4 xs:mb-0">
			<h2 className="text-3xl mb-2">Levels</h2>
			<ul className="bg-gray-100 rounded shadow-inner mb-4">
				{levels?.map((level, index) => (
					<li 
						key={index}
						className="p-2 hover:bg-gray-300 flex justify-between"
					>
						<span>{level.name}</span>
						<button 
							onClick={async() => {
								handleDeleteLevel(level.id);
							}}
						>
							delete
						</button>
					</li>
				))}
			</ul>
		</div>
  );
}
