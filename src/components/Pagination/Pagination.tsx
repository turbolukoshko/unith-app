import { FC } from "react";
import "./Pagination.css";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
};

export const Pagination: FC<PaginationProps> = ({
  totalPages,
  currentPage,
  handlePageChange,
}) => {
  return (
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          className={currentPage === index + 1 ? "active" : ""}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};
