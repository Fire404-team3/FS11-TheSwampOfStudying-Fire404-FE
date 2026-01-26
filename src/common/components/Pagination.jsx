export default function Pagination({
  currentPage,
  totalCount,
  limit,
  onPageChange,
  pageLimit = 5,
}) {
  const totalPages = Math.ceil(totalCount / limit);
  if (totalPages <= 0) return null;

  const currentGroup = Math.floor((currentPage - 1) / pageLimit);
  const startPage = currentGroup * pageLimit + 1;
  const endPage = Math.min(startPage + pageLimit - 1, totalPages);

  return (
    <div>
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        이전
      </button>

      {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
        const pageNum = startPage + i;
        return (
          <button key={pageNum} onClick={() => onPageChange(pageNum)}>
            {pageNum}
          </button>
        );
      })}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        다음
      </button>
    </div>
  );
}
