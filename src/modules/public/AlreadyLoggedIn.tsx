import Link from "next/link";

export default function Login() {
    return (
        <div className="grid place-content-center h-screen">
            <p>You&apos;re already logged in!</p>
            <Link href="/" className="text-blue-500 underline underline-offset-2 text-xl">Go back to the app</Link>
        </div>
    );
}
