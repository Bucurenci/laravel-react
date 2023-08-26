export default function Pagination({paginationData, onPageChange}) {
  if (!paginationData.last_page || paginationData.last_page <= 1 || !paginationData) {
    return;
  }

  const getPages = () => {
    let pages = [];

    for (let i = 1; i <= paginationData.last_page; i++) {
      pages.push({
        id: i,
        active: paginationData.current_page == i
      })
    }

    return pages;
  }

  const innerPages = getPages().filter((page) => (
    (
      page.id >= paginationData.current_page - paginationData.sibilings &&
      page.id <= paginationData.current_page + paginationData.sibilings
    ) ||
    (paginationData.current_page == 1 && (page.id == 2 || page.id == 3)) ||
    (paginationData.current_page == paginationData.last_page && (page.id == paginationData.last_page - 1 || page.id == paginationData.last_page - 2))
  ));

  console.log("Pagination Rendered");

  return (
    <nav aria-label="navigation">
      <ul className="pagination justify-content-center">

        {/* Previous Page */}
        <li className="page-item">
          <button className={`page-link ${paginationData.current_page == 1 ? 'disabled' : ''}`}
                  onClick={(ev) => onPageChange(paginationData.current_page - 1)}>Prev</button>
        </li>

        {/* First Page */}
        {paginationData.current_page >= (paginationData.sibilings + 2) &&
          <li className="page-item">
            <button className={`page-link ${paginationData.current_page == 1 ? 'disabled' : ''}`}
                    onClick={(ev) => onPageChange(1)}>1</button>
          </li>
        }

        {/* Left Ellipsis */}
        {paginationData.current_page >= (paginationData.sibilings + 3) &&
          <li className="page-item disabled">
            <button className="page-link bg-white">...</button>
          </li>
        }

        {innerPages.map((page) => (
            <li className="page-item" key={page.id}>
              <button className={`page-link ${page.active ? 'disabled' : ''}`} onClick={(ev) => onPageChange(page.id)}>{page.id}</button>
            </li>
          )
        )}

        {/* Right Ellipsis */}
        {paginationData.current_page <= (paginationData.last_page - paginationData.sibilings - 2) &&
          <li className="page-item disabled">
            <button className="page-link bg-white">...</button>
          </li>
        }

        {/* Last Page */}
        {paginationData.current_page <= (paginationData.last_page - paginationData.sibilings - 1) &&
          <li className="page-item">
            <button className={`page-link ${paginationData.current_page == paginationData.last_page ? 'disabled' : ''}`}
                    onClick={(ev) => onPageChange(paginationData.last_page)}>{paginationData.last_page}</button>
          </li>
        }

        {/* Next Page */}
        <li className="page-item">
          <button className={`page-link ${paginationData.current_page == paginationData.last_page ? 'disabled' : ''}`}
                  onClick={(ev) => onPageChange(paginationData.current_page + 1)}>Next</button>
        </li>
      </ul>
    </nav>
  );
}
