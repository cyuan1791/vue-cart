<?php

require_once 'shared.php';

try {
  $paymentIntent = $stripe->paymentIntents->create([
    'automatic_payment_methods' => ['enabled' => true],
    'amount' => 1999,
    'currency' => 'eur',
  ]);
$clientSecret = $paymentIntent->client_secret;
    echo json_encode(['clientSecret' => $clientSecret, 'error' => ""]);
exit;

} catch (\Stripe\Exception\ApiErrorException $e) {
  http_response_code(400);
 
    echo json_encode(['clientSecret' => "", 'error' => $e->getError()->message]);
    exit;
    } catch (Exception $e) {
    error_log($e);
    http_response_code(500);
    exit;
    }