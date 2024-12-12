<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    $mail = new PHPMailer(true);

    try {
        // SMTP Configuration
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'taxcom695@gmail.com'; // Your Gmail address
        $mail->Password = 'vyzz bhsc bgpo gdns'; // Your Gmail password or App Password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Email Details
        $mail->setFrom($email, $name);
        $mail->addAddress('taxcom695@gmail.com'); // Recipient address

        $mail->Subject = $subject;
        $mail->Body = "Name: $name\nEmail: $email\n\nMessage:\n$message";

        // Send the email
        if ($mail->send()) {
            echo "Message sent successfully";  // Success response
        }
    } catch (Exception $e) {
        // Error response in case of failure
        echo "Message delivery failed. Error: {$mail->ErrorInfo}";
    }
} else {
    echo "Invalid request";  // If it's not a POST request
}
?>

