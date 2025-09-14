import { Header } from "./header";
import { SideBar } from "./side-bar";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" w-screen h-screen bg-black text-white">
      <Header />

      <div className="w-full h-full flex items-center justify-start">
        <SideBar />
        {children}
      </div>
    </div>
  );
};
