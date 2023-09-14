import Link from "next/link";

const ParamsPageTabNav = ({
  queryParam,
	links,
  tab,
  dateString,
}: {
  queryParam?: any;
	links: any[];
  tab: string;
  dateString?: string;
}) => {
  // TODO: pass a query params object? construct params on each page and just send that object
  // will allow for dealing with optional parameters?
  return (
    <ul className="flex gap-4 overflow-x-auto rounded border p-2 shadow">
      {links.map((link) => (
        <Link
          href={`${queryParam ? queryParam : ""}?${
            dateString
              ? new URLSearchParams({
                  date: dateString,
                  tab: link.name.toLowerCase(),
                })
              : new URLSearchParams({
                  tab: link.name.toLowerCase(),
                })
          }`}
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