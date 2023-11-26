import { Test } from "../entities/Test";

const TestStartDetails = ({test}: {test: Test}) => {
	let mistakeString = ''

	for (let i = 0; i <= test.maxCorrections; i++) {
		// Skip 0 mistakes if 0 mistakes not allowed
		if (!test.allowNoCorrections && i === 0) {
			continue
		}
		mistakeString += `${i}-`
	}


	return(
		<div className="text-center grid gap-8">
			<p className="text-8xl mb-16">{test.name}</p>
			<p className="text-5xl">Correct any mistakes in the following sentences.</p>
			<p className="text-8xl text-red-700">{mistakeString}X</p>
		</div>
	)
};

export default TestStartDetails;