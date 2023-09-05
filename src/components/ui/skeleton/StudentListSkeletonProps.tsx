export default function StudentListSkeletonProps({studentQuantity}: {studentQuantity: number}) {

  const students = Array.from({ length: studentQuantity }, (_, i) => i);
  return (
    <div className="grid gap-2">
      {students.map((_, index: number) => (
        <div key={index} className="flex h-[48px] items-center gap-2 rounded bg-gray-200 px-2 py-1">
          <div className="aspect-square h-[40px] rounded-full bg-gray-300"></div>
          <div className="h-[40px] w-full rounded bg-gray-300"></div>
        </div>
      ))}
     
    </div>
  );
}
