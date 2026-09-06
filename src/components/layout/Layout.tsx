import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col items-center px-5 pb-16">
      <Header />
      <Outlet />
    </div>
  );
}
