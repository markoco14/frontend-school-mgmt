import React from 'react'

function Skeleton({
  // className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={"bg-muted animate-pulse rounded-md"}
      {...props}
    />
  );
}

export { Skeleton };
