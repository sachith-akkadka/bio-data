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
        // Open the response in a new tab
        const newTab = window.open();
        if (newTab) {
          newTab.document.open();
          newTab.document.write(`
            <html>
              <head>
                <title>Registration Details</title>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js"></script>
                <script>
                  function downloadPDF() {
                    const { jsPDF } = window.jspdf;
                    const doc = new jsPDF({
                      orientation: 'portrait',
                      unit: 'px',
                      format: 'a4'
                    });

                    const content = document.body.innerHTML; // Capture the content of the new tab
                    const container = document.createElement('div');
                    container.innerHTML = content;

                    doc.html(container, {
                      callback: function (doc) {
                        doc.save('registration-details.pdf');
                      },
                      x: 10,
                      y: 10,
                      html2canvas: {
                        scale: 0.5, // Adjust scale for better quality
                        useCORS: true, // Enable cross-origin images
                      },
                    });
                  }
                </script>
              </head>
              <body>
                ${response}
                <script>
                  document.getElementById('downloadPdf').addEventListener('click', downloadPDF);
                </script>
              </body>
            </html>
          `);
          newTab.document.close();
        } else {
          alert('Pop-up blocked. Please allow pop-ups for this website.');
        }
      },
      error: function () {
        alert('Error submitting the form. Please try again!');
      },
    });
  });
});
