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

$cliente=new nusoap_client("https://e-factura.tuscomprobantes.pe/wsseencpe/billService?wsdl",true);
$err = $cliente->getError();
if($err){
	die('Error: '.$err);
}
$filename='20572158102-RA-20190928-103.xml'; //nombre del archivo txt formato [99999999999]-[99]-[A000]-99999999.xml
$pathRoot='C:/Users/Javier/Documents/app/'; //directorio local donde se generan los xml del cdr desde el sistema en PHP
$username='*********************'; //USUARIO DEL API por empresa, solicitar a jmariscal@seencorp.pe
$password='**********'; //CLAVE DEL API por empresa, solicitar a jmariscal@seencorp.pe

$parametros = array('fileName'=>$filename);
$respuesta=$cliente->call("getStatusCdr",$parametros,'http://service.sunat.gob.pe','',get_header($username, $password));

print_r($respuesta);
echo '<br>';

$_strFaultCode='';
$_strFaultString='';
$_strContentFile='';
$_strStatusCode='';
foreach ($respuesta as $key => $value){
	switch($key){
		case 'faultcode':
			$_strFaultCode=$value;
			break;
		case 'faultstring':
			$_strFaultString=$value;
		break;
		case 'applicationResponse':
			$_strContentFile=$value;	
		break;
		case 'statusCdr':
			foreach ($value as $key2 => $value2){
				switch($key2){
					case 'content':
						$_strContentFile=$value2;	
					break;
					case 'statusCode':
						$_strStatusCode=$value2;	
					break;
				}
			}			
		break;
		default:		
			echo 'sin respuesta';
		break;
		
	}
}
############################
#obtener codigo 
############################
if(!(!isset($_strFaultCode) || trim($_strFaultCode)==='')){
	echo $_strFaultCode.'<br>'; #codigo de error|
	echo $_strFaultString.'<br>'; #descripcion del error
}else if(!(!isset($_strContentFile) || trim($_strContentFile)==='')){
	#cuando devuelve cdr
	$doc = new DOMDocument;
	$doc->loadXML(base64_decode($_strContentFile));
	echo $doc->getElementsByTagName('DigestValue')->item(0)->nodeValue;	#valor resumen del cdr
	echo $_strStatusCode; #codigo de respuesta del cdr
	#graba el archuvo CDR de respuesta de SUNAT
	file_put_contents($pathRoot.'R-'.$filename, base64_decode($_strContentFile));
}




?>
