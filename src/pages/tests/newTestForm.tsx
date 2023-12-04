import { addListItem } from "@/src/utils/addListItem";
import { useState } from "react";

import { Test } from "@/src/modules/tests/entities/Test";

const NewTestForm = ({
  testList,
  setTestList,
}: {
  testList: Test[];
  setTestList: Function;
}) => {
  // const [subject, setSubject] = useState<string>('') //subject commented out for demo purposes
  const [level, setLevel] = useState<string>("");
  const [unit, setUnit] = useState<string>("");
  const [testNumber, setTestNumber] = useState<string>("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const newTest: Test = {
					id: 100,
					maxCorrections: 3,
					allowNoCorrections: false, // remove later
          name: `Level ${level} Unit ${unit} Test ${testNumber}`,
        };
        const updatedTestList = addListItem(testList, newTest);
        setTestList(updatedTestList);
      }}
      className="grid gap-8"
    >
      {/* <div className="grid gap-2">
        <label>Subject</label>
        <input type="text" className="border px-2 py-1" />
      </div> */}
      <div className="grid gap-2">
        <label>Level</label>
        <input
          onChange={(e) => setLevel(e.target.value)}
          type="text"
          className="border px-2 py-1"
        />
      </div>
      <div className="grid gap-2">
        <label>Unit</label>
        <input
          onChange={(e) => setUnit(e.target.value)}
          type="text"
          className="border px-2 py-1"
        />
      </div>
      <div className="grid gap-2">
        <label>Test #</label>
        <input
          onChange={(e) => setTestNumber(e.target.value)}
          type="text"
          className="border px-2 py-1"
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default NewTestForm;
