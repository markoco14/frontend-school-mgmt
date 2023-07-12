import Layout from '@/src/modules/core/infrastructure/ui/components/Layout';
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { reportAdapter } from '@/src/modules/report-mgmt/infrastructure/adapters/reportAdapter';
import { Report } from '@/src/modules/report-mgmt/domain/entities/Report';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { classAdapter } from '@/src/modules/class-mgmt/infrastructure/adapters/classAdapter';
import { Class } from '@/src/modules/class-mgmt/domain/entities/Class';
import { format } from 'date-fns';
import { useRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps<{
  reports: Report[];
}> = async () => {
  // TODO: CHANGE THIS TO 
  // GET REPORTS AND THEIR ACCOMPANYING CLASS NAMES
  // THIS WAY GET THE REPORT STATUS
  // AND CAN RENDER DIFFERENT BUTTONS
  // BUT ALSO HAVE THE CLASS NAMES
  const reports = await reportAdapter.getReportsAll();

  return { props: { reports } };
};

export default function ReportsHome({
  reports,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [day, setDay] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [dates, setDates] = useState<string[]>(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
  const [classes, setClasses] = useState<Class[]>();
  useEffect(() => {
    async function getData() {
      await classAdapter.getClasses().then((res) => setClasses(res))
    }

    if (!day) {
      const date = new Date();
      setDay(dates[date.getDay()]);
      setDate(format(date, 'yyyy-MM-dd'))
    }
    
    getData();

  }, [day, dates])

  async function createReports(thisClass: Class, date: string) {
    // CHECK IF REPORT EXISTS
    const report = await reportAdapter.getReportByClassAndDate({class_id: thisClass.id, date: date}).then((res) => {
      // IF EXISTS, GO THERE
      if (res.id) {
        console.log('report exists, going now')
        console.log(res)
        router.push(`report-mgmt/${thisClass.id}/${date}/`)
      } 
      // IF NO REPORTS, CREATE AND GO
      else {
        console.log('report does not exist, creating now')
        reportAdapter.createReportForClassAndDate({class_id: thisClass.id, date: date}).then((res) => {
          console.log('report created, going now')
          console.log(res)
          router.push(`report-mgmt/${thisClass.id}/${date}/`)
        });

      }
    })
  }

  return (
    <Layout>
      <div>
        <h1 className="mb-4 p-4">Write daily reports here.</h1>
        <section className="bg-white p-4 rounded-lg">
          <h2 className='flex justify-between gap-4 items-baseline text-3xl mb-4'>Reports for {day} <span><input 
              type="date"
              className='mb-4 text-xl text-right'
              defaultValue={format(new Date, 'yyyy-MM-dd')}
              onChange={(e) => {
                const dateObject = new Date(e.target.value);
                const newDay = dates[dateObject.getDay()]
                setDay(newDay)
                setDate(format(dateObject, 'yyyy-MM-dd'))
              }}
            /></span></h2>
          <ul className="flex flex-col gap-2">
            {classes?.map((thisClass: Class, index: number) => (
              <li 
                key={index}
                className="p-2 rounded-md hover:bg-blue-200 flex justify-between"
              >
                <Link href={`/report-mgmt/${thisClass.id}/${date}`}>
                  {thisClass.name}
                </Link>
                <button
                  className='bg-blue-300 py-1 px-2 rounded'
                  onClick={() => {
                    createReports(thisClass, date);
                  }}
                >Write reports</button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Layout>
  )
}
