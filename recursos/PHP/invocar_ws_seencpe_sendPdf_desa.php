<?php
require_once 'lib/nusoap.php';
function get_header($username, $secret)
{
   // Create a unique identifier, or nonce.
   // This example is used for simplicity in demonstration. Use a method
   // that guarantees uniqueness in a production environment.
   //$nonce = md5(rand());
   //$created = date("Y-m-d H:i:s");
   //$combo_string = $nonce . $created . $secret;

   // The sha1 command is not available in all versions of PHP.
   // If your version of PHP does not support this command, use
   //openssl directly with the command:
   // echo -n <string> | openssl dgst -sha1
   //$sha1_string = sha1($combo_string);
   //$password = base64_encode($sha1_string);
   $password=$secret;
   
   $headers = '<wsse:Security xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">
      <wsse:UsernameToken xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">
         <wsse:Username>'.$username.'</wsse:Username>
         <wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">'.$password.'</wsse:Password>         
      </wsse:UsernameToken>
   </wsse:Security>';
   return $headers;
}

//$cliente=new nusoap_client("http://localhost:8080/wsseencpe/billService?wsdl",true);
$cliente=new nusoap_client("https://e-factura.tuscomprobantes.pe/wsseencpe/billService?wsdl",true);
$err = $cliente->getError();
if($err){
	die('Error: '.$err);
}
$filename='20494047943-01-F002-00001357.pdf'; //nombre del archivo txt formato [99999999999]-[99]-[A000]-99999999.txt
$pathRoot='D:/Users/Javier/Documents/app/CPE/TEST/'; //directorio local donde se generan los txt desde el sistema en PHP
//$pathRoot='C:/Users/Javier/Documents/app/ANDY/EJEMPLOS_JSON_CPE/EXONERADO/'; //directorio local donde se generan los txt desde el sistema en PHP

$username='***********'; //RUC del emisor y usuario Sol concatenado
$password='*********'; //clave sol
$contentfile=base64_encode(file_get_contents($pathRoot.$filename));
$parametros = array('fileName'=>$filename,'contentFile'=>$contentfile);
$respuesta=$cliente->call("sendPdf",$parametros,'http://service.sunat.gob.pe','',get_header($username, $password));

print_r($respuesta);

//$_strFaultString='';
//$_strContentFile='';
//foreach ($respuesta as $key => $value){
//	switch($key){
//$_strFaultCode='';
//		case 'faultcode':
//			$_strFaultCode=$value;
//			break;
//		case 'faultstring':
//			$_strFaultString=$value;
//		break;
//		case 'ticket': //DEVOLVERA UN VALOR SI ESTA TODO CORRECTO
//			$_strContentFile=$value;	
//		break;
//		default:		
//			echo 'sin respuesta';
//		break;
//		
//	}
//}
//if(!(!isset($_strFaultCode) || trim($_strFaultCode)==='')){
//	//echo $_strFaultCode;
//	//echo $_strFaultString;
//}else if(!(!isset($_strContentFile) || trim($_strContentFile)==='')){ //si esta todo correcto devuelve el xml firmado y puede extraer el valor resumen
//	echo $_strContentFile;
//	//$doc = new DOMDocument;
//	//$doc->loadXML(base64_decode(array_values($respuesta)[0]));
//	//echo $doc->getElementsByTagName('DigestValue')->item(0)->nodeValue;
//	//file_put_contents(str_replace('.json','.xml',$filename), base64_decode(array_values($respuesta)[0]));
//}
//
//


?>
