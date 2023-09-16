import AuthContext from "@/src/AuthContext";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import ParamsPageTabNav from "@/src/modules/core/infrastructure/ui/components/ParamsPageTabNav";
import { EvaluationAttribute } from "@/src/modules/evaluation/domain/entities/EvaluationAttribute";
import { evaluationAttributeAdapter } from "@/src/modules/evaluation/infrastructure/adapters/evaluationAttributeAdapter";
import Info from "@/src/modules/evaluation/infrastructure/ui/components/eval-editor/Info";
import NewRangeMetricForm from "@/src/modules/evaluation/infrastructure/ui/components/eval-editor/NewRangeMetricForm";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

// things I want
// some explanations
// list of current report attributes
// button to make new
// live view of what a report looks like in real time



export default function Manage() {
  const { selectedSchool } = useContext(AuthContext);
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "info";
  const [attributes, setAttributes] = useState<EvaluationAttribute[]>([]);
  const [isRange, setIsRange] = useState<boolean>(false);

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
          console.log(res);
          setAttributes(res);
        });
    }

    getDate();
  }, [selectedSchool]);

  return (
    <Layout>
      <div className="grid gap-4">
        <ParamsPageTabNav links={links} tab={tab} />
        {tab === "info" && <Info />}
        {tab === "report editor" && (
          <section className="grid xs:grid-cols-2 gap-8">
            <article className="rounded border p-8 shadow">
              <p>Your current Student Evaluation metrics</p>
              <ul>
                {attributes?.map((attribute) => (
                  <li key={attribute.id} draggable={true}>
                    {attribute.name}
                  </li>
                ))}
              </ul>
            </article>
            <article className="rounded border p-8 shadow">
              <div>
                <button onClick={() => setIsRange(true)}>Numeric</button>
                <button onClick={() => setIsRange(false)}>Text</button>
              </div>
              {isRange && <NewRangeMetricForm />}
            </article>
          </section>
        )}
      </div>
    </Layout>
  );
}
