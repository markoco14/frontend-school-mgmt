import AuthContext from "@/src/AuthContext";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import Modal from "@/src/modules/core/infrastructure/ui/components/Modal";
import ParamsPageTabNav from "@/src/modules/core/infrastructure/ui/components/ParamsPageTabNav";
import { EvaluationAttribute } from "@/src/modules/evaluation/domain/entities/EvaluationAttribute";
import { evaluationAttributeAdapter } from "@/src/modules/evaluation/infrastructure/adapters/evaluationAttributeAdapter";
import Info from "@/src/modules/evaluation/infrastructure/ui/components/eval-editor/Info";
import NewRangeMetricForm from "@/src/modules/evaluation/infrastructure/ui/components/eval-editor/NewRangeMetricForm";
import NewTextMetricForm from "@/src/modules/evaluation/infrastructure/ui/components/eval-editor/newTextMetricForm";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Manage() {
  const { selectedSchool } = useContext(AuthContext);
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "info";
  const [attributes, setAttributes] = useState<EvaluationAttribute[]>([]);
  const [isRange, setIsRange] = useState<boolean>(true);
  const [isAddMetric, setIsAddMetric] = useState<boolean>(false);

  const links = [
    {
      value: 1,
      name: "Info",
      urlString: "info",
    },
    {
      value: 2,
      name: "Report Editor",
      urlString: "report editor",
    },
  ];

  useEffect(() => {
    async function getDate() {
      await evaluationAttributeAdapter
        .listAll({ school_id: selectedSchool?.id })
        .then((res) => {
          setAttributes(res);
        });
    }

    selectedSchool && getDate();
  }, [selectedSchool]);

  function handleClose() {
    setIsAddMetric(false);
  }

  return (
    <Layout>
      <div className="grid gap-4">
        <ParamsPageTabNav links={links} tab={tab} />
        {tab === "info" && <Info />}
        {tab === "report editor" && (
          <section className="grid gap-8 xs:grid-cols-2">
            <article className="rounded border p-8 shadow">
              <div className="flex justify-between">
                <p>Your current Student Evaluation metrics</p>
                <button onClick={() => setIsAddMetric(true)}>+ Metric</button>
              </div>
              <ul>
                {attributes?.map((attribute) => (
                  <li key={attribute.id} draggable={true}>
                    {attribute.name}
                  </li>
                ))}
              </ul>
            </article>
          </section>
        )}
      </div>
      <Modal show={isAddMetric} close={handleClose} title="Add New Metric">
        <article className="min-h-[500px] min-w-[800px]">
          <div className="grid grid-cols-2">
            <button
              className={`${
                isRange
                  ? "border-l-2 border-r-2 border-t-2 border-blue-300 bg-blue-300 text-blue-900 decoration-2 "
                  : "border-b-2 border-blue-300 bg-gray-100 shadow-inner"
              } w-full rounded-tl py-2 duration-200 ease-in-out`}
              onClick={() => setIsRange(true)}
            >
              Numeric Metric
            </button>
            <button
              className={`${
                isRange
                  ? "border-b-2 border-blue-300 bg-gray-100 shadow-inner"
                  : "border-l-2 border-r-2 border-t-2 border-blue-300 bg-blue-300 text-blue-900 decoration-2 "
              } w-full rounded-tr py-2 duration-200 ease-in-out`}
              onClick={() => setIsRange(false)}
            >
              Text Metric
            </button>
          </div>
          {isRange ? (
            <div className="border-b-2 border-l-2 border-r-2 border-blue-300">
              <NewRangeMetricForm />
            </div>
          ) : (
            <div className="border-b-2 border-l-2 border-r-2 border-blue-300">
              <NewTextMetricForm />
            </div>
          )}
        </article>
      </Modal>
    </Layout>
  );
}
