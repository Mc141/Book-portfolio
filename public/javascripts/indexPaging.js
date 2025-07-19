const totalPages = 14;

function navigateTo(section) {
  switch (section) {
    case 'prologue':
      $('#book').turn('page', 3);
      break;
    case 'intro-photo-cv':
      $('#book').turn('page', 4);
      break;
    case 'origin':
      $('#book').turn('page', 5);
      break;
    case 'growth':
      $('#book').turn('page', 6);
      break;
    case 'skills':
      $('#book').turn('page', 7);
      break;
    case 'chapter1':
      $('#book').turn('page', 8);
      break;
    case 'chapter2':
      $('#book').turn('page', 9);
      break;
    case 'chapter3':
      $('#book').turn('page', 10);
      break;
    case 'chapter4':
      $('#book').turn('page', 11);
      break;
    case 'tutor':
      $('#book').turn('page', 12);
      break;
    case 'contact':
      $('#book').turn('page', 13);
      break;
    case 'connect':
      $('#book').turn('page', 14);
      break;
    default:
      break;
  }
}



function updateProgress(currentPage) {
  const firstContentPage = 1;
  const lastContentPage = totalPages;

  if (currentPage < firstContentPage) {
    // Before content starts, progress is 0%
    $('#progressBar').css('width', '0%');
  } else if (currentPage >= lastContentPage) {
    // At or after last page, progress is 100%
    $('#progressBar').css('width', '100%');
  } else {
    // Calculate progress between first and last content page
    const progress = Math.floor(
      ((currentPage - firstContentPage) / (lastContentPage - firstContentPage)) * 100
    );
    $('#progressBar').css('width', `${progress}%`);
  }
}






$(document).ready(function () {
  $('#book').turn({
    acceleration: true,
    pages: totalPages,
    elevation: 50,
    gradients: !$.isTouch,
    when: {
      turning: function (event, page) {
        updateProgress(page);
        if (page === 1) {
          $('#book').removeClass('open').addClass('closed');
        } else {
          $('#book').removeClass('closed').addClass('open');
        }
      }
    }
  });

  $('#book').addClass('closed');
  updateProgress(1);

  $('#book').on('click', '.index-link', function (e) {
    e.preventDefault();
    const sectionId = $(this).data('section');
    navigateTo(sectionId);
  });

  $('#prevPage').click(function () {
    $('#book').turn('previous');
  });

  $('#nextPage').click(function () {
    $('#book').turn('next');
  });

  $('#firstPage').click(function () {
    $('#book').turn('page', 1);
  });

  $('#lastPage').click(function () {
    $('#book').turn('page', totalPages);
  });
});
