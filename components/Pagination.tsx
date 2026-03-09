interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (value: number) => void;
}

const Pagination = ({
  currentPage = 1,
  totalPages = 5,
  onPageChange,
}: PaginationProps) => {
  return (
    <div className="flex space-x-1">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        className="ml-2 rounded-md border border-slate-300 px-3 py-2 text-center text-sm text-slate-600 transition-all hover:border-slate-800 hover:bg-slate-800 hover:text-white hover:shadow-lg focus:border-slate-800 focus:bg-slate-800 focus:text-white active:border-slate-800 active:bg-slate-800 active:text-white disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          className={`ml-2 min-w-9 rounded-md border border-slate-300 px-3 py-2 text-center text-sm transition-all hover:bg-slate-700 hover:text-white hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${currentPage === i + 1 ? "bg-slate-800 text-white" : ""}`}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="ml-2 min-w-9 rounded-md border border-slate-300 px-3 py-2 text-center text-sm text-slate-600 shadow-sm transition-all hover:border-slate-800 hover:bg-slate-800 hover:text-white hover:shadow-lg focus:border-slate-800 focus:bg-slate-800 focus:text-white active:border-slate-800 active:bg-slate-800 active:text-white disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
