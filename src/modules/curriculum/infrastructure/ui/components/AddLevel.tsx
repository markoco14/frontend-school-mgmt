import { Dialog, Transition } from "@headlessui/react";
import AddLevelForm from "./AddLevelForm";
import { useState } from "react";

export default function AddLevel({page, setNext, setLevels}: {page: number; setNext: Function; setLevels: Function;}) {
	  const [ isAddLevel, setIsAddLevel ] = useState<boolean>(false);

	
	return (
		<>
			<button
				className="bg-blue-300 text-blue-900 hover:bg-blue-500 hover:text-white px-4 py-1 rounded"
				onClick={() => setIsAddLevel(true)}
			>Add Level</button>
			<Transition
				show={isAddLevel}
				enter="transition ease-in duration-100"
				enterFrom="transform opacity-0 scale-90"
				enterTo="opacity-100 scale-100"
				leave="transition ease-out duration-150"
				leaveFrom="opacity-100 scale-100"
				leaveTo="opacity-0 scale-90"
			>
				<Dialog
					onClose={() => setIsAddLevel(false)}
					className="fixed inset-0 flex items-center justify-center"
				>
					<div className="fixed inset-0 bg-blue-900/25" />
					<Dialog.Panel className="bg-white rounded-2xl shadow-xl p-8 z-10">
						<Dialog.Title>Add Level</Dialog.Title>
						<AddLevelForm setNext={setNext} page={page} setLevels={setLevels}/>
						<div className="flex justify-end">
							<button
								type="button"
								onClick={() => setIsAddLevel(false)}
								className="bg-gray-300 text-gray-900 hover:bg-gray-500 hover:text-white px-4 py-1 rounded"
							>
								Cancel
							</button>
						</div>
					</Dialog.Panel>
				</Dialog>
			</Transition>
		</>
	)
}