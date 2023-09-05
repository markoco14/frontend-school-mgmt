export default function DateChangeButtons({
	loading,
  date,
  setDate,
}: {
	loading: boolean;
  date: Date;
  setDate: Function;
}) {

	const dayNumber = new Date(date).getDay();
	
	
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
        <span className="animate-pulse">{loading && "loading..."}</span>
      </div>
      <div className="mb-2 flex gap-4">
        <button
          className="flex items-center justify-center disabled:cursor-not-allowed"
          onClick={decrementDate}
          disabled={dayNumber === 1}
        >
          <span className="material-symbols-outlined">navigate_before</span>
        </button>
        <button
          className="flex items-center justify-center disabled:cursor-not-allowed"
          onClick={incrementDate}
          disabled={dayNumber === 5}
        >
          <span className="material-symbols-outlined">navigate_next</span>
        </button>
      </div>
    </>
  );
}