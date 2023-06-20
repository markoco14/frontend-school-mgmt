import Link from 'next/link';
import { useRouter } from 'next/router';

export default function User() {
	const router = useRouter()
  
  return (
    <main
      className='min-h-screen p-24 max-w-[600px] mx-auto'
    >
      <nav className='flex gap-2'>
        <Link href="/">Home</Link>
      </nav>
      <h1>Easy Cram School Management In The Cloud.</h1>
      <section>
        <h2>Welcome back user {router.query.user_id}</h2>
      </section>
    </main>
  )
}
