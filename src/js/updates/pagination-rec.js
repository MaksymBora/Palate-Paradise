import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

function resizeVisPage() {
  const screenWidth = window.innerWidth;
  return screenWidth < 768 ? 2 : 3;
}

function createPagination(page, perPage, totalPages, callback) {
  const options = {
    totalItems: perPage * totalPages,
    itemsPerPage: perPage,
    visiblePages: resizeVisPage(),
    page,
    centerAlign: false,
    omitMiddlePages: false,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    template: {
      page: '<a href="#" class="tui-page-btn pag-page">{{page}}</a>',
      currentPage:
        '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
      moveButton:
        '<a href="#" class="tui-page-btn tui-{{type}} move-button">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</a>',
      disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}} prev-button">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</span>',
      moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip more-button">' +
        '<span class="tui-ico-ellip">...</span>' +
        '</a>',
    },
  };

  const pagination = new Pagination('pagination', options);

  pagination.on('afterMove', ({ page }) => {
    callback(page);
  });
}

export default createPagination;
