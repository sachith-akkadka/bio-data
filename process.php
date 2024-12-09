<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitize and validate input fields
    $name = htmlspecialchars($_POST['name']);
    $gender = htmlspecialchars($_POST['gender']);
    $dob = htmlspecialchars($_POST['dob']);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $phone = htmlspecialchars($_POST['phone']);
    $address = htmlspecialchars($_POST['address']);
    $country = htmlspecialchars($_POST['country']);
    $state = htmlspecialchars($_POST['state']);
    $city = htmlspecialchars($_POST['city']);
    $zip = htmlspecialchars($_POST['zip']);
    $occupation = htmlspecialchars($_POST['occupation']);
    $qualification = htmlspecialchars($_POST['qualification']);
    $hobbies = htmlspecialchars($_POST['hobbies']);
    
    $uploadDir = 'uploads/';
    $profilePicture = '';

    // Handle profile picture upload
    if (isset($_FILES['profilePicture']) && $_FILES['profilePicture']['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['profilePicture']['tmp_name'];
        $fileName = basename($_FILES['profilePicture']['name']);
        $fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
        $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
        
        // Ensure the upload directory exists
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        if (in_array($fileExtension, $allowedExtensions)) {
            $newFileName = uniqid('profile_', true) . '.' . $fileExtension;
            $destination = $uploadDir . $newFileName;

            if (move_uploaded_file($fileTmpPath, $destination)) {
                $profilePicture = $destination;
            } else {
                echo "<p>Failed to upload the profile picture. Please try again.</p>";
            }
        } else {
            echo "<p>Invalid file type. Only JPG, JPEG, PNG, and GIF files are allowed.</p>";
        }
    }

    // Generate the response
    echo "<div>
        <h2>Your Bio-Data</h2>";

    if ($profilePicture) {
        echo "<img src='$profilePicture' alt='Profile Picture' style='width: 150px; height: 150px; border-radius: 50%;'>";
    }

    echo "<p><strong>Name:</strong> $name</p>
        <p><strong>Gender:</strong> $gender</p>
        <p><strong>Date of Birth:</strong> $dob</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Phone:</strong> $phone</p>
        <p><strong>Address:</strong> $address</p>
        <p><strong>Country:</strong> $country</p>
        <p><strong>State:</strong> $state</p>
        <p><strong>City:</strong> $city</p>
        <p><strong>Zip Code:</strong> $zip</p>
        <p><strong>Occupation:</strong> $occupation</p>
        <p><strong>Highest Qualification:</strong> $qualification</p>
        <p><strong>Hobbies:</strong> $hobbies</p>
        <button id='downloadPdf' style='background-color: #007bff; color: white; font-weight: bold; cursor: pointer; margin-top: 10px; padding: 10px; border-radius: 4px; width: 100%;'>Download as PDF</button>
    </div>";
} else {
    echo "Invalid request method.";
}
?>
