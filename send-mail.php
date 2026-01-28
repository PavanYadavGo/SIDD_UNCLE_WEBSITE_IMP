<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['number']);
    $message = htmlspecialchars($_POST['message']);

    $mail = new PHPMailer(true);

    try {
        // SMTP SETTINGS
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'codingbest307@gmail.com';     // YOUR GMAIL
        $mail->Password   = 'kjpw kozk yelx pcmt';       // APP PASSWORD
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // EMAIL SETTINGS
        $mail->setFrom('codingbest307@gmail.com', 'Website Contact');
        $mail->addAddress('codingbest307@gmail.com'); // where you receive mail

        $mail->Subject = 'New Contact Form Message';
        $mail->Body = "
Name: $name
Email: $email
Phone: $phone
Website: $website

Message:
$message
";

        $mail->send();
        echo "<script>alert('Message sent successfully!'); window.location='contact.html';</script>";

    } catch (Exception $e) {
        echo "<script>alert('Mail Error: {$mail->ErrorInfo}');</script>";
    }
}
?>
