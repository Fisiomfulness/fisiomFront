export default function CustomTable({ children }) {
  return (
    <div className="overflow-x-auto max-w-fit mx-auto h-[520px] pr-2">
      <table className="w-full text-left text-black rounded-lg overflow-hidden">
        {children}
      </table>
    </div>
  );
}
