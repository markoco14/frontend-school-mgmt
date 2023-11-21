import NavigationLinks from "./NavigationLinks";

export default function DesktopNavbar() {
  return (
    <nav className="hidden h-screen flex-col gap-2 bg-blue-900 text-center text-gray-200 xs:flex xs:pt-8">
      <NavigationLinks />
    </nav>
  );
}
