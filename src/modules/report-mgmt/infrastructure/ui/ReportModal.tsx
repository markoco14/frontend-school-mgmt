import { Student } from "@/src/modules/student-mgmt/domain/entities/Student";
import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useEffect, useState,  } from "react"
import { reportAdapter } from "../adapters/reportAdapter";
import { Report } from "../../domain/entities/Report";
import { toast } from "react-hot-toast";

type Props = {
	isOpen: boolean;
	setIsOpen: Function;
	student: Student | undefined;
  setSelectedStudent: Function;
}

export default function ReportModal(props: Props) {
  const [todayReport, setTodayReport] = useState<Report>();

  async function getData(student_id: number) {
    await reportAdapter.getTodayReportByStudentId({student_id: student_id}).then((res) => {
      const data = res[0]
      setTodayReport({id: data.id, content: data.content, is_complete: data.is_complete, student_id: data.student_id})
    });
  }

  async function handleSave(report: Report) {
    toast.success('saved!')
    console.log('logging report before attempt', report)
    try {
      await reportAdapter.updateReportById({report: report}).then((res) => {
        console.log('logging response of successful attempt', res)
      })
    } catch (error) {
      console.error(error)
    }
    // await reportAdapter.updateReportById(report).then((res) => console.log(res));
  }
  
  function handleSaveAndClose() {
    setTodayReport(undefined);
    props.setSelectedStudent(undefined);
    props.setIsOpen(false)
  }

  useEffect(() => {
    if (props.student) {
      getData(props.student.id);
    }
  }, [props.student])

	return (
		<Transition appear show={props.isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {
          handleSaveAndClose();
        }}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  
									<Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {props.student?.first_name} {props.student?.last_name}
                  </Dialog.Title>
                  {todayReport ? (
                    <article className="flex flex-col">
                      <textarea
                        defaultValue={todayReport.content}
                        className="shadow rounded"
                        onChange={(e) => {
                          console.log(todayReport)
                          console.log(e.target.value)
                          setTodayReport(prev => ({ ...prev, content: e.target.value }))
                        }}
                      />
                      <p>{todayReport.is_complete ? "Complete" : "Incomplete"}</p>
                    </article>
                  ) : null}
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        todayReport ? handleSave(todayReport) : null;
                      }}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        handleSaveAndClose();
                      }}
                    >
                      Save and Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
	)
}