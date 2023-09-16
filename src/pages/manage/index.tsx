import AuthContext from "@/src/AuthContext";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import ParamsPageTabNav from "@/src/modules/core/infrastructure/ui/components/ParamsPageTabNav";
import { EvaluationAttribute } from "@/src/modules/evaluation/domain/entities/EvaluationAttribute";
import { evaluationAttributeAdapter } from "@/src/modules/evaluation/infrastructure/adapters/evaluationAttributeAdapter";
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
        {tab === "info" && (
          <div className="grid gap-4 rounded border p-2 shadow">
            <h1>Welcome to the report editor.</h1>
            <p className="max-w-[70ch]">
              Every school has their own way to track data. But there are many
              things that each school does the same!
            </p>
            <p className="max-w-[70ch]">
              We let you choose the labels for your data, but there are really
              only two types of data:
            </p>
            <ul className="grid gap-2">
              <p>Numeric</p>
              <p>Text</p>
            </ul>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2 rounded border p-4 shadow">
                <p>
                  What is <strong>Numeric Data</strong>?
                </p>
                <p>
                  Our <strong>Numeric</strong> data means you rate student
                  behaviour with numbers. Usually on a scale from 1-3, 1-5, or
                  1-10.
                </p>
                <ol className="grid gap-2">
                  <label>Examples:</label>
                  <li>
                    1. Participation: <span>1/3, 2/3, 3/3</span>
                  </li>
                  <li>
                    2. Attitude: <span>1/5, 2/5, 3/5, 4/5, 5/5</span>
                  </li>
                </ol>
                <aside className="text-sm">
                  You can have as much <strong>Numeric Data</strong> as you
                  like. But we recommend between 2 - 5 to keep things simple.
                </aside>
              </div>
              <div className="grid gap-2 rounded border p-4 shadow">
                <p>
                  What is <strong>Text Data</strong>?
                </p>
                <p>
                  Our <strong>Text</strong> data means write a comment about
                  student behaviour. Comments can be just a few words, or a
                  whole paragraph! It&apos;s up to you!
                </p>
                <ul className="grid gap-2">
                  <label>Examples:</label>
                  <li className="grid">
                    Comment:{" "}
                    <em>
                      &quot;Joshua did a great job today! I liked when he helped
                      his team &quot;
                    </em>
                  </li>
                </ul>
                <aside className="text-sm">
                  We recommend only having one type of{" "}
                  <strong>Text Data</strong> in each report. That&apos;s because
                  too much text is too much.
                </aside>
              </div>
            </div>
          </div>
        )}
        {tab === "report editor" && (
          <>
            <p>Your current Student Evaluation metrics</p>
            <ul>
              {attributes?.map((attribute) => (
                <li key={attribute.id} draggable={true}>{attribute.name}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </Layout>
  );
}
