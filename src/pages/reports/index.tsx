import AuthContext from "@/src/AuthContext";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import PermissionDenied from "@/src/modules/core/infrastructure/ui/components/PermissionDenied";
import SchoolHeader from "@/src/modules/core/infrastructure/ui/components/SchoolHeader";
import Image from "next/image";
import { useContext } from "react";


export default function ReportsHome() {
  const { user } = useContext(AuthContext);

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

  if (user?.role !== "OWNER") {
    return (
      <Layout>
        <PermissionDenied />
      </Layout>
    )
  }
  return (
    <Layout>
      <div>
        <section>
          <SchoolHeader />
          <article>
            <h2 className="text-3xl">Reports</h2>
            <table className="w-full bg-gray-100">
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                  <th>Complete?</th>
                </tr>
              </thead>
              <tbody className="rounded">
                {reports?.map((report, index) => (
                  <tr key={index} className="rounded bg-white">
                    <td className="relative flex justify-center">
                      <Image 
                        src={report.teacher.photo_url}
                        alt='An image of a teacher'
                        width={50}
                        height={50}
                        // fill={true}
                        // sizes="(max-width: 768px) 20vw, (max-width: 1200px) 10vw"
                        style={{ objectFit: 'cover' }}
                        className="rounded-full"
                      />
                    </td>
                  <td className="text-left">
                    {report.class} - {report.teacher.first_name}
                  </td>
                  <td className={`${report.is_complete ? 'border border-green-500 bg-green-100' : 'border border-red-500 bg-red-100'} rounded text-center`}>
                    {report.is_complete ? <i className="fa-solid fa-check text-green-500"></i> : <i className="fa-solid fa-xmark text-red-500"></i>}
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </article>
          <article className="w-1/2">
            <ul>
              {reports?.map((report, index) => (
                <li key={index} className="grid grid-cols-4 gap-2 items-center">
                  <div className="relative col-span-1 flex justify-center">
                    <Image 
                      src={report.teacher.photo_url}
                      alt='An image of a teacher'
                      width={50}
                      height={50}
                      // fill={true}
                      // sizes="(max-width: 768px) 20vw, (max-width: 1200px) 10vw"
                      style={{ objectFit: 'cover' }}
                      className="rounded-full"
                    />
                  </div>
                  <div className="grid grid-cols-3 col-span-3">
                    <p>{report.teacher.first_name}</p>
                    <p>{report.is_complete ? <i className="fa-solid fa-check text-green-500"></i> : <i className="fa-solid fa-xmark text-red-500"></i>}</p>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        </section>
      </div>
    </Layout>
  );
}
