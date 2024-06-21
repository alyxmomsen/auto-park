import React from "react";

interface LayoutProps {
  children: React.ReactNode;
  filter: string; // или другой необходимый тип
}

const layout = ({ children , filter }: /* { children: React.ReactNodes } */LayoutProps) => {
  return <div>{children}</div>;
};

export default layout;
