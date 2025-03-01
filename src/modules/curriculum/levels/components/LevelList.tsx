import { Level } from "@/src/modules/curriculum/levels/entities/Level";
import ListContainer from "@/src/modules/core/components/ListContainer";

export default function LevelList({ levels }: { levels: Level[] }) {
	return (
		<ListContainer>
			{levels?.map((level, index) => (
				<li
					key={index}
					className="p-2 hover:bg-gray-300 flex justify-between"
				>
					<span>{level.name}</span>
					{/* <button 
							onClick={async() => {
								handleDeleteLevel(level.id);
							}}
						>
							delete
						</button> */}
				</li>
			))}
		</ListContainer>

	);
}
