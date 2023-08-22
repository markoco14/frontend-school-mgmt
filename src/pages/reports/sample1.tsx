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

	function checkIfSubject({this_subject}: {this_subject: string}) {
		return this_subject === subject
	}

	function checkIfLevel({this_level}: {this_level: number}) {
		return this_level === level
	}

	function checkIfUnit({this_unit}: {this_unit: number}) {
		return this_unit === unit
	}

	function checkIfDay({this_day}: {this_day: string | number}) {
		return this_day === day
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
						<Link 
							href="/"
							className='hover:underline hover:underline-offset-2 hover:text-blue-700'
						>
							Back
						</Link>
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
										onClick={() => {
											setSubject(this_subject)
											if (subject === 'Phonics' && (this_subject === 'Grammar' || this_subject === 'Reading')) {
												setLevel(5)
												setUnit(1)
												setDay(1)
											}
											
											if ((subject === 'Grammar' || subject === 'Reading') && this_subject === 'Phonics') {
												setLevel(1)
												setUnit(1)
												setDay(1)
											}
										}}
										className={`${checkIfSubject({this_subject: this_subject}) ? "bg-blue-500 text-white" : "bg-gray-100"} w-full py-2 text-center `}
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
									{upperLevels?.map((this_level, index) => (
										<li key={index}>
											<button 
												onClick={() => setLevel(this_level)}
												className={`${checkIfLevel({this_level: this_level}) ? "bg-blue-500 text-white" : "bg-gray-100"} w-full py-2 text-center `}
											>
												{this_level}
											</button>
										</li>
									))}
								</ul>
							) : (
								<ul className="grid grid-cols-4">
									{lowerLevels?.map((this_level, index) => (
										<li key={index}>
											<button 
												onClick={() => setLevel(this_level)}
												className={`${checkIfLevel({this_level: this_level}) ? "bg-blue-500 text-white" : "bg-gray-100"} w-full py-2 text-center `}
											>
												{this_level}
											</button>
										</li>
									))}
								</ul>
							)}
					</article>
					
					<article className="bg-blue-200 p-4 rounded mb-4">
						<p className="mb-2">Unit (Unit choices based on subject and level)</p>
						{((subject === 'Grammar' || subject || 'Reading') && level >= 5 && level <= 12) ? (
								<ul className="grid grid-cols-6">
									{upperUnits?.map((this_unit, index) => (
										<li key={index}>
											<button 
												onClick={() => setUnit(this_unit)}
												className={`${checkIfUnit({this_unit: this_unit}) ? "bg-blue-500 text-white" : "bg-gray-100"} w-full py-2 text-center `}
											>
												{this_unit}
											</button>
										</li>
									))}
								</ul>
							) : (
								<ul className="grid grid-cols-5">
									{lowerUnits?.map((this_unit, index) => (
										<li key={index}>
											<button 
												onClick={() => setUnit(this_unit)}
												className={`${checkIfUnit({this_unit: this_unit}) ? "bg-blue-500 text-white" : "bg-gray-100"} w-full py-2 text-center `}
											>
												{this_unit}
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
									{upperDays?.map((this_day, index) => (
										<li key={index}>
											<button 
												onClick={() => setDay(this_day)}
												className={`${checkIfDay({this_day: this_day}) ? "bg-blue-500 text-white" : "bg-gray-100"} w-full py-2 text-center `}
											>
												{this_day}
											</button>
										</li>
									))}
								</ul>
							) : (
								<ul className="grid grid-cols-5">
									{lowerDays?.map((this_day, index) => (
										<li key={index}>
											<button 
												onClick={() => setDay(this_day)}
												className={`${checkIfDay({this_day: this_day}) ? "bg-blue-500 text-white" : "bg-gray-100"} w-full py-2 text-center `}
											>
												{this_day}
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
