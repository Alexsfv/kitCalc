<?php 
require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$name = $_POST['name'];
$phone = $_POST['phone'];

$mail->isSMTP();
$mail->Host = 'smtp.mail.ru';  													

$mail->SMTPAuth = true;
$mail->Username = 'a3mmgs5s@mail.ru';
$mail->Password = 'cfyz4545';
$mail->SMTPSecure = 'ssl';
$mail->Port = 465;
$mail->setFrom('a3mmgs5s@mail.ru');
$mail->addAddress('safronov.sanya37@gmail.com');
$mail->isHTML(true);

$mail->Subject = 'Калькулятор';
$mail->Body    = '' .$name . ' оставил заявку, его телефон ' .$phone;
$mail->AltBody = '';

if(!$mail->send()) {
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo '1';
}
?>