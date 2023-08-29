import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";

export default function Modal({show, close, title, children}: {show: boolean, close: Function, title: string, children: ReactNode}) {
  
  return (
    <Transition
			appear={true}
			show={show}
		>
			<Dialog
				onClose={() => close(false)}
				className="fixed top-0 left-0 w-screen sm:inset-0 sm:top-8 sm:w-full flex items-center justify-center"
			>	
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-blue-900 bg-opacity-50" />
				</Transition.Child>
				<Transition.Child
					as={Fragment}
					enter="transition-opacity transition-scale ease-in duration-500"
					enterFrom="opacity-0 scale-90"
					enterTo="opacity-100 scale-100"
					leave="transition-opacity transition-scale ease-out duration-150"
					leaveFrom="opacity-100 scale-100"
					leaveTo="opacity-0"
				>
					<Dialog.Panel className="bg-white rounded-2xl shadow-xl p-8 z-10">
						<Dialog.Title>{title}</Dialog.Title>
						{children}
						<div className="flex justify-end">
							<button
								type="button"
								onClick={() => close(false)}
								className="bg-gray-300 text-gray-900 hover:bg-gray-500 hover:text-white px-4 py-1 rounded"
							>
								Cancel
							</button>
						</div>
					</Dialog.Panel>
				</Transition.Child>
			</Dialog>
		</Transition>
  );
}
