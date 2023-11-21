import { useUserContext } from "@/src/UserContext";
import AdminLayout from "@/src/modules/core/components/AdminLayout";
import Layout from "@/src/modules/core/components/Layout";
import Modal from "@/src/modules/core/components/Modal";
import ParamsPageTabNav from "@/src/modules/core/components/ParamsPageTabNav";
import PermissionDenied from "@/src/modules/core/components/PermissionDenied";
import { EvaluationAttribute } from "@/src/modules/evaluation/domain/entities/EvaluationAttribute";
import { evaluationAttributeAdapter } from "@/src/modules/evaluation/infrastructure/adapters/evaluationAttributeAdapter";
import Info from "@/src/modules/evaluation/infrastructure/ui/components/eval-editor/Info";
import NewEvaluationMetrics from "@/src/modules/evaluation/infrastructure/ui/components/eval-editor/NewEvaluationMetrics";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Manage() {
  const { user, selectedSchool } = useUserContext();
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
        .listAll({ school_id: Number(selectedSchool?.id), details: true })
        .then((res) => {
          setAttributes(res);
        });
    }

    selectedSchool && getDate();
  }, [selectedSchool]);

  function handleClose() {
    setIsAddMetric(false);
  }

  async function handleDelete({ attribute_id }: { attribute_id: number }) {
    try {
      await evaluationAttributeAdapter
        .delete({ attribute_id: attribute_id })
        .then(() => {
          const remainingAttributes = attributes.filter((attribute) => {
            return attribute.id !== attribute_id;
          });
          setAttributes(remainingAttributes);
          toast.success("Deleted!");
        });
    } catch (error) {
      // @ts-ignore
      toast.error(error.message);
    }
  }

  if (user?.role !== "OWNER") {
    return (
      <Layout>
        <AdminLayout>
          <div className="h-full w-full bg-white">
            <PermissionDenied />
          </div>
        </AdminLayout>
      </Layout>
    );
  }

  return (
    <Layout>
      <AdminLayout>
        <div className="h-full w-full bg-white">
          <div className="grid gap-4">
            <ParamsPageTabNav links={links} tab={tab} />
            {tab === "info" && <Info />}
            {tab === "report editor" && (
              <section className="grid gap-8 xs:grid-cols-2">
                <article className="grid gap-4 rounded border p-8 shadow">
                  <div className="flex justify-between">
                    <p>Your current Student Evaluation metrics</p>
                    <button onClick={() => setIsAddMetric(true)}>
                      + Metric
                    </button>
                  </div>
                  <div className="grid gap-2">
                    <p className="text-lg">Numeric Metrics</p>
                    <ul className="grid gap-2 bg-gray-100 p-2 shadow-inner">
                      {attributes?.map(
                        (attribute) =>
                          attribute.data_type?.data_type === 1 && (
                            <li
                              className="flex justify-between rounded border bg-white p-2 shadow"
                              key={attribute.id}
                              draggable={true}
                            >
                              <span>{attribute.name}</span>
                              <button
                                onClick={() =>
                                  handleDelete({ attribute_id: attribute.id })
                                }
                              >
                                delete
                              </button>
                            </li>
                          ),
                      )}
                    </ul>
                  </div>
                  <div className="grid gap-2">
                    <p className="text-lg">Text Metrics</p>
                    <ul className="grid gap-2 bg-gray-100 p-2 shadow-inner">
                      {attributes?.map(
                        (attribute) =>
                          attribute.data_type?.data_type === 0 && (
                            <li
                              className="flex justify-between rounded border bg-white p-2 shadow"
                              key={attribute.id}
                              draggable={true}
                            >
                              <span>{attribute.name}</span>
                              <button
                                onClick={() =>
                                  handleDelete({ attribute_id: attribute.id })
                                }
                              >
                                delete
                              </button>
                            </li>
                          ),
                      )}
                    </ul>
                  </div>
                </article>
              </section>
            )}
          </div>
          <Modal show={isAddMetric} close={handleClose} title="Add New Metric">
            <NewEvaluationMetrics setAttributes={setAttributes} />
          </Modal>
        </div>
      </AdminLayout>
    </Layout>
  );
}
