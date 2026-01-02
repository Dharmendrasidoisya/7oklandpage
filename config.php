<?php
session_start();

// PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer/PHPMailer.php';
require 'PHPMailer/PHPMailer/SMTP.php';

// --- Helper function ---
function clean_input($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}

// --- CRM Function ---
function sendToCRM($mailModel, $ctype) {
    $url = "https://crm.7oakdevelopers.in/ExternalInquiry2";

    $data = [
        'mailModel' => $mailModel,
        'ctype' => $ctype
    ];

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

    $response = curl_exec($ch);
    curl_close($ch);

    return $response;
}

// --- Process Form ---
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // --- Sanitize ---
    $name       = clean_input($_POST['name'] ?? '');
    $email      = clean_input($_POST['mail'] ?? '');
    $subject    = clean_input($_POST['subj'] ?? '');
    $location   = clean_input($_POST['location'] ?? '');
    $msg        = clean_input($_POST['message'] ?? '');
    $ctype      = clean_input($_POST['ctype'] ?? 'I1114');
    $btn_action = clean_input($_POST['btn_action'] ?? '');
    $btn_actiondholera = clean_input($_POST['btn_actiondholera'] ?? '');

    // --- Validation ---
    if (!preg_match("/^[a-zA-Z ]+$/", $name)) {
        echo "<script>alert('Invalid Name');history.back();</script>"; exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "<script>alert('Invalid Email');history.back();</script>"; exit;
    }

    if (empty($subject) || empty($msg)) {
        echo "<script>alert('All fields required');history.back();</script>"; exit;
    }

    // --- Email Body ---
    $messageb = "<b>Get It From 7Oak Developers</b><br><br>";
    if ($btn_action) $messageb .= "<b>Title:</b> $btn_action<br>";
    if ($btn_actiondholera) $messageb .= "<b>Title:</b> $btn_actiondholera<br>";

    $messageb .= "
        <b>Name:</b> $name<br>
        <b>Email:</b> $email<br>
        <b>Phone:</b> $subject<br>
        <b>Message:</b> $msg<br>
    ";

    // --- Send Email ---
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'mail.indiantradebird@gmail.com';
        $mail->Password = 'bvyobyztypxrdhsb';
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        $mail->setFrom('mail.indiantradebird@gmail.com', '7Oak Developers');
        $mail->addReplyTo($email);
        $mail->addBCC("rutvik@indiantradebird.com");

        $mail->Subject = 'Get It From 7Oak Developers';
        $mail->isHTML(true);
        $mail->Body = $messageb;
        $mail->send();

    } catch (Exception $e) {
        error_log($mail->ErrorInfo);
    }

    // --- LOG ---
    date_default_timezone_set('Asia/Kolkata');
    file_put_contents(
        "inquirycontactus.txt",
        "Name:$name | Email:$email | Phone:$subject | Msg:$msg | Time:" . date('Y-m-d H:i:s') . PHP_EOL,
        FILE_APPEND
    );

    // 🚀🚀🚀 FAST REDIRECT (IMPORTANT PART)
    header("Location: thankyou.html");
    header("Connection: close");
    ignore_user_abort(true);
    ob_start();
    ob_end_flush();
    flush();

    if (function_exists('fastcgi_finish_request')) {
        fastcgi_finish_request();
    }

    // --- CRM BACKGROUND CALL ---
    $mailModel = "name,$name^mail,$email^subj,$subject^location,$location^message,$msg^btn_action,$btn_action";
    sendToCRM($mailModel, $ctype);

    exit;
}
?>
