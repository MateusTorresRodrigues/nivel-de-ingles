import { Link, useLocation } from "react-router-dom";

const BRAND_NAME = "English With Rayanne";

export function Header() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <header className="w-full max-w-[560px] flex items-center justify-between pt-[22px]">
      <Link to="/" className="flex items-center gap-[9px] group">
        <div className="w-6 h-6 rounded-[7px] bg-accent flex items-center justify-center text-white text-xs font-semibold -tracking-[0.02em] transition-transform duration-200 group-hover:scale-105">
          EN
        </div>
        <span className="text-[13.5px] font-semibold -tracking-[0.01em]">{BRAND_NAME}</span>
      </Link>
      <div className="flex items-center gap-3.5">
        <Link
          to={isAdmin ? "/" : "/admin"}
          className="text-[11.5px] tracking-[0.06em] uppercase text-fg/35 hover:text-fg/50 transition-colors"
        >
          {isAdmin ? "Sair do admin" : "Admin"}
        </Link>
        <span className="text-[11.5px] tracking-[0.06em] uppercase text-fg/45">CEFR</span>
      </div>
    </header>
  );
}
