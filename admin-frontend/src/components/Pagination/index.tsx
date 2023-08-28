interface PaginationPropsType {
  paginationData: {
    current_page: number,
    last_page: number,
    siblings?: number,
  }
  onPageChange: (page: number) => void
}

export default function Pagination({paginationData, onPageChange} : PaginationPropsType) {

  if (!paginationData.last_page || paginationData.last_page <= 1 || !paginationData) {
    return;
  }

  const getPages = () => {
    let pages = [];

    for (let i = 1; i <= paginationData.last_page; i++) {
      pages.push(i)
    }

    return pages;
  }

  const innerPages = getPages().filter((page) => (
    (
      page >= paginationData.current_page - paginationData.siblings &&
      page <= paginationData.current_page + paginationData.siblings
    ) ||
    (paginationData.current_page == 1 && (page == 2 || page == 3)) ||
    (paginationData.current_page == paginationData.last_page && (page == paginationData.last_page - 1 || page == paginationData.last_page - 2))
  ));

  console.log("Pagination Rendered");

  return (
    <nav aria-label="navigation">
      <ul className="pagination justify-content-center">

        {/* Previous Page */}
        {paginationData.current_page != 1 &&
          <li className="page-item">
            <button className={`page-link`}
                    onClick={(ev) => onPageChange(paginationData.current_page - 1)}>Prev</button>
          </li>
        }

        {/* First Page */}
        {paginationData.current_page >= (paginationData.siblings + 2) &&
          <li className="page-item">
            <button className={`page-link ${paginationData.current_page == 1 ? 'disabled' : ''}`}
                    onClick={(ev) => onPageChange(1)}>1</button>
          </li>
        }

        {/* Left Ellipsis */}
        {paginationData.current_page >= (paginationData.siblings + 3) &&
          <li className="page-item disabled">
            <button className="page-link bg-white">...</button>
          </li>
        }

        {/* Inner Pages */}
        {innerPages.map((page) => (
            <li className="page-item" key={page}>
              <button className={`page-link ${page == paginationData.current_page ? 'disabled' : ''}`}
                      onClick={(ev) => onPageChange(page)}>{page}</button>
            </li>
          )
        )}

        {/* Right Ellipsis */}
        {paginationData.current_page <= (paginationData.last_page - paginationData.siblings - 2) &&
          <li className="page-item disabled">
            <button className="page-link bg-white">...</button>
          </li>
        }

        {/* Last Page */}
        {paginationData.current_page <= (paginationData.last_page - paginationData.siblings - 1) &&
          <li className="page-item">
            <button className={`page-link ${paginationData.current_page == paginationData.last_page ? 'disabled' : ''}`}
                    onClick={(ev) => onPageChange(paginationData.last_page)}>{paginationData.last_page}</button>
          </li>
        }

        {/* Next Page */}
        {paginationData.current_page != paginationData.last_page &&
          <li className="page-item">
            <button className={`page-link`}
                    onClick={(ev) => onPageChange(paginationData.current_page + 1)}>Next
            </button>
          </li>
        }
      </ul>
    </nav>
  );
}
