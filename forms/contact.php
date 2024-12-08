<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// If the form is submitted
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // Sanitize the user inputs
    $name    = htmlspecialchars($_POST['name']);
    $email   = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);
    $to      = 'moonshadshahid07@gmail.com';  // Your receiving email address

    // Include Composer autoload (this will load PHPMailer)
    require '../vendor/autoload.php';  // Adjust path if necessary

    // Create a new PHPMailer instance
    $mail = new PHPMailer;

    // SMTP configuration
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';  // Use Gmail SMTP
    $mail->SMTPAuth = true;
    $mail->Username = 'your-email@gmail.com';  // Your Gmail address
    $mail->Password = 'your-app-password';  // Use app-specific password (if 2FA is enabled)
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    // Email settings
    $mail->setFrom($email, $name);
    $mail->addAddress($to);  // Send email to the receiving address
    $mail->Subject = $subject;
    $mail->Body    = "You have received a new message from your website contact form:\n\n";
    $mail->Body   .= "Name: $name\n";
    $mail->Body   .= "Email: $email\n";
    $mail->Body   .= "Subject: $subject\n\n";
    $mail->Body   .= "Message:\n$message\n";

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



