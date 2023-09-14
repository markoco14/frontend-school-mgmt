import Link from "next/link";

const ParamsPageTabNav = ({
  queryParam,
	links,
  tab,
}: {
  queryParam?: any;
	links: any[];
  tab: string;
}) => {
  
  return (
    <ul className="flex gap-4 overflow-x-auto rounded border p-2 shadow">
      {links.map((link) => (
        <Link
          href={`${queryParam ? queryParam : ''}?${new URLSearchParams({
            tab: link.name.toLowerCase(),
          })}`}
          className={`${
            link.urlString === tab &&
            "duration underline decoration-blue-500 decoration-2 underline-offset-2 ease-in-out"
          }`}
          key={link.value}
        >
          {link.name}
        </Link>
      ))}
    </ul>
  );
};

export default ParamsPageTabNav;