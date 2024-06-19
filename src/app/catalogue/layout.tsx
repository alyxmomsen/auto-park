import React from "react";

const layout = ({
  children,
  filter,
}: {
  children: React.ReactNode;
  filter: React.ReactNode;
}) => {
  return (
    <div>
      <div>{filter}</div>
      {children}
    </div>
  );
};

export default layout;
