const PageTabNavigation = ({
	links,
  tab,
  setTab,
}: {
	links: any[];
  tab: number;
  setTab: Function;
}) => {
  
  return (
    <nav className="flex gap-4 overflow-x-auto rounded border p-2 shadow">
      {links.map((button) => (
        <button
          className={`${
            button.value === tab &&
            "duration underline decoration-blue-500 decoration-2 underline-offset-2 ease-in-out"
          }`}
          key={button.value}
          onClick={() => setTab(button.value)}
        >
          {button.name}
        </button>
      ))}
    </nav>
  );
};

export default PageTabNavigation