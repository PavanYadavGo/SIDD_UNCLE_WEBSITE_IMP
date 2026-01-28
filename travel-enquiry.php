<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // Sanitize inputs
    $fullName     = htmlspecialchars($_POST['fullName'] ?? '');
    $email        = htmlspecialchars($_POST['email'] ?? '');
    $whatsapp     = htmlspecialchars($_POST['whatsapp'] ?? '');
    $destination  = htmlspecialchars($_POST['destination'] ?? '');
    $travelDates  = htmlspecialchars($_POST['travelDates'] ?? '');
    $vision       = htmlspecialchars($_POST['vision'] ?? '');

    $mail = new PHPMailer(true);

    try {
        // SMTP SETTINGS
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'codingbest307@gmail.com';
        $mail->Password   = 'kjpw kozk yelx pcmt';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        /* ================= ADMIN MAIL ================= */
        $mail->setFrom('codingbest307@gmail.com', 'Travel Enquiry');
        $mail->addAddress('codingbest307@gmail.com');

        $mail->Subject = 'New Travel Enquiry';
        $mail->Body = "
New Travel Enquiry Received

Name: $fullName
Email: $email
WhatsApp: $whatsapp
Destination: $destination
Travel Dates: $travelDates

Travel Vision:
$vision
";
        $mail->send();

        /* ================= USER CONFIRMATION MAIL ================= */
        $mail->clearAddresses();
        $mail->addAddress($email, $fullName);

        $mail->Subject = 'We have received your travel enquiry';
        $mail->Body = "
Hi $fullName,

Thank you for contacting us!

We have successfully received your travel enquiry with the following details:

Destination: $destination
Travel Dates: $travelDates

Our travel expert will contact you shortly on WhatsApp or email.

Warm regards,
Your Travel Team
";

        $mail->send();

        echo "<script>
                alert('Enquiry sent successfully! Please check your email.');
                window.location.href = window.location.href;
              </script>";

    } catch (Exception $e) {
        echo "<script>alert('Mail Error: {$mail->ErrorInfo}');</script>";
    }
}
header("Location: ".$_SERVER['HTTP_REFERER']);
exit;
?>
