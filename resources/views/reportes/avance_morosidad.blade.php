<?php date_default_timezone_set('America/Lima');
$mes = array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"); ?>
<!DOCTYPE html>
<html lang="es">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Avance Morosidad</title>
        <style>
            /* referencia: https://ourcodeworld.co/articulos/leer/687/como-configurar-un-encabezado-y-pie-de-pagina-en-dompdf */
            @page {
                margin: 0cm 0cm;
            }

            /** Defina ahora los márgenes reales de cada página en el PDF **/
            body {

                margin-top: 4cm;
                margin-left: 0.25cm;
                margin-right: 0.25cm;
                /* border: 1px solid red; */
                /* margin-bottom: 2cm; */
            }

            header {
                position: fixed;
                top: 0.2cm;
                left: 0.25cm;
                right: 0.25cm;
                height: 3.8cm;
                /* border: 1px solid blue; */
                /* text-align: center; */
                /* line-height: 0.8cm; */
                font-family: 'Roboto', sans-serif;
            }




            * {
                font-family: 'Roboto', sans-serif;
                box-sizing: border-box;
                /* font-weight: bold; */
                font-size: 13px;
            }


            /* #contenido {
            
            width: 696px; */
            /* border: 1px solid gray */

            /* } */

            .row {
                width: 100%;
                height: 30px;
                /* margin-top: 15px; */
                /* clear: both; */
            }

            .row-sm {
                width: 100%;
                height: 20px;
                /* margin-top: 15px; */
                /* clear: both; */
            }

            .clear {
                clear: both;
            }

            .col {
                float: left;
                /* border: 1px solid black; */
            }


            h2,
            h3,
            h4,
            h5 {
                /* text-align: center !important; */
                margin: 2px 0;
                /* padding-botton: 2px; */

            }

            #tabla-header {
                border-collapse: collapse;
            }

            #tabla-header,
            #tabla-header th,
            #tabla-header td {
                border: 1px solid;
            }
        </style>

    </head>

    <body>

        <header style="">
            <div class="row">
                <div class="col" style="width: 25%; /*border: 1px solid black;*/ text-align: center;">
                    <img style="width: 100%; height: 100px;" src="<?php echo public_path($empresa[0]->ruta_logo); ?>" alt="">

                </div>
                <div class="col" style="width: 5%; line-height: 20px;">
                </div>
                <div class="col" style="width: 70%; line-height: 20px; margin-top: 10px;">

                    {{ $empresa[0]->RazonSocial }}<br>
                    {{ $empresa[0]->Direccion }} TELEFONO: {{ $empresa[0]->Telefono1 }}<br>
                    <!-- <strong>Email: </strong>{{ $empresa[0]->Correo }} &nbsp;&nbsp;&nbsp; TARAPOTO, <?php echo date("d") . " de " . $mes[date("m") - 1] . " del " . date("Y"); ?><br> -->

                    <strong>Email: </strong>{{ $empresa[0]->Correo }} &nbsp;&nbsp;&nbsp; Fecha de Corte: <?php echo date("d") . "-" . date("m") . "-" . date("Y"); ?> &nbsp;&nbsp;&nbsp; Tipo de Cambio: {{ $tipo_cambio }}<br>

                </div>
            </div>
            <div class="clear"></div>
            <div class="row" style="margin-top: 0px !important; text-align: center; font-size: 20px !important;">
                <div class="col" style="width: 100%;">
                    <h3 style="">AVANCE DE MOROSIDAD {{ $tienda }}</h3>
                </div>
            </div>
            <br>





        </header>

        <main>
            <table border="1" class="table table-bordered" style="width: 100%;">
                <thead>
                    <tr>
                        <th></th>
                        <th colspan="2">Cartera Total</th>
                    </tr>
                    <tr>
                        <th></th>
                        <th>Monto Soles</th>
                        <th>Monto Dolares</th>
                        <th>Clientes</th>
                        <th>Mora Porcentaje</th>
                    </tr>
                </thead>
                <tbody id="data-reporte">
                    <?php
                        $html = '';
                        $html .= '<tr>';
                        $html .= '   <td>[Cuentas por Vencer]</td>';
                        $html .= '   <td>' . $data["cuentas_vencer"]["monto_soles"] . '</td>';
                        $html .= '   <td>' . $data["cuentas_vencer"]["monto_dolares"] . '</td>';
                        $html .= '   <td>' . $data["cuentas_vencer"]["clientes"] . '</td>';
                        $html .= '   <td>' . $data["cuentas_vencer"]["mora_porcentaje"] . '</td>';

                        $html .= '</td>';

                        $html .= '<tr>';
                        $html .= '   <td>[Cuentas Vencidas]</td>';
                        $html .= '   <td>' . $data["cuentas_vencidas"]["monto_soles"] . '</td>';
                        $html .= '   <td>' . $data["cuentas_vencidas"]["monto_dolares"] . '</td>';
                        $html .= '   <td>' . $data["cuentas_vencidas"]["clientes"] . '</td>';
                        $html .= '   <td>' . $data["cuentas_vencidas"]["mora_porcentaje"] . '</td>';

                        $html .= '</td>';

                        $html .= '<tr>';
                        $html .= '   <td>[DE 1 a 8 días]</td>';
                        $html .= '   <td>' . $data["de_1_8"]["monto_soles"] . '</td>';
                        $html .= '   <td>' . $data["de_1_8"]["monto_dolares"] . '</td>';
                        $html .= '   <td>' . $data["de_1_8"]["clientes"] . '</td>';
                        $html .= '   <td>' . $data["de_1_8"]["mora_porcentaje"] . '</td>';

                        $html .= '</td>';

                        $html .= '<tr>';
                        $html .= '   <td>[DE 9 a 30 días]</td>';
                        $html .= '   <td>' . $data["de_9_30"]["monto_soles"] . '</td>';
                        $html .= '   <td>' . $data["de_9_30"]["monto_dolares"] . '</td>';
                        $html .= '   <td>' . $data["de_9_30"]["clientes"] . '</td>';
                        $html .= '   <td>' . $data["de_9_30"]["mora_porcentaje"] . '</td>';

                        $html .= '</td>';

                        $html .= '<tr>';
                        $html .= '   <td>[DE 31 a 60 días]</td>';
                        $html .= '   <td>' . $data["de_31_60"]["monto_soles"] . '</td>';
                        $html .= '   <td>' . $data["de_31_60"]["monto_dolares"] . '</td>';
                        $html .= '   <td>' . $data["de_31_60"]["clientes"] . '</td>';
                        $html .= '   <td>' . $data["de_31_60"]["mora_porcentaje"] . '</td>';

                        $html .= '</td>';

                        $html .= '<tr>';
                        $html .= '   <td>[DE 61 a 90 días]</td>';
                        $html .= '   <td>' . $data["de_61_90"]["monto_soles"] . '</td>';
                        $html .= '   <td>' . $data["de_61_90"]["monto_dolares"] . '</td>';
                        $html .= '   <td>' . $data["de_61_90"]["clientes"] . '</td>';
                        $html .= '   <td>' . $data["de_61_90"]["mora_porcentaje"] . '</td>';

                        $html .= '</td>';

                        $html .= '<tr>';
                        $html .= '   <td>[DE 91 a 120 días]</td>';
                        $html .= '   <td>' . $data["de_91_120"]["monto_soles"] . '</td>';
                        $html .= '   <td>' . $data["de_91_120"]["monto_dolares"] . '</td>';
                        $html .= '   <td>' . $data["de_91_120"]["clientes"] . '</td>';
                        $html .= '   <td>' . $data["de_91_120"]["mora_porcentaje"] . '</td>';

                        $html .= '</td>';

                        $html .= '<tr>';
                        $html .= '   <td>[DE 121 a 150 días]</td>';
                        $html .= '   <td>' . $data["de_121_150"]["monto_soles"] . '</td>';
                        $html .= '   <td>' . $data["de_121_150"]["monto_dolares"] . '</td>';
                        $html .= '   <td>' . $data["de_121_150"]["clientes"] . '</td>';
                        $html .= '   <td>' . $data["de_121_150"]["mora_porcentaje"] . '</td>';

                        $html .= '</td>';

                        $html .= '<tr>';
                        $html .= '   <td>[DE 151 a 270 días]</td>';
                        $html .= '   <td>' . $data["de_151_270"]["monto_soles"] . '</td>';
                        $html .= '   <td>' . $data["de_151_270"]["monto_dolares"] . '</td>';
                        $html .= '   <td>' . $data["de_151_270"]["clientes"] . '</td>';
                        $html .= '   <td>' . $data["de_151_270"]["mora_porcentaje"] . '</td>';

                        $html .= '</td>';

                        $html .= '<tr>';
                        $html .= '   <td>[DE 271 a 360 días]</td>';
                        $html .= '   <td>' . $data["de_271_360"]["monto_soles"] . '</td>';
                        $html .= '   <td>' . $data["de_271_360"]["monto_dolares"] . '</td>';
                        $html .= '   <td>' . $data["de_271_360"]["clientes"] . '</td>';
                        $html .= '   <td>' . $data["de_271_360"]["mora_porcentaje"] . '</td>';

                        $html .= '</td>';

                        $html .= '<tr>';
                        $html .= '   <td>[DE 361 a más días]</td>';
                        $html .= '   <td>' . $data["de_361"]["monto_soles"] . '</td>';
                        $html .= '   <td>' . $data["de_361"]["monto_dolares"] . '</td>';
                        $html .= '   <td>' . $data["de_361"]["clientes"] . '</td>';
                        $html .= '   <td>' . $data["de_361"]["mora_porcentaje"] . '</td>';


                        $total_monto_soles = floatval(str_replace(",", "", $data["cuentas_vencer"]["monto_soles"])) + floatval(str_replace(",", "", $data["cuentas_vencidas"]["monto_soles"]));
                        $total_monto_dolares = floatval(str_replace(",", "", $data["cuentas_vencer"]["monto_dolares"])) + floatval(str_replace(",", "", $data["cuentas_vencidas"]["monto_dolares"]));

                        $total_clientes = intval($data["cuentas_vencer"]["clientes"]) + intval($data["cuentas_vencidas"]["clientes"]);

                        $html .= '</td>';
                        $html .= '<tr>';
                        $html .= '   <th>TOTAL POR COBRAR</th>';
                        $html .= '   <th>' . number_format($total_monto_soles, 2) . '</th>';
                        $html .= '   <th>' . number_format($total_monto_dolares, 2) . '</th>';
                        $html .= '   <th>' . $total_clientes . '</th>';
                        $html .= '   <th></th>';

                        $html .= '</td>';

                        echo $html;

                    ?>
                </tbody>
            </table>




        </main>



    </body>
</html>