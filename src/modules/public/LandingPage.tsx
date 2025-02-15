import PublicLinks from "./PublicLinks";

const LandingPage = () => {
  return (
    <div className="mx-auto max-w-[500px] px-2 md:px-0">
      <PublicLinks />
      <section>
        <h1 className="text-blue-700 text-2xl mb-4">Cram School Cloud</h1>
        <p>Sign up to make your first school.</p>
        <p>Add students, classes, and teachers and you&apos;re ready to go</p>
      </section>
    </div>
  );
};

export default LandingPage;
