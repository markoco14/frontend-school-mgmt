import AuthContext from "@/src/AuthContext";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import PermissionDenied from "@/src/modules/core/infrastructure/ui/components/PermissionDenied";
import Link from "next/link";
import { useContext, useState } from "react";


export default function ReportsHome() {
  const { user } = useContext(AuthContext);
	const [subject, setSubject] = useState<string>('Grammar')
	const [level, setLevel] = useState<number>(5)
	const [unit, setUnit] = useState<number>(1)
	const [day, setDay] = useState<string | number>(1)

	const date = new Date();

	const subjects = ['Grammar', 'Reading', 'Phonics']

	const upperLevels = [5, 6, 7, 8, 9, 10, 11, 12]
	const lowerLevels = [1, 2, 3, 4]

	const upperDays = [1, 2, 'Review']
	const lowerDays = [1, 2, 3, 4, 'Review']

	const upperUnits = [1, 2, 3, 4, 5, 6];
	const lowerUnits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  if (user?.role !== "OWNER") {
    return (
      <Layout>
        <PermissionDenied />
      </Layout>
    )
  }

	function checkIfSubject({subject}: {subject: string}) {
		console.log(subject)
		console.log(subjects.find((current_subject) => current_subject === subject))
		return subjects.find((current_subject) => current_subject === subject)
	}

  return (
     <Layout>
      <div>
        <section>
          <div className="flex justify-between items-baseline mb-4">
            <h2 >
              <span className="text-lg text-gray-500">{date.toDateString()}</span> <br></br> 
              {/* <span className="text-3xl">{date}</span> */}
            </h2>
            {user?.role === 'OWNER' ? (
              <Link 
                href="/reports/"
                className='hover:underline hover:underline-offset-2 hover:text-blue-700'
              >
                Reports
              </Link>
            ) : (
              <Link 
                href="/"
                className='hover:underline hover:underline-offset-2 hover:text-blue-700'
              >
                Back
              </Link>
            )}
          </div>
        </section>
				<section>
					<h2 className="text-3xl mb-4">Level 9 Monday/Thursday</h2>
					<article className="bg-blue-200 p-4 rounded mb-4">
						<p className="mb-2">Subject</p>
						<ul className="grid grid-cols-3">
							{subjects?.map((this_subject, index) => (
								<li key={index}>
									<button 
										onClick={() => setSubject(this_subject)}
										className={`${this_subject === subject ? "bg-blue-500 text-white" : "bg-gray-100"} w-full py-2 text-center `}
									>
										{this_subject}
									</button>
								</li>
							))}
						</ul>
					</article>
					<article className="bg-blue-200 p-4 rounded mb-4">
						<p className="mb-2">Level (Level choices based on subject)</p>
							{(subject === 'Grammar' || subject === 'Reading') ? (
								<ul className="grid grid-cols-6">
									{upperLevels?.map((upperLevel, index) => (
										<li key={index}>
											<button 
												onClick={() => setLevel(upperLevel)}
												className={`${upperLevel === level ? "bg-blue-500 text-white" : "bg-gray-100"} w-full py-2 text-center `}
											>
												{upperLevel}
											</button>
										</li>
									))}
								</ul>
							) : (
								<ul className="grid grid-cols-4">
									{lowerLevels?.map((lowerLevel, index) => (
										<li key={index}>
											<button 
												onClick={() => setLevel(lowerLevel)}
												className={`${lowerLevel === level ? "bg-blue-500 text-white" : "bg-gray-100"} w-full py-2 text-center `}
											>
												{lowerLevel}
											</button>
										</li>
									))}
								</ul>
							)}
					</article>
					
					<article className="bg-blue-200 p-4 rounded mb-4">
						<p className="mb-2">Unit (Unit choices based on subject and level)</p>
						{(level >= 5 && level <= 12) ? (
								<ul className="grid grid-cols-6">
									{upperUnits?.map((upperUnit, index) => (
										<li key={index}>
											<button 
												onClick={() => setUnit(upperUnit)}
												className={`${upperUnit === unit ? "bg-blue-500 text-white" : "bg-gray-100"} w-full py-2 text-center `}
											>
												{upperUnit}
											</button>
										</li>
									))}
								</ul>
							) : (
								<ul className="grid grid-cols-5">
									{lowerUnits?.map((lowerUnit, index) => (
										<li key={index}>
											<button 
												onClick={() => setUnit(lowerUnit)}
												className={`${lowerUnit === unit ? "bg-blue-500 text-white" : "bg-gray-100"} w-full py-2 text-center `}
											>
												{lowerUnit}
											</button>
										</li>
									))}
								</ul>
							)}
					</article>
					<article className="bg-blue-200 p-4 rounded mb-4">
						<p className="mb-2">Day (Day choices based on subject)</p>
						{(subject === 'Grammar' || subject === 'Reading') ? (
								<ul className="grid grid-cols-4">
									{upperDays?.map((upperDay, index) => (
										<li key={index}>
											<button 
												onClick={() => setDay(upperDay)}
												className={`${upperDay === day ? "bg-blue-500 text-white" : "bg-gray-100"} w-full py-2 text-center `}
											>
												{upperDay}
											</button>
										</li>
									))}
								</ul>
							) : (
								<ul className="grid grid-cols-5">
									{lowerDays?.map((lowerDay, index) => (
										<li key={index}>
											<button 
												onClick={() => setDay(lowerDay)}
												className={`${lowerDay === day ? "bg-blue-500 text-white" : "bg-gray-100"} w-full py-2 text-center `}
											>
												{lowerDay}
											</button>
										</li>
									))}
								</ul>
							)}
					</article>
				</section>
      </div>
    </Layout>
  );
}
