import React, { PropsWithChildren } from "react";

const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="h-[100svh] text-white bg-neutral-900">{children}</main>
  );
};

export default MainLayout;
