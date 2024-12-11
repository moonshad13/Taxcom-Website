<//?php
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
    $to      = 'taxcom695@gmail.com';  // Your Gmail address to receive messages

    // Create a new PHPMailer instance
    $mail = new PHPMailer\PHPMailer\PHPMailer();

    // SMTP configuration for Gmail
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';      // Gmail SMTP server
    $mail->SMTPAuth   = true;
    $mail->Username   = 'taxcom695@gmail.com'; // Your Gmail address
    $mail->Password   = 'taxisfun786';         // Your Gmail password (consider setting up an App Password for better security)
    $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    // Email settings
    $mail->setFrom($email, $name);             // The sender's email and name
    $mail->addAddress('taxcom695@gmail.com');  // The recipient email address
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










