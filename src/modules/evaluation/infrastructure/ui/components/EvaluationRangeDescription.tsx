const EvaluationRangeDescription = ({ selectedValue, attribute }: { selectedValue: number; attribute: any }) => {
  return (
    selectedValue && <p>{attribute.descriptions[selectedValue - 1]}</p>
  );
};

export default EvaluationRangeDescription;
