interface PaginationProps {
  paginationData: {
    current_page: number,
    last_page: number,
    siblings?: number,
  }
  onPageChange: (page: number) => void
}

export default function Pagination({paginationData, onPageChange}: PaginationProps) {

  let current_page: number = paginationData.current_page;
  let last_page: number = paginationData.last_page;
  let siblings: number = 2;
  if (paginationData.siblings) {
    siblings = paginationData.siblings;
  }

  if (!last_page || last_page <= 1 || !paginationData) {
    return;
  }

  const getPages = (): number[] => {
    let pages = [];

    for (let i = 1; i <= last_page; i++) {
      pages.push(i)
    }

    return pages;
  }

  const innerPages: number[] = getPages().filter((page) => (
    (
      page >= current_page - siblings &&
      page <= current_page + siblings
    )
  ));

  return (
    <nav aria-label="navigation">
      <ul className="pagination justify-content-center">

        {/* Previous Page */}
        {current_page != 1 &&
          <li className="page-item">
            <button className={`page-link`}
                    onClick={() => onPageChange(current_page - 1)}>Prev
            </button>
          </li>
        }

        {/* First Page */}
        {current_page >= siblings + 2 &&
          <li className="page-item">
            <button className={`page-link ${current_page == 1 ? 'disabled' : ''}`} onClick={() => onPageChange(1)}>
              1
            </button>
          </li>
        }

        {/* Left Ellipsis */}
        {current_page >= siblings + 3 && last_page >= 2 * siblings - 1 &&
          <li className="page-item disabled">
            <button className="page-link bg-white">...</button>
          </li>
        }

        {/* Inner Pages */}
        {innerPages.map((page) => (
            <li className="page-item" key={page}>
              <button className={`page-link ${page == current_page ? 'disabled' : ''}`}
                      onClick={() => onPageChange(page)}>{page}</button>
            </li>
          )
        )}

        {/* Right Ellipsis */}
        {current_page <= last_page - siblings - 2 && last_page >= 2 * siblings - 1 &&
          <li className="page-item disabled">
            <button className="page-link bg-white">...</button>
          </li>
        }

        {/* Last Page */}
        {current_page <= last_page - siblings - 1 &&
          <li className="page-item">
            <button className={`page-link ${current_page == last_page ? 'disabled' : ''}`}
                    onClick={() => onPageChange(last_page)}>{last_page}</button>
          </li>
        }

        {/* Next Page */}
        {current_page != last_page &&
          <li className="page-item">
            <button className={`page-link`}
                    onClick={() => onPageChange(current_page + 1)}>Next
            </button>
          </li>
        }
      </ul>
    </nav>
  );
}
