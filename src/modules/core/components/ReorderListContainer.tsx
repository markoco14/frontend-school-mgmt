import { Reorder } from "framer-motion";
import { ReactNode } from "react";

const ReorderListContainer = ({
  axis,
  values,
  onReorder,
  children,
}: {
  axis: "x" | "y" | undefined;
  values: any[];
  // eslint-disable-next-line no-unused-vars
  onReorder: (newOrder: any[]) => void;
  children: ReactNode;
}) => {
  return (
    <Reorder.Group
      className="flex flex-col divide-y"
      axis={axis}
      values={values}
      onReorder={onReorder}
    >
      {children}
    </Reorder.Group>
  );
};

export default ReorderListContainer;
