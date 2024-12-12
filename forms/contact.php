<?php
// Include the PHPMailer class
require 'vendor/autoload.php';  // Make sure this is the correct path to the autoload file

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    // Create a new PHPMailer instance
    $mail = new PHPMailer\PHPMailer\PHPMailer;

    // SMTP settings
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'taxcom695@gmail.com'; // Your Gmail address
    $mail->Password = 'taxisfun786'; // Your Gmail password
    $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587; // TLS Port

    // Email details
    $mail->setFrom($email, $name); // From the email of the sender
    $mail->addAddress('taxcom695@gmail.com'); // Send to this email
    $mail->Subject = $subject;
    $mail->Body = "You have received a new message from $name.\n\nEmail: $email\n\nMessage: $message";

    // Send the email
    if ($mail->send()) {
        echo 'Message sent successfully!';
    } else {
        echo 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo;
    }
}
?>












