import Link from "next/link";

export default function PermissionDenied() {

  return (
    <>
		 <h2>You do not have permission to access this page.</h2>
			<Link href="/">Back to Home</Link>
		</>
  );
}
