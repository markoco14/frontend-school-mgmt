import Link from "next/link";

export default function Login() {
    return (
        <div className="grid place-content-center h-screen">
            <p>You&apos;re logged in!</p>
            <Link href="/" className="text-blue-500 underline underline-offset-2 text-xl">Go to the app</Link>
        </div>
    );
}
