<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cronograma</title>
    <style>
        
        /* referencia: https://ourcodeworld.co/articulos/leer/687/como-configurar-un-encabezado-y-pie-de-pagina-en-dompdf */
        @page {
            margin: 0cm 0cm;
        }

        /** Defina ahora los márgenes reales de cada página en el PDF **/
        body {
            margin-top: 1.5cm;
            margin-left: 0.5cm;
            margin-right: 0.5cm;
            margin-bottom: 2cm;
        }
            
        header {
            position: fixed;
            top: 0.2cm;
            left: 2cm;
            right: 2cm;
            height: 1.3cm;
            /* text-align: center; */
            /* line-height: 0.8cm; */
            font-family: 'Times New Roman' !important;
        }



        * {
            font-family: 'Roboto', sans-serif;
            box-sizing: border-box;
            /* font-weight: bold; */
            font-size: 8px;
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
        

        h2, h3, h4, h5 {
            /* text-align: center !important; */
            margin: 2px 0;
            /* padding-botton: 2px; */
			
        }
        /* hr {
            border: none;
        } */
    </style>
   
</head>
<body>

    <header style="">
        <div class="row">
            <div class="col" style="width: 100%; text-align: center; ">
                <strong style="font-size: 16px !important;">Aprobación Credito</strong>
            </div>
        </div>
        <div class="clear"></div>
        <div class="row">
            <div class="col" style="width: 15%">
                <label for="">Denominación: </label>
            </div>
            <div class="col" style="width: 80%">
                <label for="">{{ $empresa[0]->RazonSocial }} - {{ $empresa[0]->Direccion }}</label>
            </div>
            <div class="col" style="width: 5%">
                <label for=""><?php echo date("d/m/Y"); ?></label>
            </div>
        </div>
        
       
    </header>
    <main>
        <hr>
        <table style="width: 100%;">
            <tr>
                <td style="width: 10%;"></td>
                <td style="width: 45%;">
                    <table style="width: 100%;">
                        <tr>
                            <td colspan="2" style="width: 100%; font-size:9px!important;"><strong>DATOS DEL SOLICITANTE</strong></td>
                        </tr>
                        <tr >
                            <td colspan="2" style="height: 5px;"> </td>
                        </tr>
                        <tr >
                            <td style="width: 20%;">CLIENTE</td>
                            <td style="width: 80%;">{{ $cliente[0]->razonsocial_cliente }}</td>
                        </tr>
                        <tr>
                            <td style="width: 20%;">DNI/RUC</td>
                            <td style="width: 80%;">{{ $cliente[0]->documento }}</td>
                        </tr>
                        <tr>
                            <td style="width: 20%;">DIRECCIÓN</td>
                            <td style="width: 80%;">{{ $cliente[0]->direccion }}</td>
                        </tr>
                        <tr>
                            <td style="width: 20%;">TLF.</td>
                            <td style="width: 80%;">{{ $cliente[0]->telefono }}</td>
                        </tr>
                        <tr>
                            <td style="width: 20%;">REFERENCIA</td>
                            <td style="width: 80%;">{{ $cliente[0]->direccion }}</td>
                        </tr>
                        <tr>
                            <td style="width: 20%;">CONYUGUE</td>
                            <td style="width: 80%;"><?php echo (isset($conyugue[0]->cNombrePersona)) ? $conyugue[0]->cNombrePersona : ""; ?></td>
                        </tr>
                        <tr>
                            <td style="width: 20%;">CODIGO</td>
                            <td style="width: 80%;"><?php echo (isset($conyugue[0]->idPersona)) ? $conyugue[0]->idPersona : ""; ?></td>
                        </tr>
                    </table>   
                </td>
                <td style="width: 45%;">
                    <table style="width: 100%;">
                        <tr>
                            <td colspan="2" style="width: 100%; font-size:9px!important;" ><strong>DATOS DEL AVAL</strong></td>
                        </tr>
                        <tr >
                            <td colspan="2" style="height: 5px;"> </td>
                        </tr>
                        <tr >
                            <td style="width: 20%;">NOMBRE</td>
                            <td style="width: 80%;"><?php echo (isset($fiador[0]->cNombrePersona)) ? $fiador[0]->cNombrePersona : ""; ?></td>
                        </tr>
                        <tr>
                            <td style="width: 20%;">DIRECCIÓN</td>
                            <td style="width: 80%;"><?php echo (isset($fiador[0]->cDireccion)) ? $fiador[0]->cDireccion : ""; ?></td>
                        </tr>
                        <tr>
                            <td style="width: 20%;">REFERENCIA</td>
                            <td style="width: 80%;"><?php echo (isset($fiador[0]->cReferencia)) ? $fiador[0]->cReferencia : ""; ?></td>
                        </tr>
                        <tr>
                            <td style="width: 20%;">CONYUGUE</td>
                            <td style="width: 80%;"><?php echo (isset($fiadorconyugue[0]->cNombrePersona)) ? $fiadorconyugue[0]->cNombrePersona : ""; ?></td>
                        </tr>
                        <tr>
                            <td style="width: 20%;">TLF.</td>
                            <td style="width: 80%;"><?php echo (isset($fiador[0]->cCelular)) ? $fiador[0]->cCelular : ""; ?></td>
                        </tr>
                        <tr>
                            <td colspan="2"><br></td>
                        </tr>
                        <tr>
                            <td colspan="2"><br></td>
                        </tr>
                        
                    </table>   
                </td>
            </tr>
        </table>
        <hr>

        <table style="width: 100%;">
            <tr>
                <td style="width: 10%;"></td>
                <td style="width: 45%;">
                    <table style="width: 100%;">
                        <tr>
                            <td colspan="2" style="width: 100%; font-size:9px!important;"><strong>DATOS DEL CREDITO</strong></td>
                        </tr>
                        <tr >
                            <td colspan="2" style="height: 5px;"> </td>
                        </tr>
                        <tr >
                            <td style="width: 20%;">SOLICITUD N°</td>
                            <td style="width: 80%;">{{ $solicitud_credito[0]->cCodConsecutivo }}-{{ $solicitud_credito[0]->nConsecutivo }}</td>
                        </tr>
                        <tr>
                            <td style="width: 20%;">F. EMISIÓN</td>
                            <td style="width: 80%;">{{ $solicitud[0]->fecha_solicitud_user }}</td>
                        </tr>
                        <tr>
                            <td style="width: 20%;">N° GUIA:</td>
                            <td style="width: 80%;"></td>
                        </tr>
                        <tr>
                            <td style="width: 20%;">N° DOC:</td>
                            <td style="width: 80%;"><?php echo (isset($venta[0])) ? $venta[0]->serie_comprobante : ""; ?>-<?php echo (isset($venta[0])) ? $venta[0]->numero_comprobante : ""; ?></td>
                        </tr>
                        <tr>
                            <td style="width: 20%;">N° Cuotas:</td>
                            <td style="width: 80%;">{{ $solicitud_credito[0]->nro_cuotas }}</td>
                        </tr>
                        <tr>
                            <td style="width: 20%;">F. Pago</td>
                            <td style="width: 80%;">Crédito de {{ $solicitud_credito[0]->nro_cuotas }} Meses</td>
                        </tr>
                        <tr>
                            <td style="width: 20%;">C. INICIAL:</td>
                            <td style="width: 80%;"><?php echo number_format($solicitud_credito[0]->cuota_inicial, 2); ?></td>
                        </tr>
                        <tr>
                            <td style="width: 20%;">ACTA. INI:</td>
                            <td style="width: 80%;"><?php echo number_format($solicitud_credito[0]->cuota_inicial, 2); ?></td>
                        </tr>
                        <tr>
                            <td style="width: 20%;">TOTAL:</td>
                            <td style="width: 80%;"><?php echo number_format($solicitud[0]->t_monto_total, 2); ?></td>
                        </tr>
                        <tr>
                            <td style="width: 20%;">VENDEDOR</td>
                            <td style="width: 80%;">{{ $solicitud[0]->vendedor }}</td>
                        </tr>
                    </table>   
                </td>
                <td style="width: 45%;">
                    <table style="width: 100%;">
                        <tr>
                            <td colspan="2" style="width: 100%; font-size:9px!important;"><strong>DATOS DEL BIEN</strong></td>
                        </tr>
                        <tr >
                            <td colspan="2" style="height: 5px;"> </td>
                        </tr>
                        <tr >
                            <td style="width: 20%;">CATEGORIA</td>
                            <td style="width: 80%;"><?php echo (isset($producto[0]->idCatVeh)) ? $producto[0]->idCatVeh : ""; ?></td>
                        </tr>
                        <tr>
                            <td style="width: 20%;">MARCA</td>
                            <td style="width: 80%;"><?php echo (isset($producto[0]->marca)) ? $producto[0]->marca : ""; ?></td>
                        </tr>
                        <tr>
                            <td style="width: 20%;">CLASE</td>
                            <td style="width: 80%;"><?php echo (isset($producto[0]->modelo)) ? $producto[0]->modelo : ""; ?></td>
                        </tr>
                        <tr>
                            <td style="width: 20%;">MOTOR</td>
                            <td style="width: 80%;"><?php echo (isset($producto[0]->motor)) ? $producto[0]->motor : ""; ?></td>
                        </tr>
                        <tr>
                            <td style="width: 20%;">COLOR</td>
                            <td style="width: 80%;"><?php echo (isset($producto[0]->color)) ? $producto[0]->color : ""; ?></td>
                        </tr>
                        <tr>
                            <td style="width: 20%;">SERIE</td>
                            <td style="width: 80%;"><?php echo (isset($producto[0]->serie)) ? $producto[0]->serie : ""; ?></td>
                        </tr>
                        <tr>
                            <td colspan="2"><br></td>
                        </tr>
                        <tr>
                            <td colspan="2"><br></td>
                        </tr>
                        <tr>
                            <td colspan="2"><br></td>
                        </tr>
                        <tr>
                            <td colspan="2"><br></td>
                        </tr>
                        
                    </table>   
                </td>
            </tr>
            
           
        </table>
        <hr>
        <table style="width: 100%; border: 1px solid black !important; font-size: 8px !important;" >
            <tr style="">
                <td style="border-bottom: 1px solid black;">F. VENCE</td>
                <td style="border-bottom: 1px solid black;">CUOTA</td>
                <td style="border-bottom: 1px solid black;">D. MORA</td>
                <td style="border-bottom: 1px solid black;">IMPORTE</td>
                <td style="border-bottom: 1px solid black;">INTERES</td>
                <td style="border-bottom: 1px solid black;">TOTAL</td>
                <td style="border-bottom: 1px solid black;">AMOTIZ.</td>
                <td style="border-bottom: 1px solid black;">SALDO</td>
                <td style="border-bottom: 1px solid black;">EST.</td>
                <td style="border-bottom: 1px solid black;">FECH. PAGO</td>
                <td style="border-bottom: 1px solid black;">IMPORTE</td>
            </tr>
            
            <?php 
                $total_importe = 0;
                $total_interes = 0;
                $total = 0;
                $total_amortizacion = 0;
                $total_saldo = 0;
                foreach ($solicitud_cronograma as $key => $value) {
                    $total_importe += (float)$value->valor_cuota;
                    $total += (float)($value->int_moratorio + $value->valor_cuota);
                    $subtotal = (float)($value->int_moratorio + $value->valor_cuota);
                    $total_amortizacion += (float)$value->monto_pago;
                    $total_saldo += (float)$value->saldo_cuota;
                    $fecha_ultimo_pago = (isset($value->ultimo_pago_x_cuota[0])) ? $value->ultimo_pago_x_cuota[0]->fecha_emision : "-.-";
                    $monto_ultimo_pago = (isset($value->ultimo_pago_x_cuota[0])) ? $value->ultimo_pago_x_cuota[0]->monto_total : 0;
                    echo '<tr>';
                    echo '  <td>'.$value->fecha_vencimiento.'</td>';
                    echo '  <td>'.$value->nrocuota.'</td>';
                    echo '  <td>'.number_format($value->int_moratorio, 2).'</td>';
                    echo '  <td>'.number_format($value->valor_cuota, 2).'</td>';
                    echo '  <td>0.00</td>';
                    echo '  <td>'.number_format($subtotal, 2).'</td>';
                    echo '  <td>'.number_format($value->monto_pago, 2).'</td>';
                    echo '  <td>'.number_format($value->saldo_cuota, 2).'</td>';
                    echo '  <td>'.$value->estado.'</td>';
                    echo '  <td></td>';
                    // echo '  <td>'.$fecha_ultimo_pago.'</td>';
                    echo '  <td></td>';
                    // echo '  <td>'.number_format($monto_ultimo_pago, 2).'</td>';

                    echo '</tr>';

                    foreach ($value->pagos as $kp => $vp) {
                        echo '<tr>';
                        echo '  <td></td>';
                        echo '  <td></td>';
                        echo '  <td></td>';
                        echo '  <td></td>';
                        echo '  <td></td>';
                        echo '  <td></td>';
                        echo '  <td></td>';
                        echo '  <td></td>';
                        echo '  <td>'.$vp->serie_comprobante.'-'.$vp->numero_comprobante.'</td>';
                        echo '  <td>'.$vp->fecha_emision.'</td>';
                        echo '  <td>'.number_format($vp->monto_total, 2).'</td>';

                        echo '</tr>';
                    }

                }
                echo '<tr>';
                echo '  <td style="border-top: 1px solid black;"></td>';
                echo '  <td style="border-top: 1px solid black;"></td>';
                echo '  <td style="border-top: 1px solid black;"></td>';
                echo '  <td style="border-top: 1px solid black;">'.number_format($total_importe, 2).'</td>';
                echo '  <td style="border-top: 1px solid black;">'.number_format($total_interes, 2).'</td>';
                echo '  <td style="border-top: 1px solid black;">'.number_format($total, 2).'</td>';
                echo '  <td style="border-top: 1px solid black;">'.number_format($total_amortizacion, 2).'</td>';
                echo '  <td style="border-top: 1px solid black;">'.number_format($total_saldo, 2).'</td>';
                echo '  <td style="border-top: 1px solid black;"></td>';
                echo '  <td style="border-top: 1px solid black;"></td>';
                echo '  <td style="border-top: 1px solid black;"></td>';
                echo '</tr>';
            ?>
        </table>
        <br>
        <table style="width: 98%;">
            <tr>
                <td colspan="6" style="font-size: 15px;"><strong>IMPORTANTE</strong></td>
            </tr>
            <tr>
                <td colspan="6" style="text-align: justify; font-size: 9px !important;">Señor cliente, se le recomienda pagar puntualmente para evitar cobro de interes y gastos.
                <!-- Los retrasos seran grabados con intereses. <strong>Señor cliente agradecemos realizar los pagos en caja ubicada en la oficina de la empresa, o a su gestor de cobranza de ninguna manera al vendedor y/o terceras personas, la empresa no se responsabiliza en caso omiso a esta aclaración.</strong><br>La tarjeta de propiedad no es una cortesía que otorgamos a nuestros clientes el mismo que se encuentra sujeta a los criterios autónomos de cada registrador público, por lo tanto nuestra empresa no se hace responsable por las demoras ocacionadas en el criterio del proceso registral, así como tampoco a demoras atribuidos a certificaciones, inscripciones de garantias y pagos atrasados. -->
                <span style="">Agradeceremos realizar los pagos en caja ubicada en la oficina de la empresa, a su gestor de cobranza, de ninguna manera pagar al vendedor y/o terceras personas. La empresa nos responsabiliza en caso omiso a esta aclaración. También puede realizar sus pagos en las siguientes cuentas:</span>
                </td>
            </tr>
            <tr>
                <td colspan="6" style="height: 5px;"></td>
            </tr>
            <tr style="">
                <td >BBVA CONTINENTAL SOLES</td>
                <td style="width: 2px">:</td>
                <td style="border-right: 1px solid black;">0011-0310-0100054219</td>
                <td>BANCO DE LA NACION SOLES</td>
                <td style="width: 2px">:</td>
                <td>00-541-056637</td>
            </tr>
            <tr>
                <td>BCP CUENTA RECAUDADORA</td>
                <td style="width: 2px">:</td>
                <td style="border-right: 1px solid black;">550-1683963-0-80 AGENTE 15286</td>
                <td>CUENTA RECAUDADORA BBVA SOLES</td>
                <td style="width: 2px">:</td>
                <td>2664 BANCO FUERA DE TARAPOTO</td>
            </tr>
            <tr>
                <td>CAJA PIURA</td>
                <td style="width: 2px">:</td>
                <td style="border-right: 1px solid black;">110-01-2613976</td>
                <td>BBVA CONTINENTAL DOLARES</td>
                <td style="width: 2px">:</td>
                <td>001-0310-0100054464</td>
            </tr>
            <tr>
                <td>SCOTIABANK SOLES</td>
                <td style="width: 2px">:</td>
                <td style="border-right: 1px solid black;">000-5719283</td>
                <td>CUENTA RECAUDADORA BBVA DOLARES</td>
                <td style="width: 2px">:</td>
                <td>2665</td>
            </tr>
            <tr>
                <td colspan="6" style="height: 5px;"></td>
            </tr>
            <tr>
                <td colspan="6" style="text-align: justify;">
                <strong>Comunicar el deposito al Nro de celular 942 489 028</strong>
                </td>
            </tr>

        
        </table>
       

        <table style="width: 100%;">
            <tr>
                <td style="width: 88%;"></td>
                <td style="width: 10%; height: 100px; border: 1px solid black;"></td>
                <td style="width: 2%;"></td>
            </tr>
        </table>

        <div class="clear"></div>
    
        <div class="row" style="">
            <div class="col" style="width: 48%;">
                <center>
                    
                    <label for="" style="border-top: 1px solid black; width: 100%; padding-top: 5px; display: block;">EL CONSECIONARIO</label>
                </center>
            </div>
            <div class="col" style="width: 4%;"></div>
            <div class="col" style="width: 48%;">
                
                <center >
                   
                    <label for="" style="border-top: 1px solid black; width: 100%; padding-top: 5px; display: block;">EL CLIENTE: {{ $cliente[0]->razonsocial_cliente }} <br> DNI/RUC: {{ $cliente[0]->documento }} </label>
                    
                </center>
               
            </div>
            
         
        </div>
       
        


        
    </main>
    
</body>
</html>