import { useState } from "react";

const EvaluationRangeAttribute = ({ attribute }: { attribute: any }) => {
  const [selectedValue, setSelectedValue] = useState<number>(
    attribute.max_value,
  );
  return (
    <div className="grid gap-2">
      <label>{attribute.name}</label>

      <div className={`grid grid-cols-${attribute.max_value} gap-4`}>
        {Array.from(
          { length: attribute.max_value - attribute.min_value + 1 },
          (_, i) => i + attribute.min_value,
        ).map((value) => (
          <button
            onClick={() => {
              setSelectedValue(value);
            }}
            key={value}
            className={`${
              selectedValue === value ? "bg-green-500" : ""
            } rounded border p-4 text-center shadow`}
          >
            {value}
          </button>
        ))}
      </div>
      {selectedValue && <p>{attribute.descriptions[selectedValue - 1]}</p>}
    </div>
  );
};

export default EvaluationRangeAttribute;