$(document).ready(function () {
    $('#registrationForm').on('submit', function (event) {
      event.preventDefault(); // Prevent form from refreshing the page
  
      const formData = $(this).serialize(); // Serialize form data
  
      // Make an AJAX request to the PHP file
      $.ajax({
        url: 'process.php',
        type: 'POST',
        data: formData,
        success: function (response) {
          $('#result').html(response).removeClass('hidden'); // Display response in the result div
        },
        error: function () {
          alert('Error submitting the form. Please try again!');
        },
      });
    });
  });
  