import AuthContext from "@/src/AuthContext";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import Modal from "@/src/modules/core/infrastructure/ui/components/Modal";
import ParamsPageTabNav from "@/src/modules/core/infrastructure/ui/components/ParamsPageTabNav";
import { EvaluationAttribute } from "@/src/modules/evaluation/domain/entities/EvaluationAttribute";
import { evaluationAttributeAdapter } from "@/src/modules/evaluation/infrastructure/adapters/evaluationAttributeAdapter";
import Info from "@/src/modules/evaluation/infrastructure/ui/components/eval-editor/Info";
import NewEvaluationMetrics from "@/src/modules/evaluation/infrastructure/ui/components/eval-editor/NewEvaluationMetrics";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Manage() {
  const { selectedSchool } = useContext(AuthContext);
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "info";
  const [attributes, setAttributes] = useState<EvaluationAttribute[]>([]);
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
        <NewEvaluationMetrics setAttributes={setAttributes}/>
      </Modal>
    </Layout>
  );
}
