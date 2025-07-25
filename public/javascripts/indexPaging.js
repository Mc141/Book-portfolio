const totalPages = 12;

function navigateTo(section) {
  switch (section) {
    case 'prologue':
      $('#book').turn('page', 3); // Prologue (page 3)
      break;
    case 'intro-photo-cv':
      $('#book').turn('page', 4); // Meet the Author
      break;
    case 'origin':
      $('#book').turn('page', 5); // Origins
      break;
    case 'growth':
      $('#book').turn('page', 6); // Student Chapter
      break;
    case 'skills':
      $('#book').turn('page', 7); // Skills
      break;
    case 'chapter1':
      $('#book').turn('page', 8); // Portfolio Book
      break;
    case 'chapter2':
      $('#book').turn('page', 9); // MCC Website
      break;
    case 'chapter3':
      $('#book').turn('page', 10); // TheologyLens
      break;
    case 'tutor':
      $('#book').turn('page', 11); // Teaching
      break;
    case 'contact':
      $('#book').turn('page', 12); // Contact
      break;
    case 'connect':
      $('#book').turn('page', 13); // Connect
      break;
    default:
      break;
  }
}

function updateProgress(currentPage) {
  const firstContentPage = 1;
  const lastContentPage = totalPages;

  if (currentPage <= 1) {
    $('#progressBar').css('width', '0%');
  } else if (currentPage >= lastContentPage) {
    $('#progressBar').css('width', '100%');
  } else {
    const contentPages = lastContentPage - 1;
    const currentContentPage = currentPage - 1;
    const progress = Math.floor((currentContentPage / contentPages) * 100);
    $('#progressBar').css('width', `${progress}%`);
  }
}

$(document).ready(function () {
  $('#book').turn({
    acceleration: true,
    pages: 13, // Total pages (including cover and all content)
    elevation: 50,
    gradients: !$.isTouch,
    when: {
      turning: function (event, page) {
        updateProgress(page);

        // Toggle visual book state
        if (page === 1) {
          $('#book').removeClass('open').addClass('closed');
        } else {
          $('#book').removeClass('closed').addClass('open');
        }
      },
      turned: function (event, page) {
        updateProgress(page);
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

  window.navigateTo = function(section) {
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
      case 'tutor':
        $('#book').turn('page', 11);
        break;
      case 'contact':
        $('#book').turn('page', 12);
        break;
      case 'connect':
        $('#book').turn('page', 13);
        break;
      default:
        break;
    }
  };

  // Navigation buttons
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

  // Keyboard navigation
  $(document).keydown(function(e) {
    if (e.keyCode === 37) {
      $('#book').turn('previous');
    } else if (e.keyCode === 39) {
      $('#book').turn('next');
    }
  });
});
