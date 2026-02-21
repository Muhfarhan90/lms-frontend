import { Button } from './Button';

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  total: number;
  onPageChange: (page: number) => void;
}

/**
 * Pagination — sesuai dengan struktur paginasi Laravel (current_page, last_page, total)
 */
export function Pagination({ currentPage, lastPage, total, onPageChange }: PaginationProps) {
  if (lastPage <= 1) return null;

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
      <p className="text-sm text-gray-600">
        Total <span className="font-medium">{total}</span> data
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Sebelumnya
        </Button>
        <span className="text-sm text-gray-600">
          Halaman {currentPage} dari {lastPage}
        </span>
        <Button
          variant="secondary"
          size="sm"
          disabled={currentPage === lastPage}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Selanjutnya
        </Button>
      </div>
    </div>
  );
}
