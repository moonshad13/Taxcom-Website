<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Load PHPMailer
require '../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// If the form is submitted
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // Sanitize user inputs
    $name    = htmlspecialchars($_POST['name']);
    $email   = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);
    $to      = 'moonshadshahid07@gmail.com';  // Your receiving email address

    // Create a new PHPMailer instance
    $mail = new PHPMailer(true);

    try {
        // SMTP configuration
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'moonshadshahid07@gmail.com';       // Your Gmail address
        $mail->Password   = 'mjam eqeb dcuh whbg';          // Your App Password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // Email settings
        $mail->setFrom($email, $name);
        $mail->addAddress($to);
        $mail->Subject = $subject;
        $mail->Body    = "You have received a new message from your website contact form:\n\n";
        $mail->Body   .= "Name: $name\n";
        $mail->Body   .= "Email: $email\n";
        $mail->Body   .= "Subject: $subject\n\n";
        $mail->Body   .= "Message:\n$message\n";

        // Send the email
        $mail->send();
        echo "success";
    } catch (Exception $e) {
        echo "Mailer Error: " . $mail->ErrorInfo;
    }

} else {
    echo "Invalid request method.";
}
?>






