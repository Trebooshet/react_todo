import ReactPaginate from "react-paginate";
import { Box } from "@chakra-ui/react";
import './Pagination.css'

export default function Pagination({ pageCount, setPage, currentPage }: { pageCount: number; setPage: (newPage: number) => void, currentPage: number }) {
  return (
    <Box >
      <ReactPaginate
        className="pagination"
        forcePage={currentPage - 1}
        onPageChange={(event) => setPage(event.selected + 1)}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        nextLabel=">"
        breakLabel="..."
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </Box>
  );
}
