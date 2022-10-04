<?php

namespace App\Console\Commands;

use App\Http\Recopro\CajaDiariaDetalle\CajaDiariaDetalleInterface;
use App\Http\Recopro\Compania\CompaniaInterface;
use App\Http\Recopro\Customer\CustomerInterface;
use App\Http\Recopro\Persona\PersonaInterface;
use App\Http\Recopro\Solicitud\SolicitudInterface;
use App\Http\Recopro\Ventas\VentasInterface;
use Exception;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use PDF;

class CPETask extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'cpe:task';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Enviar los comprobantes y consultar el CDR';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

     // $fecha en formato yyyy-mm-dd
    public function sumar_restar_dias($fecha, $operacion, $dias)
    {

        $fecha = strtotime($operacion . $dias . " day", strtotime($fecha));
        $fecha = date("Y-m-d", $fecha);
        $date  = explode("-", $fecha);
        $mes   = $date[1];
        if ($date[1] < 0) {
            $mes = "0" . $mes;
        }

        $dia = $date[2];
        if ($date[2] < 0) {
            $dia = "0" . $dia;
        }

        return $date[0] . "-" . $mes . "-" . $dia;
    }
    public function subfijo($xx)
    { // esta función regresa un subfijo para la cifra
        $xx = trim($xx);
        $xstrlen = strlen($xx);
        if ($xstrlen == 1 || $xstrlen == 2 || $xstrlen == 3)
            $xsub = "";
        //
        if ($xstrlen == 4 || $xstrlen == 5 || $xstrlen == 6)
            $xsub = "MIL";
        //
        return $xsub;
    }


    public function convertir($xcifra)
    {
        $xarray = array(
            0 => "CERO",
            1 => "UN", "DOS", "TRES", "CUATRO", "CINCO", "SEIS", "SIETE", "OCHO", "NUEVE",
            "DIEZ", "ONCE", "DOCE", "TRECE", "CATORCE", "QUINCE", "DIECISEIS", "DIECISIETE", "DIECIOCHO", "DIECINUEVE",
            "VEINTI", 30 => "TREINTA", 40 => "CUARENTA", 50 => "CINCUENTA", 60 => "SESENTA", 70 => "SETENTA", 80 => "OCHENTA", 90 => "NOVENTA",
            100 => "CIENTO", 200 => "DOSCIENTOS", 300 => "TRESCIENTOS", 400 => "CUATROCIENTOS", 500 => "QUINIENTOS", 600 => "SEISCIENTOS", 700 => "SETECIENTOS", 800 => "OCHOCIENTOS", 900 => "NOVECIENTOS"
        );
        //
        $xcifra = trim($xcifra);
        $xlength = strlen($xcifra);
        $xpos_punto = strpos($xcifra, ".");
        $xaux_int = $xcifra;
        $xdecimales = "00";
        if (!($xpos_punto === false)) {
            if ($xpos_punto == 0) {
                $xcifra = "0" . $xcifra;
                $xpos_punto = strpos($xcifra, ".");
            }
            $xaux_int = substr($xcifra, 0, $xpos_punto); // obtengo el entero de la cifra a convertir
            $xdecimales = substr($xcifra . "00", $xpos_punto + 1, 2); // obtengo los valores decimales
        }

        $XAUX = str_pad($xaux_int, 18, " ", STR_PAD_LEFT); // ajusto la longitud de la cifra, para que sea divisible por centenas de miles (grupos de 6)
        $xcadena = "";
        for ($xz = 0; $xz < 3; $xz++) {
            $xaux = substr($XAUX, $xz * 6, 6);
            $xi = 0;
            $xlimite = 6; // inicializo el Ytador de centenas xi y establezco el límite a 6 dígitos en la parte entera
            $xexit = true; // bandera para Ytrolar el ciclo del While
            while ($xexit) {
                if ($xi == $xlimite) { // si ya llegó al límite máximo de enteros
                    break; // termina el ciclo
                }

                $x3digitos = ($xlimite - $xi) * -1; // comienzo Y los tres primeros digitos de la cifra, comenzando por la izquierda
                $xaux = substr($xaux, $x3digitos, abs($x3digitos)); // obtengo la centena (los tres dígitos)
                for ($xy = 1; $xy < 4; $xy++) { // ciclo para revisar centenas, decenas y unidades, en ese orden
                    switch ($xy) {
                        case 1: // checa las centenas
                            if (substr($xaux, 0, 3) < 100) { // si el grupo de tres dígitos es menor a una centena ( < 99) no hace nada y pasa a revisar las decenas

                            } else {
                                $key = (int) substr($xaux, 0, 3);
                                if (TRUE === array_key_exists($key, $xarray)) {  // busco si la centena es número redondo (100, 200, 300, 400, etc..)
                                    $xseek = $xarray[$key];
                                    $xsub = $this->subfijo($xaux); // devuelve el subfijo correspondiente (Millón, Millones, Mil o nada)
                                    if (substr($xaux, 0, 3) == 100)
                                        $xcadena = " " . $xcadena . " CIEN " . $xsub;
                                    else
                                        $xcadena = " " . $xcadena . " " . $xseek . " " . $xsub;
                                    $xy = 3; // la centena fue redonda, entonces termino el ciclo del for y ya no reviso decenas ni unidades
                                } else { // entra aquí si la centena no fue numero redondo (101, 253, 120, 980, etc.)
                                    $key = (int) substr($xaux, 0, 1) * 100;
                                    $xseek = $xarray[$key]; // toma el primer caracter de la centena y lo multiplica por cien y lo busca en el arreglo (para que busque 100,200,300, etc)
                                    $xcadena = " " . $xcadena . " " . $xseek;
                                } // ENDIF ($xseek)
                            } // ENDIF (substr($xaux, 0, 3) < 100)
                            break;
                        case 2: // checa las decenas (Y la misma lógica que las centenas)
                            if (substr($xaux, 1, 2) < 10) {
                            } else {
                                $key = (int) substr($xaux, 1, 2);
                                if (TRUE === array_key_exists($key, $xarray)) {
                                    $xseek = $xarray[$key];
                                    $xsub = $this->subfijo($xaux);
                                    if (substr($xaux, 1, 2) == 20)
                                        $xcadena = " " . $xcadena . " VEINTE " . $xsub;
                                    else
                                        $xcadena = " " . $xcadena . " " . $xseek . " " . $xsub;
                                    $xy = 3;
                                } else {
                                    $key = (int) substr($xaux, 1, 1) * 10;
                                    $xseek = $xarray[$key];
                                    if (20 == substr($xaux, 1, 1) * 10)
                                        $xcadena = " " . $xcadena . " " . $xseek;
                                    else
                                        $xcadena = " " . $xcadena . " " . $xseek . " Y ";
                                } // ENDIF ($xseek)
                            } // ENDIF (substr($xaux, 1, 2) < 10)
                            break;
                        case 3: // checa las unidades
                            if (substr($xaux, 2, 1) < 1) { // si la unidad es cero, ya no hace nada

                            } else {
                                $key = (int) substr($xaux, 2, 1);
                                $xseek = $xarray[$key]; // obtengo directamente el valor de la unidad (del uno al nueve)
                                $xsub = $this->subfijo($xaux);
                                $xcadena = " " . $xcadena . " " . $xseek . " " . $xsub;
                            } // ENDIF (substr($xaux, 2, 1) < 1)
                            break;
                    } // END SWITCH
                } // END FOR
                $xi = $xi + 3;
            } // ENDDO

            if (substr(trim($xcadena), -5, 5) == "ILLON") // si la cadena obtenida termina en MILLON o BILLON, entonces le agrega al final la Yjuncion DE
                $xcadena .= " DE";

            if (substr(trim($xcadena), -7, 7) == "ILLONES") // si la cadena obtenida en MILLONES o BILLONES, entoncea le agrega al final la Yjuncion DE
                $xcadena .= " DE";

            // ----------- esta línea la puedes cambiar de acuerdo a tus necesidades o a tu país -------
            if (trim($xaux) != "") {
                switch ($xz) {
                    case 0:
                        if (trim(substr($XAUX, $xz * 6, 6)) == "1")
                            $xcadena .= "UN BILLON ";
                        else
                            $xcadena .= " BILLONES ";
                        break;
                    case 1:
                        if (trim(substr($XAUX, $xz * 6, 6)) == "1")
                            $xcadena .= "UN MILLON ";
                        else
                            $xcadena .= " MILLONES ";
                        break;
                    case 2:
                        if ($xcifra < 1) {
                            $xcadena = "$xdecimales/100 SOLES";
                        }
                        if ($xcifra >= 1 && $xcifra < 2) {
                            $xcadena = "UNO Y $xdecimales/100 SOLES ";
                        }
                        if ($xcifra >= 2) {
                            $xcadena .= " Y $xdecimales/100 SOLES "; //
                        }
                        break;
                } // endswitch ($xz)
            } // ENDIF (trim($xaux) != "")
            // ------------------      en este caso, para México se usa esta leyenda     ----------------
            $xcadena = str_replace("VEINTI ", "VEINTI", $xcadena); // quito el espacio para el VEINTI, para que quede: VEINTICUATRO, VEINTIUN, VEINTIDOS, etc
            $xcadena = str_replace("  ", " ", $xcadena); // quito espacios dobles
            $xcadena = str_replace("UN UN", "UN", $xcadena); // quito la duplicidad
            $xcadena = str_replace("  ", " ", $xcadena); // quito espacios dobles
            $xcadena = str_replace("BILLON DE MILLONES", "BILLON DE", $xcadena); // corrigo la leyenda
            $xcadena = str_replace("BILLONES DE MILLONES", "BILLONES DE", $xcadena); // corrigo la leyenda
            $xcadena = str_replace("DE UN", "UN", $xcadena); // corrigo la leyenda
        } // ENDFOR ($xz)
        return trim($xcadena);
    }

    public function get_header($username, $secret)
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


    public function envio_pdf($ruta_pdf, $idventa)
    {
        $sql_url = "SELECT * FROM ERP_Parametros WHERE id=22";
        $url = DB::select($sql_url);

        if(count($url) <= 0) {
            $texto = date("Y-m-d H:i:s");
            Storage::append("log.txt", $texto." No existe el parametro URL CPE FE");
            throw new Exception("No existe el parametro URL CPE FE");
        }
        
        $cliente = new  \nusoap_client($url[0]->value, true);

        $err = $cliente->getError();
        if ($err) {
            $texto = date("Y-m-d H:i:s");
            Storage::append("log.txt", $texto.' Error: ' . $err);
            die('Error: ' . $err);
        }
        $filename = $ruta_pdf; //nombre del archivo txt formato [99999999999]-[99]-[A000]-99999999.txt
       
     

        $pathRoot = base_path("public/PDF/"); //directorio local donde se generan los txt desde el sistema en PHP
        $sql_usuario = "SELECT * FROM ERP_Parametros WHERE id=20";
        $usuario = DB::select($sql_usuario);

        if(count($usuario) <= 0) {
            $texto = date("Y-m-d H:i:s");
            Storage::append("log.txt", $texto." No existe el parametro Usuario FE (RUC del emisor y usuario Sol concatenado) !");
            throw new Exception("No existe el parametro Usuario FE (RUC del emisor y usuario Sol concatenado) !");
        }

        $sql_pass = "SELECT * FROM ERP_Parametros WHERE id=21";
        $password = DB::select($sql_pass);

        if(count($password) <= 0) {
            $texto = date("Y-m-d H:i:s");
            Storage::append("log.txt", $texto." No existe el parametro Clave FE");
            throw new Exception("No existe el parametro Clave FE");
        }

        $username = $usuario[0]->value; //RUC del emisor y usuario Sol concatenado
        $password = $password[0]->value; //clave sol
        $contentfile = base64_encode(file_get_contents($pathRoot . $filename));
        $parametros = array('fileName' => $filename, 'contentFile' => $contentfile);
        $respuesta = $cliente->call("sendPdf", $parametros, 'http://service.sunat.gob.pe', '', $this->get_header($username, $password));

        if(isset($respuesta["ticket"]) && !empty($respuesta["ticket"])) {
            $sql_update = "UPDATE ERP_Venta SET enviado_pdf=1 WHERE idventa={$idventa}";
            DB::statement($sql_update);
        }

        // print_r($respuesta); exit;
        $texto = date("Y-m-d H:i:s");
        Storage::append("log.txt", $texto." ".json_encode($respuesta));
       
    }

    public function envio_json_cpe($ruta_json, $idventa, $anulado = "N")
    {
        $sql_url = "SELECT * FROM ERP_Parametros WHERE id=22";
        $url = DB::select($sql_url);

        if(count($url) <= 0) {
            $texto = date("Y-m-d H:i:s");
            Storage::append("log.txt", $texto." No existe el parametro URL CPE FE");
            throw new Exception("No existe el parametro URL CPE FE");
        }
        
        $cliente = new  \nusoap_client($url[0]->value, true);

        $err = $cliente->getError();
        if ($err) {
            $texto = date("Y-m-d H:i:s");
            Storage::append("log.txt", $texto.' Error: ' . $err);
            die('Error: ' . $err);
        }
        $filename = $ruta_json; //nombre del archivo txt formato [99999999999]-[99]-[A000]-99999999.txt
       
        if (!file_exists(base_path("public/CPE/"))) {
            mkdir(base_path("public/CPE/"), 0777, true);
        }

        $pathRoot = base_path("public/CPE/"); //directorio local donde se generan los txt desde el sistema en PHP
        $sql_usuario = "SELECT * FROM ERP_Parametros WHERE id=20";
        $usuario = DB::select($sql_usuario);

        if(count($usuario) <= 0) {
            $texto = date("Y-m-d H:i:s");
            Storage::append("log.txt", $texto." No existe el parametro Usuario FE (RUC del emisor y usuario Sol concatenado) !");
            throw new Exception("No existe el parametro Usuario FE (RUC del emisor y usuario Sol concatenado) !");
        }

        $sql_pass = "SELECT * FROM ERP_Parametros WHERE id=21";
        $password = DB::select($sql_pass);

        if(count($password) <= 0) {
            $texto = date("Y-m-d H:i:s");
            Storage::append("log.txt", $texto." No existe el parametro Clave FE");
            throw new Exception("No existe el parametro Clave FE");
        }

        $username = $usuario[0]->value; //RUC del emisor y usuario Sol concatenado
        $password = $password[0]->value; //clave sol
        $contentfile = base64_encode(file_get_contents($pathRoot . $filename));
        $parametros = array('fileName' => $filename, 'contentFile' => $contentfile);
        $respuesta = $cliente->call("sendBill", $parametros, 'http://service.sunat.gob.pe', '', $this->get_header($username, $password));

      
        // print_r($respuesta); exit;

        $_strFaultCode = '';
        $_strFaultString = '';
        $_strContentFile = '';
        foreach ($respuesta as $key => $value) {
            switch ($key) {
                case 'faultcode':
                    $_strFaultCode = $value;
                    break;
                case 'faultstring':
                    $_strFaultString = $value;
                    break;
                case 'applicationResponse': //DEVOLVERA UN VALOR SI ESTA TODO CORRECTO
                    $_strContentFile = $value;
                    break;
                default:
                    $texto = date("Y-m-d H:i:s");
                    Storage::append("log.txt", $texto." sin respuesta");
                    $_strFaultString = "sin respuesta";
                   
                    // echo 'sin respuesta';
                    break;
            }
        }
        if (!(!isset($_strFaultCode) || trim($_strFaultCode) === '')) {
            #DEVUELVE CODIGO DE ERROR O RECHAZO
            // echo $_strFaultCode;
            // echo $_strFaultString;
            $response["status"] = "ei"; 
            $response["msg"] = $_strFaultCode.": ".$_strFaultString; 
            $texto = date("Y-m-d H:i:s");
            Storage::append("log.txt", $texto." envio_json_cpe: ".$filename." _strFaultCode: ". $_strFaultCode. " _strFaultString:".$_strFaultString);
            return response()->json($response);

        } else if (!(!isset($_strContentFile) || trim($_strContentFile) === '')) { //si esta todo correcto devuelve el xml firmado y puede extraer el valor resumen
            $doc = new \DOMDocument;
            $doc->loadXML(base64_decode(array_values($respuesta)[0]));
            // echo $doc->getElementsByTagName('DigestValue')->item(0)->nodeValue; //obtiene el valor resumen codigo unico por comprobante enviado
            //  print_R($filename); exit;
            if (!file_exists(base_path("public/XML/"))) {
                mkdir(base_path("public/XML/"), 0777, true);
            }
            file_put_contents(base_path("public/XML/") .str_replace('.json', '.xml', $filename), base64_decode(array_values($respuesta)[0])); //grava en disco el archivo xml recepcionado
            #file_put_contents(str_replace('.txt','.xml',$filename), base64_decode(array_values($respuesta)[0]));
            if($anulado == "N") {
                $sql_update = "UPDATE ERP_Venta SET enviado_cpe=1 WHERE idventa={$idventa}";
                DB::statement($sql_update);
            } else {
                $sql_update = "UPDATE ERP_Venta SET enviado_anulado=1 WHERE idventa={$idventa}";
                DB::statement($sql_update);
            }
           
        }
      
    }

    public function generar_pdf($id, CajaDiariaDetalleInterface $repo, SolicitudInterface $solicitud_repositorio, CustomerInterface $cliente_repositorio, PersonaInterface $persona_repositorio) {
       
        $array = explode("|", $id);
        $cCodConsecutivo = $array[0];
        $nConsecutivo = $array[1];
        $idventa = $array[2];
        $name = $array[3];

        $datos = array();
        $datos["venta_anticipo"] = array();
        $datos["solicitud"] = array();
        $datos["producto"] = array();
        $datos["separaciones"] = array();
        // $bool = $cCodConsecutivo != "null" && $cCodConsecutivo != "0";
        // var_dump($bool);
        if($cCodConsecutivo != "null" && $cCodConsecutivo != "0" && $nConsecutivo != "null" && $nConsecutivo != "0" && !empty($cCodConsecutivo) && !empty($nConsecutivo)) {
          
            $solicitud = $solicitud_repositorio->get_solicitud($cCodConsecutivo, $nConsecutivo);
           
            $solicitud_credito = $solicitud_repositorio->get_solicitud_credito($cCodConsecutivo, $nConsecutivo);
           
            $datos["venta_anticipo"] = $repo->get_venta_anticipo($cCodConsecutivo, $nConsecutivo); 
            $datos["solicitud_credito"] = $solicitud_credito; 
            $datos["solicitud"] = $solicitud; 
            $datos["solicitud_cronograma"] = $solicitud_repositorio->get_solicitud_cronograma($cCodConsecutivo, $nConsecutivo);
            $idconyugue = (!empty($solicitud_credito[0]->idconyugue)) ? $solicitud_credito[0]->idconyugue : "0";
            
            $datos["conyugue"] = $persona_repositorio->find($idconyugue);
    
            $idfiador = (!empty($solicitud_credito[0]->idfiador)) ? $solicitud_credito[0]->idfiador : "0";
            $datos["fiador"] = $persona_repositorio->find($idfiador);
           
            $datos["producto"] = $solicitud_repositorio->get_solicitud_articulo_vehiculo($cCodConsecutivo, $nConsecutivo);
         

            $datos["separaciones"] = $solicitud_repositorio->obtener_separaciones($cCodConsecutivo, $nConsecutivo); 
            
        }

      
     
        // $texto = date("Y-m-d H:i:s");
        // Storage::append("log.txt", $texto);
        // exit;

        $datos["empresa"] = $repo->get_empresa(); 
        // $datos["tienda"] = $repo->get_tienda(); 
        $datos["venta"] = $repo->get_venta($idventa); 
        $datos["venta_anticipo_separacion"] = array();
        if(!empty($datos["venta"][0]->idventa_separacion)) {
            $datos["venta_anticipo_separacion"] = $repo->get_venta_anticipo_separacion($datos["venta"][0]->idventa_separacion); 
        }
      
        $datos["venta_detalle"] = $repo->get_venta_detalle($idventa); 
       
        if($datos["venta"][0]->idventa_referencia != "") {
            $datos["venta_referencia"] = $repo->get_venta($datos["venta"][0]->idventa_referencia); 
            

        }
       
        // echo "<pre>";
        // print_r($datos); exit;
        
       
        
        // $datos["cajero"] = $repo->get_cajero(); 
        $datos["caja_diaria"] = $repo->get_caja_diaria(); 
        $datos["tiendas"] = $repo->get_tiendas(); 
        $datos["venta_formas_pago"] = $repo->get_venta_formas_pago($idventa); 
        // if($datos["venta_detalle"][0]->idarticulo != 1862) {
          
        // }
      
        $datos["total_letras"] = $this->convertir($datos["venta"][0]->t_monto_total); 
        $datos["cliente"] = $cliente_repositorio->find($datos["venta"][0]->idcliente);
       
   
       
        // echo "<pre>";
        // print_r($datos);
        // exit;

        $pdf = PDF::loadView("solicitud.comprobante", $datos);

        if (!file_exists(base_path("public/PDF/"))) {
            mkdir(base_path("public/PDF/"), 0777, true);
        }
       
		$path = public_path('PDF/');
		$fileName =  $name.'.pdf' ;
		$pdf->save($path . '/' . $fileName);
       
        $this->envio_pdf($fileName, $idventa);
    }

    public function generar_json_cpe($idventa, $caja_diaria_detalle_repo, $compania_repo, $solicitud_repositorio)
    {

        $json = array();
    
        $json_array = array();
        $cod_notas = array("07", "08");
        $venta_referencia = array();
        $venta = $caja_diaria_detalle_repo->get_venta($idventa);

        $fec_venc = $this->sumar_restar_dias($venta[0]->fecha_emision_server, "+", $venta[0]->dias);
        
        if(!empty($venta[0]->idventa_referencia)) {
            $venta_referencia = $caja_diaria_detalle_repo->get_venta($venta[0]->idventa_referencia);
        }
        $venta_detalle = $caja_diaria_detalle_repo->get_venta_detalle($idventa);
        $venta_anticipo = array();
        $solicitud_cronograma = array();
        $producto = array();

        
        $separaciones = array();
     
        if (!empty($venta[0]->cCodConsecutivo_solicitud) && !empty($venta[0]->nConsecutivo_solicitud)) {
            $venta_anticipo = $caja_diaria_detalle_repo->get_venta_anticipo($venta[0]->cCodConsecutivo_solicitud, $venta[0]->nConsecutivo_solicitud);
            // $solicitud_cronograma = $solicitud_repositorio->get_solicitud_cronograma($venta[0]->cCodConsecutivo_solicitud, $venta[0]->nConsecutivo_solicitud);
            $solicitud_cronograma = $solicitud_repositorio->get_solicitud_cronograma_pendientes($venta[0]->cCodConsecutivo_solicitud, $venta[0]->nConsecutivo_solicitud);

            $solicitud = $solicitud_repositorio->get_solicitud($venta[0]->cCodConsecutivo_solicitud, $venta[0]->nConsecutivo_solicitud);

            $producto = $solicitud_repositorio->get_solicitud_articulo_vehiculo($venta[0]->cCodConsecutivo_solicitud, $venta[0]->nConsecutivo_solicitud);
            
            $separaciones = $solicitud_repositorio->obtener_separaciones($venta[0]->cCodConsecutivo_solicitud, $venta[0]->nConsecutivo_solicitud); 
        }

        if(count($venta_anticipo) <= 0 && !empty($venta[0]->idventa_separacion)) {
            $venta_anticipo = $caja_diaria_detalle_repo->get_venta($venta[0]->idventa_separacion);
        }

        $empresa = $compania_repo->find("00000");
		
        $parametro_igv =  $solicitud_repositorio->get_parametro_igv();

        if (count($parametro_igv) <= 0) {
            $texto = date("Y-m-d H:i:s");
            Storage::append("log.txt", $texto.' Por favor cree el parametro IGV!');
            throw new Exception("Por favor cree el parametro IGV!");
        }

        

        $json_array["tip_doc"] = $venta[0]->IdTipoDocumento;
        $json_array["serie"] = $venta[0]->serie_comprobante;
        $json_array["correl"] = str_pad($venta[0]->numero_comprobante, 8, "0", STR_PAD_LEFT);
        $json_array["fec_emi"] = $venta[0]->fecha_emision_server;
        $json_array["cod_mon"] = $venta[0]->EquivalenciaSunat;
       
        //BOLETAS Y FACTURAS
		if($venta[0]->IdTipoDocumento == "01" || $venta[0]->IdTipoDocumento == "03") {
            $json_array["tip_oper"] = "0101";
            
            //PARA ANTICIPOS
            // if ($venta[0]->comprobante_x_saldo == "S" && $venta[0]->tipo_comprobante == "0") { 
                
            //     $json_array["fec_venc"] = $solicitud[0]->fecha_vencimiento;
            // }
        }
       

        if ($venta[0]->codcondicionpago == 1) { // contado
        
            
           
        } else { // credito
            if(count($solicitud_cronograma) > 0) {
                $json_array["fec_venc"] = $solicitud_cronograma[count($solicitud_cronograma)-1]->fecha_vencimiento_credito;
            } else {
                $json_array["fec_venc"]  = $fec_venc;
            }
        }

        

        // NOTAS DE CREDITO Y NOTAS DE DEBITO
        if($venta[0]->IdTipoDocumento == "07" || $venta[0]->IdTipoDocumento == "08" && count($venta_referencia) > 0) {
            $json_array["docmodif"]["tip_doc"] = $venta_referencia[0]->IdTipoDocumento;
            $json_array["docmodif"]["serie_correl"] = $venta_referencia[0]->serie_comprobante."-".str_pad($venta_referencia[0]->numero_comprobante, 8, "0", STR_PAD_LEFT);
            $json_array["docmodif"]["cod_ref"] = $venta[0]->idmotivo;
            $json_array["docmodif"]["descrip_motiv"] = $venta[0]->motivo_descripcion;
            $json_array["docmodif"]["fec_emi"] = $venta_referencia[0]->fecha_emision_server;
        }
        // $json_array["hora_emi"] = $venta[0]->hora_server;
        $json_array["ubl_version"] = "2.1";
        $json_array["customizacion"] = "2.0";
	
        $json_array["emisor"]["tip_doc"] = "6";
        $json_array["emisor"]["num_doc"] = $empresa->Ruc;
        $json_array["emisor"]["raz_soc"] = $empresa->RazonSocial;
        $json_array["emisor"]["dir"] = $empresa->Direccion;
        $json_array["emisor"]["cod_ubi"] = $empresa->ubigeo;
        $json_array["emisor"]["dep"] = $empresa->departamento;
        $json_array["emisor"]["prov"] = $empresa->provincia;
        $json_array["emisor"]["dist"] = $empresa->distrito;
        $json_array["emisor"]["cod_pais"] = "PE";
        $json_array["emisor"]["cod_sucur"] = "0000";

        $json_array["adquiriente"]["tip_doc"] = (string)(int)$venta[0]->tipodoc;
        $json_array["adquiriente"]["num_doc"] = $venta[0]->documento;
        $json_array["adquiriente"]["raz_soc"] = $venta[0]->razonsocial_cliente;
        $json_array["adquiriente"]["dir"] = $venta[0]->direccion;
        $json_array["adquiriente"]["cod_pais"] = "PE";

       
        $json_array["tot"]["exo"] = sprintf('%.2f', round($venta[0]->t_monto_exonerado, 2));
      
        $json_array["tot"]["imp_tot"] = sprintf('%.2f', round($venta[0]->t_monto_total, 2));
        
        $json_array["tot"]["impsto_tot"] = sprintf('%.2f', round($venta[0]->t_impuestos, 2));
        $json_array["tot"]["trib_exo"] = "0.00"; //TRIBUTOS OPERACIONES EXONERADAS
        // echo $venta[0]->comprobante_x_saldo;
      
        if ((count($venta_anticipo) > 0 && $venta[0]->comprobante_x_saldo == "S" && $venta[0]->tipo_comprobante == "0") || $venta[0]->anticipo > 0) { // por el saldo, segunda boleta y tambien ventas que han sido pagadas aplicando alguna venta por separacion
            $t_monto_total =  $solicitud[0]->t_monto_total;
            if(!empty($venta[0]->idventa_separacion)) {
                $t_monto_total = $venta[0]->t_monto_subtotal + $venta[0]->anticipo;
            }
            $json_array["tot"]["val_vent"] = sprintf('%.2f', round($t_monto_total, 2));
            $json_array["tot"]["prec_tot"] = sprintf('%.2f', round($t_monto_total, 2));
            $json_array["tot"]["antic"] = sprintf('%.2f', round($venta[0]->anticipo, 2));

           
            $factor_cd = ($venta[0]->anticipo / $t_monto_total);
             
            $json_array["cargo"][0]["cod_cd"] = "05"; // Descuentos globales por anticipos exonerados
           
            $json_array["cargo"][0]["factor_cd"] = sprintf('%.5f', round($factor_cd, 5));
            $json_array["cargo"][0]["monto_cd"] = sprintf('%.2f', round($venta[0]->anticipo, 2));
            $json_array["cargo"][0]["base_cd"] = sprintf('%.2f', round($t_monto_total, 2));

            $json_array["ant"][0]["imp_prepagado"] = sprintf('%.2f', round($venta_anticipo[0]->t_monto_total, 2));
            $tip_doc_ant = "";
           
            if($venta_anticipo[0]->IdTipoDocumento == "01") {
                $tip_doc_ant = "02";
            } elseif($venta_anticipo[0]->IdTipoDocumento == "03") {
                $tip_doc_ant = "03";
            }
            $json_array["ant"][0]["tip_doc_ant"] = $tip_doc_ant;
            $json_array["ant"][0]["serie_correl"] = $venta_anticipo[0]->serie_comprobante."-".str_pad($venta_anticipo[0]->numero_comprobante, 8, "0", STR_PAD_LEFT);;
            $json_array["ant"][0]["num_doc"] = $venta_anticipo[0]->documento;
            $json_array["ant"][0]["tip_doc"] = (string)(int)$venta_anticipo[0]->tipodoc;
            $json_array["ant"][0]["moneda"] = $venta_anticipo[0]->EquivalenciaSunat;
            $json_array["ant"][0]["fec_pago"] = $venta_anticipo[0]->fecha_emision_server;
        } else {
            $json_array["tot"]["val_vent"] = sprintf('%.2f', round($venta[0]->t_monto_total, 2));
            $json_array["tot"]["prec_tot"] = sprintf('%.2f', round($venta[0]->t_monto_total, 2));
        }
       
        if(count($separaciones) > 0) {
           
            if(!isset($json_array["ant"])) {
                $t_monto_total =  $solicitud[0]->t_monto_total;
                if(!empty($venta[0]->idventa_separacion)) {
                    $t_monto_total = $venta[0]->t_monto_subtotal + $venta[0]->anticipo;
                }
                $json_array["tot"]["val_vent"] = sprintf('%.2f', round($t_monto_total, 2));
                $json_array["tot"]["prec_tot"] = sprintf('%.2f', round($t_monto_total, 2));
                $json_array["tot"]["antic"] = sprintf('%.2f', round($venta[0]->anticipo, 2));

            
                $factor_cd = ($venta[0]->anticipo / $t_monto_total);
                
                $json_array["cargo"][0]["cod_cd"] = "05"; // Descuentos globales por anticipos exonerados
            
                $json_array["cargo"][0]["factor_cd"] = sprintf('%.5f', round($factor_cd, 5));
                $json_array["cargo"][0]["monto_cd"] = sprintf('%.2f', round($venta[0]->anticipo, 2));
                $json_array["cargo"][0]["base_cd"] = sprintf('%.2f', round($t_monto_total, 2));
                $json_array["ant"] = array();
            }
            
            foreach ($separaciones as $ks => $vs) {
                $data_ant = array();
                $data_ant["imp_prepagado"] = sprintf('%.2f', round($vs->t_monto_total, 2));
                $tip_doc_ant = "";
            
                if($vs->IdTipoDocumento == "01") {
                    $tip_doc_ant = "02";
                } elseif($vs->IdTipoDocumento == "03") {
                    $tip_doc_ant = "03";
                }


                $data_ant["tip_doc_ant"] = $tip_doc_ant;
                $data_ant["serie_correl"] = $vs->serie_comprobante."-".str_pad($vs->numero_comprobante, 8, "0", STR_PAD_LEFT);;
                $data_ant["num_doc"] = $vs->documento;
                $data_ant["tip_doc"] = (string)(int)$vs->tipodoc;
                $data_ant["moneda"] = $vs->EquivalenciaSunat;
                $data_ant["fec_pago"] = $vs->fecha_emision_server;
                array_push($json_array["ant"], $data_ant);
                
            }

          
        }
      
        if ($venta[0]->codcondicionpago == 1 && !in_array($venta[0]->IdTipoDocumento, $cod_notas)) { // contado
            $json_array["forma_pago"]["descrip"] = "Contado";
           
        } elseif(!in_array($venta[0]->IdTipoDocumento, $cod_notas)) { // credito
            $json_array["forma_pago"]["descrip"] = "Credito";
            $json_array["cuota"] = array();
            $cuotas = array();

            if(count($solicitud_cronograma) > 0) {
                $total_credito = 0;
                foreach ($solicitud_cronograma as $ksc => $vsc) {
                    $total_credito += floatval($vsc->saldo_cuota);
                }

                $json_array["forma_pago"]["monto_neto"] = sprintf('%.2f', round($total_credito, 2));
                $json_array["forma_pago"]["cod_mon"] = $venta[0]->EquivalenciaSunat;

            
                foreach ($solicitud_cronograma as $key => $value) {
                    $cuotas["descrip"] = "Cuota" . str_pad($value->nrocuota, 3, "0", STR_PAD_LEFT);
                    // $cuotas["monto_neto"] = sprintf('%.2f', round($value->valor_cuota, 2));
                    $cuotas["monto_neto"] = sprintf('%.2f', round($value->saldo_cuota, 2));
                    $cuotas["cod_mon"] = $venta[0]->EquivalenciaSunat;
                    $cuotas["fec_venc"] = $value->fecha_vencimiento_credito;

                    array_push($json_array["cuota"], $cuotas);
                }
            } else {

                $json_array["forma_pago"]["monto_neto"] = sprintf('%.2f', round($venta[0]->t_monto_total, 2));
                $json_array["forma_pago"]["cod_mon"] = $venta[0]->EquivalenciaSunat;

                $cuotas["descrip"] = "Cuota001" ;
                // $cuotas["monto_neto"] = sprintf('%.2f', round($value->valor_cuota, 2));
                $cuotas["monto_neto"] = sprintf('%.2f', round($venta[0]->t_monto_total, 2));
                $cuotas["cod_mon"] = $venta[0]->EquivalenciaSunat;
               
                $cuotas["fec_venc"] = $fec_venc;

                array_push($json_array["cuota"], $cuotas);
            }
            
        }
       
         

        $json_array["det"] = array();
      
       
        $cont = 1;

       
        $total_gratuito = 0;
        foreach ($venta_detalle as $key => $value) {
            $detalle_venta = array();
            $detalle_venta["nro_item"] = $cont;
            $detalle_venta["cod_prod"] = str_pad($value->idarticulo, 8, "0", STR_PAD_LEFT);
            $detalle_venta["cod_und_med"] =  $value->unidad_medida;
           
            // if ($venta[0]->comprobante_x_saldo == "S" && $venta[0]->tipo_comprobante == "0") {
                if(count($producto) > 0 && $value->idproducto == $producto[0]->idproducto) {
                 
                    $detalle_venta["descrip"] = $value->producto." / SERIE: ".$producto[0]->serie." / MOTOR:". $producto[0]->motor." / COLOR:". $producto[0]->color ." / AÑO:". $producto[0]->anio_fabricacion;
                } else {
                    
                    $detalle_venta["descrip"] = $value->producto;
                }
            // } else {
            //     $detalle_venta["descrip"] = $value->producto;
            // }
            
            $detalle_venta["cant"] = sprintf('%.2f', round($value->cantidad, 2));
          
            

            
            $detalle_venta["igv_item"] = sprintf('%.2f', round($value->impuestos, 2));
          
            
            if($value->cOperGrat == "S") {
                
                $precio_unitario = (floatval($value->precio_unitario) <= 0) ? 1 : floatval($value->precio_unitario);
                $sub_tot = floatval($value->cantidad) * $precio_unitario;
               
                $detalle_venta["sub_tot"] = sprintf('%.2f', round($sub_tot, 2));
                $detalle_venta["tip_afec_igv"] = "21"; // 10 con igv, 20 sin igv, 21 => Exonerado - Transferencia gratuita, catalogo 7
                $detalle_venta["val_unit_item"] = "0.00";
                $detalle_venta["prec_unit_item"] = "0.00";
                $detalle_venta["val_vta_item"] = sprintf('%.2f', round($sub_tot, 2));
                $detalle_venta["base_igv"] = sprintf('%.2f', round($sub_tot, 2));
                $detalle_venta["val_ref_unit_item"] = sprintf('%.2f', round($sub_tot, 2));
                $total_gratuito += $sub_tot;
            } else {
                $detalle_venta["val_vta_item"] = sprintf('%.2f', round($value->precio_total, 2));
                $detalle_venta["sub_tot"] = sprintf('%.2f', round($value->monto_subtotal, 2));
                $detalle_venta["tip_afec_igv"] = "20"; // 10 con igv, 20 sin igv, 21 => Exonerado - Transferencia gratuita, catalogo 7

                $detalle_venta["val_unit_item"] = sprintf('%.2f', round($value->precio_unitario, 2));
                $detalle_venta["prec_unit_item"] = sprintf('%.2f', round($value->precio_unitario, 2));
                $detalle_venta["base_igv"] = sprintf('%.2f', round($value->precio_total, 2));
            }
           
            $detalle_venta["impsto_tot"] = sprintf('%.2f', round($value->impuestos, 2));
            
            $detalle_venta["tasa_igv"] = sprintf('%.2f', round($parametro_igv[0]->value, 2));

            $cont++;
            array_push($json_array["det"], $detalle_venta);
           
        }
       
        
        if($total_gratuito > 0) {
            $json_array["tot"]["grav"] = "0.00";
            $json_array["tot"]["igv"] = "0.00";
            $json_array["tot"]["trib_exo"] = "0.00";
            $json_array["tot"]["trib_grat"] = "0.00";
            $json_array["tot"]["grat"] = sprintf('%.2f', round($total_gratuito, 2));
        }

         
        $json_array["leyen"][0]["leyen_cod"] = "1000";
        
       
        $json_array["leyen"][0]["leyen_descrip"] = $this->convertir($venta[0]->t_monto_total);
       
        if ($venta[0]->comprobante_x_saldo == "S" && $venta[0]->tipo_comprobante == "0") { // por el saldo, segunda boleta
            $json_array["leyen"][1]["leyen_cod"] = "2002";
            $json_array["leyen"][1]["leyen_descrip"] = "SERVICIOS PRESTADOS EN LA AMAZONÍA  REGIÓN SELVA PARA SER CONSUMIDOS EN LA MISMA";

            $json_array["leyen"][2]["leyen_descrip"] = "No se aceptan cambios ni devoluciones";
        } else {
            // if($venta[0]->t_monto_exonerado > 0) {
            //     $json_array["leyen"][1]["leyen_cod"] = "2001";
            //     $json_array["leyen"][1]["leyen_descrip"] = "BIENES TRANSFERIDOS EN LA AMAZONIA REGION SELVA PARA SER CONSUMIDOS EN LA MISMA";
            // }
           
        }
         
       
        if($venta[0]->IdTipoDocumento == "01" || $venta[0]->IdTipoDocumento == "03") {
            $json["invoice"] = $json_array;
        }

        if($venta[0]->IdTipoDocumento == "07" || $venta[0]->IdTipoDocumento == "08") {
            $json["creditnote"] = $json_array;
        }

        // $texto = date("Y-m-d H:i:s");
        //     Storage::append("log.txt", json_encode($json));
        //     exit;
        
        $json_encode = json_encode($json, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

        if (!file_exists(base_path("public/CPE/"))) {
            mkdir(base_path("public/CPE/"), 0777, true);
        }
       
        $name = $empresa->Ruc . "-" . $venta[0]->IdTipoDocumento . "-" . $venta[0]->serie_comprobante . "-" . str_pad($venta[0]->numero_comprobante, 8, "0", STR_PAD_LEFT);
        file_put_contents(base_path("public/CPE/") . $name . ".json", $json_encode);
       
        $this->envio_json_cpe($name . ".json", $venta[0]->idventa);
        
    }

    public function generar_json_cpe_anulados($idventa, $caja_diaria_detalle_repo, $compania_repo, $solicitud_repositorio)
    {

     
        $json["baja"] = array();

        $empresa = $compania_repo->find("00000");
        
        $venta = $caja_diaria_detalle_repo->get_venta($idventa);
        $date = explode("-", $venta[0]->fecha_anulacion_server);
        $json["baja"]["fec_ref"] = $venta[0]->fecha_emision_server;
        $json["baja"]["identificador"] = "RA-".$date[0].$date[1].$date[2]."-".$venta[0]->correlativo_anulacion;
        
        $json["baja"]["fec_gen"] = $venta[0]->fecha_anulacion_server;

        $json["baja"]["emisor"]["tip_doc"] = "6";
        $json["baja"]["emisor"]["num_doc"] = $empresa->Ruc;
        $json["baja"]["emisor"]["raz_soc"] = $empresa->RazonSocial;
        
  

        $json["baja"]["det"][0]["nro_item"] = 1;
        $json["baja"]["det"][0]["tip_doc"] = $venta[0]->IdTipoDocumento;
        $json["baja"]["det"][0]["serie"] = $venta[0]->serie_comprobante;
        $json["baja"]["det"][0]["correl"] = str_pad($venta[0]->numero_comprobante, 8, "0", STR_PAD_LEFT);
        $json["baja"]["det"][0]["motivo"] = "CANCELACION";
        
        
        
        $json_encode = json_encode($json, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

        if (!file_exists(base_path("public/CPE/"))) {
            mkdir(base_path("public/CPE/"), 0777, true);
        }
       
        $name = $empresa->Ruc ."-". $json["baja"]["identificador"];
        file_put_contents(base_path("public/CPE/") . $name . ".json", $json_encode);
       
        $this->envio_json_cpe($name . ".json", $venta[0]->idventa, "S");
        
    }

    public function consultar_cdr($documento_cpe, $anulado="N") {
        // consultar comprobantes
        // https://emite.tuscomprobantes.pe/
        // 20450106357
        // usuario: casociadmin  clave: 765419
        $sql_url = "SELECT * FROM ERP_Parametros WHERE id=22";
        $url = DB::select($sql_url);

        if(count($url) <= 0) {
            $texto = date("Y-m-d H:i:s");
            Storage::append("log.txt", $texto.' No existe el parametro URL CPE FE');
            throw new Exception("No existe el parametro URL CPE FE");
        }
        
        $cliente = new  \nusoap_client($url[0]->value, true);

        if (!file_exists(base_path("public/CDR/"))) {
            mkdir(base_path("public/CDR/"), 0777, true);
        }
        
        $err = $cliente->getError();
        if($err){
            $texto = date("Y-m-d H:i:s");
            Storage::append("log.txt", $texto.' Error: '.$err);
            die('Error: '.$err);
        }
        $filename = $documento_cpe.'.xml'; //nombre del archivo txt formato [99999999999]-[99]-[A000]-99999999.xml
        //$pathRoot = 'C:/Users/Javier/Documents/app/'; //directorio local donde se generan los xml del cdr desde el sistema en PHP 

        $sql_usuario = "SELECT * FROM ERP_Parametros WHERE id=20";
        $usuario = DB::select($sql_usuario);

        if(count($usuario) <= 0) {
            $texto = date("Y-m-d H:i:s");
            Storage::append("log.txt", $texto." No existe el parametro Usuario FE (RUC del emisor y usuario Sol concatenado) !");
            throw new Exception("No existe el parametro Usuario FE (RUC del emisor y usuario Sol concatenado) !");
        }
        
        $sql_pass = "SELECT * FROM ERP_Parametros WHERE id=21";
        $password = DB::select($sql_pass);

        if(count($password) <= 0) {
            $texto = date("Y-m-d H:i:s");
            Storage::append("log.txt", $texto." No existe el parametro Clave FE");
            throw new Exception("No existe el parametro Clave FE");
        }

        $username = $usuario[0]->value; //USUARIO DEL API por empresa, solicitar a jmariscal@seencorp.pe
        $password = $password[0]->value; //CLAVE DEL API por empresa, solicitar a jmariscal@seencorp.pe

        $parametros = array('fileName'=>$filename);
        if($anulado == "N") {
            $respuesta=$cliente->call("getStatusCdr",$parametros,'http://service.sunat.gob.pe','',$this->get_header($username, $password));
        } else {
            $respuesta=$cliente->call("getStatusBaja",$parametros,'http://service.sunat.gob.pe','',$this->get_header($username, $password));
        }
        // $texto = date("Y-m-d H:i:s");
        // Storage::append("log.txt", $texto.json_encode($respuesta));
        // exit;
            
		// print_R($respuesta);

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
                case 'statusBaja':
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
                    $texto = date("Y-m-d H:i:s");
                    Storage::append("log.txt", $texto." sin respuesta");
                    // exit;
                    // echo 'sin respuesta';
                break;
                
            }
        }

        
        ############################
        #obtener codigo 
        ############################
        // var_dump($_strFaultCode);
        // var_dump($_strContentFile);
       
        if(!(!isset($_strFaultCode) || trim($_strFaultCode)==='')){
           
            echo $_strFaultCode.'<br>'; #codigo de error|
            echo $_strFaultString.'<br>'; #descripcion del error

            $texto = date("Y-m-d H:i:s");
            Storage::append("log.txt", $texto." consultar_cdr: ".$filename." _strFaultCode: ". $_strFaultCode. " _strFaultString:".$_strFaultString);
            // exit;
        }else if(!(!isset($_strContentFile) || trim($_strContentFile)==='')){
            #cuando devuelve cdr
            $doc = new \DOMDocument;
            $doc->loadXML(base64_decode($_strContentFile));
           
            // echo $doc->getElementsByTagName('DigestValue')->item(0)->nodeValue;	#valor resumen del cdr
            // echo $_strStatusCode; #codigo de respuesta del cdr
            #graba el archuvo CDR de respuesta de SUNAT
            
            file_put_contents(base_path("public/CDR/").'R-'.$filename, base64_decode($_strContentFile));
            
        }
       
		// exit;
        return $respuesta;

    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle(VentasInterface $ventas_repo, SolicitudInterface $solicitud_repositorio, CompaniaInterface $compania_repo, CajaDiariaDetalleInterface $repo, CustomerInterface $cliente_repositorio, PersonaInterface $persona_repositorio)
    {
        // referencia: https://www.youtube.com/watch?v=0uG0B5HqiuA&ab_channel=JesusMatiz
        
        $comprobantes_pendientes_envio = $ventas_repo->obtener_comprobantes_pendientes_envio();
       
        foreach ($comprobantes_pendientes_envio as $key => $value) {
           
            $this->generar_json_cpe($value->idventa, $repo, $compania_repo, $solicitud_repositorio);

        }
        
       
        $comprobantes_pendientes_envio_pdf = $ventas_repo->obtener_comprobantes_pendientes_envio_pdf();
      
        foreach ($comprobantes_pendientes_envio_pdf as $kp=> $vp) {
            $id = $vp->cCodConsecutivo_solicitud."|".$vp->nConsecutivo_solicitud."|".$vp->idventa."|".$vp->documento_cpe;
            $this->generar_pdf($id, $repo, $solicitud_repositorio, $cliente_repositorio, $persona_repositorio);
            
           

        }
     
      
        $comprobantes = $ventas_repo->obtener_comprobantes();
     
        foreach ($comprobantes as $key => $value) {
            $res = $this->consultar_cdr($value->documento_cpe);
            if(isset($res["statusCdr"]["statusMessage"]) && isset($res["statusCdr"]["statusCode"])) {
                $statusMessage = utf8_decode(str_replace("'", "", $res["statusCdr"]["statusMessage"]));
                $sql_update = "UPDATE ERP_Venta SET statusCode='{$res["statusCdr"]["statusCode"]}', statusMessage='{$statusMessage}' WHERE idventa={$value->idventa}";
                DB::statement($sql_update);
            }
        }

       

        $comprobantes_anulados = $ventas_repo->obtener_comprobantes_anulados_pendientes();
    
        foreach ($comprobantes_anulados as $kan => $van) {
            $this->generar_json_cpe_anulados($van->idventa, $repo, $compania_repo, $solicitud_repositorio);

        }
      
        $comprobantes_baja = $ventas_repo->obtener_comprobantes_anulados();
    
        foreach ($comprobantes_baja as $kb => $vb) {
            $res = $this->consultar_cdr($vb->documento_cpe, "S");
            if(isset($res["statusBaja"]["statusMessage"]) && isset($res["statusBaja"]["statusCode"])) {
                $statusMessage = utf8_decode(str_replace("'", "", $res["statusBaja"]["statusMessage"]));
                $sql_update = "UPDATE ERP_Venta SET statusCodeBaja='{$res["statusBaja"]["statusCode"]}', statusMessageBaja='{$statusMessage}' WHERE idventa={$vb->idventa}";
                DB::statement($sql_update);
            }
           
           
        }
      
        $texto = date("Y-m-d H:i:s");
        Storage::append("log.txt", "FIN => ".$texto);
        // exit;

        
    }

   
}
