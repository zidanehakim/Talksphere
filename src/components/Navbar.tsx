export default function Navbar() {
  return (
    <nav className="w-full h-16 bg-slate-900 absolute top-0 z-10">
      <div className="flex justify-between items-center h-full">
        <div className="flex items-center">
          <div className="text-white text-lg font-bold ml-4">Logo</div>
        </div>
        <div className="flex items-center">
          <div className="text-white text-lg font-bold mr-4">Login</div>
        </div>
      </div>
    </nav>
  );
}
