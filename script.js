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

    // Initialize jsPDF
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4'
    });

    // Convert the content of #result to PDF
    doc.html(resultElement, {
        callback: function (doc) {
            doc.save('registration-details.pdf'); // Save as PDF
        },
        x: 10, // Adjust x-coordinate
        y: 10, // Adjust y-coordinate
        html2canvas: {
            scale: 0.5, // Adjust scale for better quality
            useCORS: true, // Enable cross-origin images
        },
        windowWidth: resultElement.scrollWidth, // Handle full width
    });
});
});
