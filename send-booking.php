<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $checkin = htmlspecialchars($_POST['checkin']);
    $checkout = htmlspecialchars($_POST['checkout']);
    $guests = htmlspecialchars($_POST['guests']);
    $accommodation = htmlspecialchars($_POST['accommodation']);
    $messageText = htmlspecialchars($_POST['message']);

    $mail = new PHPMailer(true);

    try {
        // SMTP SETTINGS
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'enquiriesjourneysacross.in@gmail.com';       // 🔁 replace
        $mail->Password   = 'kjpw kozk yelx pcmt';         // 🔁 replace
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // EMAIL SETTINGS
        $mail->setFrom('enquiriesjourneysacross.in@gmail.com', 'Journeys Across');
        $mail->addAddress('enquiriesjourneysacross.in@gmail.com');

        $mail->Subject = 'New Booking Request';

        $mail->Body = "
New Booking Request

Check-in: $checkin
Check-out: $checkout
Guests: $guests
Accommodation: $accommodation

Message:
$messageText
";

        $mail->send();

        echo "<script>alert('Booking request sent successfully!'); window.location.href='index.html';</script>";

    } catch (Exception $e) {
        echo "<script>alert('Mail Error: {$mail->ErrorInfo}');</script>";
    }
}
?>
