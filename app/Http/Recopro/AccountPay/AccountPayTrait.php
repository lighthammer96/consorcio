<?php

namespace App\Http\Recopro\AccountPay;

trait AccountPayTrait
{
    public function verifySunat($ruc, $dt, $series, $nro_doc, $date, $total)
    {
        $url = 'https://e-factura.tuscomprobantes.pe/wsconsulta/cpes/' . $ruc . '/' . $dt . '/' . $series .
            '/' . $nro_doc . '/' . $date . '/' . $total;
        $user_agent = 'Mozilla/5.0 (Windows NT 6.1; rv:8.0) Gecko/20100101 Firefox/8.0';
        $options = [
//            CURLOPT_HTTPHEADER => ['Content-Type:application/json', 'Authorization: Bearer ' . $token],
            CURLOPT_CUSTOMREQUEST => "GET", //set request type post or get
            CURLOPT_POST => false, //set to GET
            CURLOPT_USERAGENT => $user_agent, //set user agent
            CURLOPT_COOKIEFILE => "cookie.txt", //set cookie file
            CURLOPT_COOKIEJAR => "cookie.txt", //set cookie jar
            CURLOPT_RETURNTRANSFER => true, // return web page
            CURLOPT_HEADER => false, // don't return headers
            CURLOPT_FOLLOWLOCATION => true, // follow redirects
            CURLOPT_ENCODING => "", // handle all encodings
            CURLOPT_AUTOREFERER => true, // set referer on redirect
            CURLOPT_CONNECTTIMEOUT => 120, // timeout on connect
            CURLOPT_TIMEOUT => 120, // timeout on response
            CURLOPT_MAXREDIRS => 10, // stop after 10 redirects
            CURLOPT_SSL_VERIFYHOST => 0,
            CURLOPT_SSL_VERIFYPEER => 0,
        ];
        $ch = curl_init($url);
        curl_setopt_array($ch, $options);
        $content = curl_exec($ch);
        curl_close($ch);
        $content = json_decode($content, true);

        $valid = (isset($content['data']) && isset($content['data']['estadoCp']) && $content['data']['estadoCp'] == 1);

        if (!$valid) {
            throw new \Exception('El documento no ha sido emitido en SUNAT');
        }
    }
}