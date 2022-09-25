<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $titulo }}</title>
    <style>
        /* referencia: https://ourcodeworld.co/articulos/leer/687/como-configurar-un-encabezado-y-pie-de-pagina-en-dompdf */
        @page {
            margin: 0cm 0cm;
        }

        /** Defina ahora los márgenes reales de cada página en el PDF **/
        body {
            margin-top: 3cm;
            margin-left: 0.5cm;
            margin-right: 0.5cm;
            margin-bottom: 2cm;
        }

        header {
            position: fixed;
            top: 0.9cm;
            left: 2cm;
            right: 2cm;
            height: 3cm;
            /* text-align: center; */
            line-height: 0.8cm;
            font-family: 'Times New Roman' !important;
        }



        * {
            font-family: 'Roboto', sans-serif;
            box-sizing: border-box;
            /* font-weight: bold; */
            font-size: 12px;
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
    </style>

</head>

<body>

    <header style="">
        <div class="row">

            <div class="col" style="width: 80%">
                <label for="">{{ $empresa[0]->RazonSocial }}</label>
            </div>
            <div class="col" style="width: 20%">
                <label for=""><?php echo date("d/m/Y"); ?></label>
            </div>
        </div>
        <div class="clear"></div>
        <div class="row">
            <div class="col" style="width: 100%; text-align: center; ">
                <strong style="font-size: 16px !important;">Número Solicitud: {{ $solicitud[0]->cCodConsecutivo }}- {{ $solicitud[0]->nConsecutivo }}</strong>
            </div>
        </div>




    </header>
    <main>

        <table style="width: 100%;">
          
            <tr>
                <td colspan="6" style="height: 5px;"> </td>
            </tr>
            <tr>
                <td style="width: 15%;"><strong>Cliente: </strong></td>
                <td colspan="2" style="width: 45%;"><strong>{{ $cliente[0]->razonsocial_cliente }}</strong></td>
                <td style="width: 10%;">Moneda: </td>
                <td colspan="2" style="width: 35%;">{{ $solicitud[0]->moneda }}</td>
            </tr>
            <tr>
                <td style="width: 15%;">Doc. del Ciente: </td>
                <td style="width: 12%;">{{ $cliente[0]->documento }}</td>
                <td style="width: 15%;">Forma de Pago: </td>
                <td style="width: 26%;">{{ $titulo }} - {{ $solicitud[0]->convenio }}</td>
                <td style="width: 6%;">Vendedor: </td>
                <td style="width: 26%;">{{ $solicitud[0]->vendedor }}</td>
            </tr>
            <tr>
                <td style="width: 15%;">Fecha Documento: </td>
                <td style="width: 12%;">{{ $solicitud[0]->fecha_solicitud_user }}</td>
                <td style="width: 15%;">Fecha Vencimiento: </td>
                <td style="width: 26%;">{{ $solicitud[0]->fecha_vencimiento_user }}</td>
                <td style="width: 6%;">Estado: </td>
                <td style="width: 26%;">{{ $solicitud[0]->estado_user }}</td>
            </tr>
            <tr>
                <td style="width: 20%;">Comentarios: </td>
                <td colspan="5" style="width: 80%;">{{ $solicitud[0]->comentarios }}</td>
            </tr>
           
        </table>
        <br>


        <table style="width: 100%; border: 1px solid black !important; font-size: 10px !important;">
            <tr style="">
                <td style="border-bottom: 1px solid black; border-right: 1px solid black;">#</td>
                <td style="border-bottom: 1px solid black; border-right: 1px solid black;">Código</td>
                <td style="border-bottom: 1px solid black; border-right: 1px solid black;">Descripción</td>
                <td style="border-bottom: 1px solid black; border-right: 1px solid black;">Und</td>
                <td style="border-bottom: 1px solid black; border-right: 1px solid black;">Cantidad</td>
                <td style="border-bottom: 1px solid black; border-right: 1px solid black;">P. Unit.</td>
                <td style="border-bottom: 1px solid black;">Monto Total</td>

            </tr>

            <?php
            // $total_importe = 0;
            // $total_interes = 0;
            // $total = 0;
            // $total_amortizacion = 0;
            // $total_saldo = 0;
            $i = 1;
            foreach ($solicitud_articulo as $key => $value) {
                // $total_importe += (float)$value->valor_cuota;
                // $total += (float)($value->int_moratorio + $value->valor_cuota);
                // $total_amortizacion += (float)$value->monto_pago;
                // $total_saldo += (float)$value->saldo_cuota;
                echo '<tr>';
                echo '  <td>' . $i . '</td>';
                echo '  <td>' . $value->idproducto . '</td>';
                if(empty($value->descripcion_articulo)) {

                    echo '  <td>' . $value->producto . '</td>';
                } else {
                    echo '  <td>' . $value->descripcion_articulo . '</td>';
                }
               
                echo '  <td>' . $value->unidad_medida . '</td>';
                echo '  <td>' . $value->cantidad . '</td>';

                echo '  <td>' . $value->precio_unitario . '</td>';
                echo '  <td>' . $value->precio_total . '</td>';


                echo '</tr>';

                $i++;
            }
            // echo '<tr>';
            // echo '  <td style="border-top: 1px solid black;"></td>';
            // echo '  <td style="border-top: 1px solid black;"></td>';
            // echo '  <td style="border-top: 1px solid black;"></td>';
            // echo '  <td style="border-top: 1px solid black;">'.$total_importe.'</td>';
            // echo '  <td style="border-top: 1px solid black;">'.$total_interes.'</td>';
            // echo '  <td style="border-top: 1px solid black;">'.$total.'</td>';
            // echo '  <td style="border-top: 1px solid black;">'.$total_amortizacion.'</td>';
            // echo '  <td style="border-top: 1px solid black;">'.$total_saldo.'</td>';
            // echo '  <td style="border-top: 1px solid black;"></td>';
            // echo '  <td style="border-top: 1px solid black;"></td>';
            // echo '  <td style="border-top: 1px solid black;"></td>';
            // echo '</tr>';
            ?>
        </table>
        

            <br>
        <table style="width: 100%;">
            <tr>
                <td style="width: 70%;"></td>
                <td style="width: 30%;">
                    <table style="width: 100%;">
                        <tr>
                            <td>Monto Afecto</td>
                            <td align="right">
                                <?php 
                                    if($solicitud[0]->t_impuestos > 0) {
                                        echo $solicitud[0]->t_monto_afecto;
                                    }
                                ?>
                            </td>
                        </tr>
                        <tr>
                            <td>Monto No Afecto</td>
                            <td align="right">
                                <?php 
                                    if($solicitud[0]->t_impuestos <= 0) {
                                        echo $solicitud[0]->t_monto_exonerado;
                                    }
                                ?>
                            </td>
                        </tr>
                        <tr>
                            <td>(-) Descuentos</td>
                            <td align="right">
                                <?php echo (float)$solicitud[0]->monto_descuento_detalle + (float)$solicitud[0]->t_monto_descuento; ?> 
                            </td>
                        </tr>
                        <tr>
                            <td>(+) Impuestos</td>
                            <td align="right">{{ $solicitud[0]->t_impuestos }}</td>
                        </tr>

                        <tr>
                            <td style="border-top: 1px solid black;"><strong>Monto Total</strong></td>
                            <td style="border-top: 1px solid black;" align="right"><strong>{{ $solicitud[0]->t_monto_total }}</strong></td>
                        </tr>
                    </table>
            
                </td>
               
            </tr>
        </table>

    




    </main>

</body>

</html>