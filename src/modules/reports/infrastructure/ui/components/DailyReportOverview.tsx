import Image from "next/image";

export default function DailyReportOverview({date}: {date: Date}) {
  const reports = [
		{
      id: 1,
      class: 'Level 9',
      teacher: {
        first_name: 'Mark',
        last_name: 'Chen',
        photo_url: 'https://storage.googleapis.com/twle-445f4.appspot.com/images/mark.png',
        },
      is_complete: true,
      school_id: 1,
		},
		{
      id: 2,
      class: 'Level 7',
      teacher: {
        first_name: 'Mario',
        last_name: 'Chen',
        photo_url: 'https://storage.googleapis.com/twle-445f4.appspot.com/images/mario.png',
        },
      is_complete: true,
      school_id: 1,
		},
		{
      id: 3,
      class: 'Level 3',
      teacher: {
        first_name: 'Andrew',
        last_name: 'Chen',
        photo_url: 'https://storage.googleapis.com/twle-445f4.appspot.com/images/andrew.png',
        },
      is_complete: true,
      school_id: 1,
		},
		{
      id: 4,
      class: 'Level 11',
      teacher: {
        first_name: 'Jacob',
        last_name: 'Chen',
        photo_url: 'https://storage.googleapis.com/twle-445f4.appspot.com/images/jacob.png',
        },
      is_complete: false,
      school_id: 1,
		},
		{
      id: 5,
      class: 'Level 8',
      teacher: {
        first_name: 'Mark',
        last_name: 'Chen',
        photo_url: 'https://storage.googleapis.com/twle-445f4.appspot.com/images/mark.png',
        },
      is_complete: true,
      school_id: 1,
		},
		{
      id: 6,
      class: 'Level 10',
      teacher: {
        first_name: 'Mario',
        last_name: 'Chen',
        photo_url: 'https://storage.googleapis.com/twle-445f4.appspot.com/images/mario.png',
        },
      is_complete: true,
      school_id: 1,
		},
		{
      id: 7,
      class: 'Level 2',
      teacher: {
        first_name: 'Andrew',
        last_name: 'Chen',
        photo_url: 'https://storage.googleapis.com/twle-445f4.appspot.com/images/andrew.png',
        },
      is_complete: false,
      school_id: 1,
		},
		{
      id: 8,
      class: 'Level 7',
      teacher: {
        first_name: 'Jacob',
        last_name: 'Chen',
        photo_url: 'https://storage.googleapis.com/twle-445f4.appspot.com/images/jacob.png',
        },
      is_complete: true,
      school_id: 1,
		}
	]

  return (
    <section>
      <article>
        <h2 className="text-lg text-gray-600">Report Status</h2>
        <p className="text-2xl">{date.toDateString()}</p>
        <table className="w-full">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th className="rounded-t-lg bg-gray-300">Complete?</th>
            </tr>
          </thead>
          <tbody className="rounded">
            {reports?.map((report, index) => (
              <tr
                key={index}
                className={`${
                  report.is_complete
                    ? "bg-green-100 hover:bg-green-300"
                    : "bg-red-100 hover:bg-red-300"
                } rounded py-1`}
              >
                <td className="relative flex justify-center py-1">
                  <Image
                    src={report.teacher.photo_url}
                    alt="An image of a teacher"
                    width={50}
                    height={50}
                    style={{ objectFit: "cover" }}
                    className="rounded-full"
                  />
                </td>
                <td className="py-1 text-left">
                  {report.class} - {report.teacher.first_name}
                </td>
                <td className="py-1 text-center">
                  {report.is_complete ? (
                    <i className="fa-solid fa-check text-green-500"></i>
                  ) : (
                    <i className="fa-solid fa-xmark text-red-500"></i>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
      <article>
        <h2 className="text-lg text-gray-600">Report Status</h2>
        <p className="text-2xl">{date.toDateString()}</p>
        <ul className="grid gap-2">
          {reports?.map((report, index) => (
            <li
              key={index}
              className={`${
                report.is_complete ? "bg-green-100" : "bg-red-100"
              } grid grid-cols-4 items-center gap-2 rounded px-2 py-1 `}
            >
              <div className="relative col-span-1 flex justify-center">
                <Image
                  src={report.teacher.photo_url}
                  alt="An image of a teacher"
                  width={50}
                  height={50}
                  style={{ objectFit: "cover" }}
                  className="rounded-full"
                />
              </div>
              <div
                className={`col-span-3 flex justify-between rounded text-center`}
              >
                <p>
                  {report.class} - {report.teacher.first_name}
                </p>
                <p>
                  {report.is_complete ? (
                    <i className="fa-solid fa-check text-green-500"></i>
                  ) : (
                    <i className="fa-solid fa-xmark text-red-500"></i>
                  )}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
