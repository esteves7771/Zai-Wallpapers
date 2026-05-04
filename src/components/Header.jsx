import { Search } from "lucide-react";

export default function Header({ title, accentWord, right = "none", onRight }) {
  return (
    <header className="flex items-center justify-between px-4 pb-4 pt-[calc(env(safe-area-inset-top)+18px)]">
      <h1 className="text-[22px] font-bold tracking-tight">
        {accentWord ? <span className="text-accentHot">{accentWord}</span> : null}
        {accentWord ? " " : ""}
        {title}
      </h1>
      <div className="flex items-center gap-3">
        {right === "search" && (
          <button className="tap-button" aria-label="Search" onClick={onRight}>
            <Search className="h-5 w-5" />
          </button>
        )}
        {right === "edit" && (
          <button className="text-sm font-medium text-purple-300" onClick={onRight}>
            Edit
          </button>
        )}
      </div>
    </header>
  );
}
