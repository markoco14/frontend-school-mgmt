import { Level } from "@/src/modules/curriculum/entities/Level";
import ListContainer from "../../core/components/ListContainer";

export default function LevelList({levels}: {levels: Level[]}) {
  
  
  return (
		<div className="mb-4 xs:mb-0">
			<h2 className="text-3xl mb-2">Levels</h2>
			<ListContainer>
				{levels?.length >= 1 ? levels?.map((level, index) => (
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
				)) : (
					<article className="bg-gray-100 rounded shadow-inner mb-4">
						<p>This page is empty.</p>
					</article>
				)}
			</ListContainer>
		</div>
  );
}
