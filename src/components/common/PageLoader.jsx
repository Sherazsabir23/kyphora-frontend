const PageLoader = ({ text = "Loading..." }) => {
  return (
    <div className="flex h-80 items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#3B82F6] border-t-transparent"></div>
        <p className="text-sm text-slate-400">{text}</p>
      </div>
    </div>
  );
};

export default PageLoader;