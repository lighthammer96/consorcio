<?php
//$serverName = "(local)\SQL2008"; //serverName\instanceName, portNumber (por defecto es 1433)
//$connectionInfo = ["Database"=>"recopro", "UID"=>"sa", "PWD"=>"1235"];
//$conn = sqlsrv_connect( $serverName, $connectionInfo);
//
//if( $conn ) {
//     echo "Conexión establecida.<br />";
//}else{
//     echo "Conexión no se pudo establecer.<br />";
//     echo "<pre>"; print_r( sqlsrv_errors(), true);
//}
//
use Illuminate\Support\Facades\Crypt;

//$value = Crypt::decrypt('$10$nA.g3HYxF72rbz0tHC7f6.CK/h.sFiX5KeJByxyploiUAThw1lbqO');
$decrypted = Crypt::decryptString('$10$nA.g3HYxF72rbz0tHC7f6.CK/h.sFiX5KeJByxyploiUAThw1lbqO');

