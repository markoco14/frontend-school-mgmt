import { useRouter } from "next/router";

const BackButton = () => {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} className="rounded border p-2">
      Back
    </button>
  );
};

export default BackButton;