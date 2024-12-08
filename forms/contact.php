<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Include Composer's autoload for PHPMailer
require '../vendor/autoload.php'; // Keep this as it is based on your project structure

// If the form is submitted
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // Sanitize the user inputs
    $name    = htmlspecialchars($_POST['name']);
    $email   = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);
    $to      = 'taxcomp@outlook.com';  // Change to your main email address

    // Create a new PHPMailer instance
    $mail = new PHPMailer\PHPMailer\PHPMailer();

    // SMTP configuration for Outlook
    $mail->isSMTP();
    $mail->Host       = 'smtp.office365.com';  // Outlook SMTP server
    $mail->SMTPAuth   = true;
    $mail->Username   = 'taxcomp@outlook.com';  // Your Outlook email address
    $mail->Password   = 'taxisfun786';    // Your Outlook app password or email password
    $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    // Set the sender's email (user's email) and name (user's name)
    $mail->setFrom($email, $name);   // The sender's email and name
    $mail->addAddress('taxcomp@outlook.com');           // The recipient email address
    $mail->Subject = $subject;
    $mail->Body    = "You have received a new message from your website contact form:\n\n";
    $mail->Body   .= "Name: $name\n";
    $mail->Body   .= "Email: $email\n";
    $mail->Body   .= "Subject: $subject\n\n";
    $mail->Body   .= "Message:\n$message\n";

    // Enable debugging to display SMTP errors
    $mail->SMTPDebug = 2;  // Enable debugging (set to 0 to disable debug messages)

    // Attempt to send the email
    if ($mail->send()) {
        echo "Your message has been sent successfully. Thank you!";
    } else {
        echo "Sorry, your message could not be sent. Please try again later. Error: " . $mail->ErrorInfo;
    }

} else {
    echo "Invalid request method.";
}
?>








