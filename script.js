$(document).ready(function () {
  // Handle form submission
  $('#registrationForm').on('submit', function (event) {
    event.preventDefault(); // Prevent the form from refreshing the page

    // Create FormData object to handle file uploads
    const formData = new FormData(this);

    // Make an AJAX request to the PHP file
    $.ajax({
      url: 'process.php',
      type: 'POST',
      data: formData,
      processData: false, // Prevent jQuery from processing the data
      contentType: false, // Prevent jQuery from setting content type
      success: function (response) {
        $('#result').html(response).removeClass('hidden'); // Display response in the result div
      },
      error: function () {
        alert('Error submitting the form. Please try again!');
      },
    });
  });

  // Handle PDF download
  $(document).on('click', '#downloadPdf', function () {
    const { jsPDF } = window.jspdf;

    // Ensure #result exists and is visible
    const resultElement = document.querySelector('#result');
    if (!resultElement || resultElement.classList.contains('hidden')) {
      alert('Nothing to download! Please complete the form first.');
      return;
    }

    const doc = new jsPDF();

    // Convert the content of #result to PDF
    doc.html(resultElement, {
      callback: function (doc) {
        doc.save('registration-details.pdf'); // Save as PDF
      },
      x: 10,
      y: 10,
      margin: [10, 10, 10, 10], // Optional: Add some margins
      autoPaging: 'text', // Handle multi-page content
    });
  });
});
