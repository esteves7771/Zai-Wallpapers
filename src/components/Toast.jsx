export default function Toast({ message }) {
  return (
    <div
      className={`pointer-events-none absolute left-4 right-4 z-50 rounded-2xl border border-white/10 bg-panel/95 px-4 py-3 text-center text-sm text-white shadow-neon backdrop-blur-xl transition ${
        message ? "bottom-28 opacity-100" : "bottom-24 opacity-0"
      }`}
    >
      {message}
    </div>
  );
}
