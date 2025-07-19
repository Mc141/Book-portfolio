const totalPages = 10;

function navigateTo(sectionId) {
  switch (sectionId) {
    case 'prologue': $('#book').turn('page', 3); break;
    case 'intro-photo-cv': $('#book').turn('page', 4); break;
    case 'origin': $('#book').turn('page', 5); break;
    case 'growth': $('#book').turn('page', 6); break;
    case 'skills': $('#book').turn('page', 7); break;
    case 'chapters':
    case 'chapter1':
    case 'chapter2': $('#book').turn('page', 8); break;
    case 'tutor': $('#book').turn('page', 9); break;
    case 'now':
    case 'contact': $('#book').turn('page', 10); break;
    case 'social': $('#book').turn('page', 11); break;
  }
}

function updateProgress(currentPage) {
  const progress = Math.floor((currentPage - 1) / (totalPages - 1) * 100);
  $('#progressBar').css('width', `${progress}%`);
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
});
