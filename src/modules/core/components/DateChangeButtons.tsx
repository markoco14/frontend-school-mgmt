export default function DateChangeButtons({
  date,
  setDate,
}: {
  date: Date;
  setDate: Function;
}) {

	const incrementDate = () => {
		const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + 1);
    setDate(currentDate);
  };

  const decrementDate = () => {
		const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() - 1);
    setDate(currentDate);
  };

  return (
    <>
      <div>
        <p>{date.toDateString()}</p>
      </div>
      <div className="mb-2 flex gap-4">
        <button
          className="flex items-center justify-center disabled:cursor-not-allowed"
          onClick={decrementDate}
          // disabled={dayNumber === 1}
        >
          <span className="material-symbols-outlined">navigate_before</span>
        </button>
        <button
          className="flex items-center justify-center disabled:cursor-not-allowed"
          onClick={incrementDate}
          // disabled={dayNumber === 5}
        >
          <span className="material-symbols-outlined">navigate_next</span>
        </button>
      </div>
    </>
  );
}