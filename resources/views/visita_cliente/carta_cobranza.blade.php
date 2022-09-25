<?php  date_default_timezone_set('America/Lima'); $mes = array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"); ?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Carta Cobranza</title>
    <style>
        
        /* referencia: https://ourcodeworld.co/articulos/leer/687/como-configurar-un-encabezado-y-pie-de-pagina-en-dompdf */
        @page {
            margin: 0cm 0cm;
        }

        /** Defina ahora los márgenes reales de cada página en el PDF **/
        body {
            margin-top: 6.7cm;
            margin-left: 2cm;
            margin-right: 2cm;
            margin-bottom: 2cm;
        }
            
        header {
            position: fixed;
            top: 0.9cm;
            left: 2cm;
            right: 2cm;
            height: 7.2cm;
            /* text-align: center; */
            line-height: 0.8cm;
            font-family: 'Times New Roman' !important;
        }

        footer {
            position: fixed; 
            bottom: -60px; 
            left: 2cm;
            right: 2cm;
            height: 150px; 
            /* border: 1px solid black; */

            /** Extra personal styles **/
            /* background-color: #03a9f4;
            color: white; */
            /* text-align: center; */
            /* line-height: 35px; */
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
        

        h2, h3, h4, h5 {
            /* text-align: center !important; */
            margin: 2px 0;
            /* padding-botton: 2px; */
			
        }
    </style>
   
</head>
<body>

    <header style="">
        <div class="row">
            <div class="col" style="width: 40%; /*border: 1px solid black;*/ text-align: center;">
                <img style="width: 100%; height: 123px;" src="<?php echo public_path($empresa[0]->ruta_logo); ?>" alt="">
                
            </div>
            <div class="col" style="width: 60%; text-align: center; font-weight: bold; font-size: 30px; /*border: 1px solid black;*/ line-height: 60px;">
               
              
            </div>
        </div>
        <div class="clear"></div>
        <div class="row" style="line-height: 20px; ">
            <div class="col" style="width: 100%;">
            {{ $empresa[0]->RazonSocial }}<br>
            {{ $empresa[0]->Direccion }} TELEFONO:  {{ $empresa[0]->Telefono1 }}<br>
            <strong>Email: </strong>{{ $empresa[0]->Correo }} &nbsp;&nbsp;&nbsp; GESTOR: {{ $visita_cliente[0]->cobrador }} &nbsp;&nbsp;&nbsp; TARAPOTO, <?php echo date("d"). " de ".$mes[date("m")-1]. " del ".date("Y"); ?><br>
                
            </div>
          
        </div>
        
        
       
    </header>
    <!-- <div class="clear"></div> -->
    
    <main>  
        <?php 
            foreach ($solicitudes as $ks => $vs) { 
                if($vs->primera_cuota_vencida->dias_mora > 0 && $vs->primera_cuota_vencida->dias_mora <= $parametro_1) { //15 Días de mora máximo (hasta) para emitir carta cobranza 1
              
                
                
        ?>
            
                    <div class="row" style="margin-top: 0px; margin-bottom: 10px; text-align: center; font-size: 20px !important;">
                        <div class="col" style="width: 100%;">
                            <h3 style="text-decoration: underline;">AVISO RECORDATORIO DE RETRASO EN PAGO DE CREDITO</h3>
                        </div>
                    </div>
                    <br>
                    <div class="clear"></div>
                    <div class="row-sm" >
                        <div class="col" style="width: 20%;">
                            <label for="">Sr. (a) : </label>
                        </div>
                        <div class="col" style="width: 80%;">
                            <label for="">{{ $vs->razonsocial_cliente }}</label>
                        </div>
                       
                    </div>
                    <div class="clear"></div>
                    <div class="row-sm" >
                        
                        <div class="col" style="width: 20%;">
                            <label for="">Dirección : </label>
                        </div>
                        <div class="col" style="width: 80%;">
                            <label for="">{{ $vs->direccion }}</label>
                        </div>
                    </div>
                    <div class="clear"></div>
                    <br>
                    <div class="row" >

                        <div class="col" style="width: 100%; font-weight: bold; text-align: justify;">
                            <label for="" style="text-decoration: underline;">Presente:</label><br>
                            <label for="">Comunicamos a Usted que la cuota de su crédito que se detalla a continuación se encuentra con atraso a la fecha, por lo cual le agradeceremos proceda a su cancelación a fin de evitar intereses moratorios, los cuales afectarán su economía:</label>
                        </div>
                       
                    </div>
                    <div class="clear"></div>
                    <br>
                    <div class="row" >
                        
                        <div class="col" style="width: 100%; text-align: justify;">
                            <label for="">
                                N de cuenta: &nbsp;&nbsp;&nbsp;{{ $vs->cCodConsecutivo }}-{{ $vs->nConsecutivo }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Dias Mora: {{ $vs->primera_cuota_vencida->dias_mora }}<br>
                                Vencimiento: &nbsp;&nbsp;&nbsp;<?php $arr_date = explode("-", $vs->primera_cuota_vencida->fecha_vencimiento); echo $arr_date[2]. " de ".$mes[$arr_date[1]-1]." del ".$arr_date[0];  ?><br>
                                Deuda a la fecha: &nbsp;&nbsp;&nbsp;{{ $vs->Simbolo }} {{ number_format($vs->deuda, 2) }}<br>
                                Interese Moratorios: &nbsp;&nbsp;&nbsp;{{ $vs->Simbolo }} {{ number_format($vs->intereses, 2) }}<br>
                                Articulo: &nbsp;&nbsp;&nbsp;<?php echo (isset($vs->vehiculo[0])) ? $vs->vehiculo[0]->producto : ""; echo ' / '; echo (isset($vs->segunda_venta[0])) ? $vs->segunda_venta[0]->serie_comprobante."-".$vs->segunda_venta[0]->numero_comprobante : ""; ?><br>
                                F. ULT. PAGO: &nbsp;&nbsp;&nbsp;<?php echo (isset($vs->ultimo_pago_cuota[0])) ? $vs->ultimo_pago_cuota[0]->fecha_emision : ""; ?>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Cuota(s) Vencida(s): (<?php echo implode(",", $vs->cuotas_vencidas); ?>)<br>
                            </label> 
                        </div>
                       
                    </div>
                    <div class="clear"></div>
                    <br>
                    <div class="row" >
                        
                        <div class="col" style="width: 100%; text-align: justify;">
                            <label for="">Estimaremos conveniente que Usted realice el pago puntual de su cuota a la brevedad posible y así poder seguir disfrutando de los beneficios de su línea de crédito. <br> Esperando su inmediata atención, nos despedimos de Usted <br> Atentamente</label>
                        </div>
                       
                    </div>
                    <div class="clear"></div>   
                    <br>
                    <div class="row" >
                        
                        <div class="col" style="width: 100%; text-align: justify; font-size: 11px !important;">
                            <label for=""><strong>NOTA:</strong> Si al momento de recibir la presente, su cuota se encuentra cancelada, le agredeceremos aceptar nuestras disculpas, quedando sin efecto la presente comunicación. <br><strong>Todo pago se realiza en caja y/o al cobrador, la empresa no se hace responsable de existir cualquier cobro de dinero que este contemplado en las indicaciones.</strong></label>
                        </div>
                       
                    </div>
                    <br><br><br><br>
                    <div class="clear"></div>   
                    <br>
                    <div class="row" >
                        
                        <div class="col" style="width: 30%;">
                           
                            <img style="width: 100%; height: 123px;" src="<?php echo public_path($parametro_firma); ?>" alt=""><br>
                            <label for=""><center>{{ $parametro_jefe_cobranza }} <br> Jefe de Cobranzas</center></label><br>
                            
                        </div>
                       
                    </div>

        <?php 
                }
                if($vs->primera_cuota_vencida->dias_mora > $parametro_1 && $vs->primera_cuota_vencida->dias_mora <= $parametro_2) { //90 Días de mora máximo (hasta) para emitir carta cobranza 2
        ?>
                    <div class="row" style="margin-top: 0px; margin-bottom: 10px; text-align: center; font-size: 20px !important;">
                        <div class="col" style="width: 100%;">
                            <h3 style="text-decoration: underline;">AVISO DE MORA DE CREDITOS</h3>
                        </div>
                    </div>
                    <br>
                    <div class="clear"></div>
                    <div class="row-sm" >
                        <div class="col" style="width: 20%;">
                            <label for="">Sr. (a) : </label>
                        </div>
                        <div class="col" style="width: 80%;">
                            <label for="">{{ $vs->razonsocial_cliente }}</label>
                        </div>
                       
                    </div>
                    <div class="clear"></div>
                    <div class="row-sm" >
                        
                        <div class="col" style="width: 20%;">
                            <label for="">Dirección : </label>
                        </div>
                        <div class="col" style="width: 80%;">
                            <label for="">{{ $vs->direccion }}</label>
                        </div>
                    </div>
                    <div class="clear"></div>
                    <br>
                    <div class="row" >
                        
                        <div class="col" style="width: 100%; font-weight: bold; text-align: justify;">
                            <label for="">Sirva la presente para INFORMARLE que, debido al incumpplimiento en el pago de la(s) cuota(s) del crédito que se detallan a continuación, SE LE REPORTARA ANTE LA CENTRAL DE RIESGOS DEL SISTEMA FINANCIERO Y COMERCIAL, por lo que de mantenerse el impago de su cuota su CALIFICACION CREDITICIA DESCENDERIA, lo cual incidirá en su historial crediticio de manera negativa.</label>
                        </div>
                       
                    </div>
                    <div class="clear"></div>
                    <br>
                    <div class="row" >
                        
                        <div class="col" style="width: 100%; text-align: justify;">
                            <label for="">
                                N de cuenta: &nbsp;&nbsp;&nbsp;{{ $vs->cCodConsecutivo }}-{{ $vs->nConsecutivo }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Dias Mora: {{ $vs->primera_cuota_vencida->dias_mora }}<br>
                                Vencimiento: &nbsp;&nbsp;&nbsp;<?php $arr_date = explode("-", $vs->primera_cuota_vencida->fecha_vencimiento); echo $arr_date[2]. " de ".$mes[$arr_date[1]-1]." del ".$arr_date[0];  ?><br>
                                Deuda a la fecha: &nbsp;&nbsp;&nbsp;{{ $vs->Simbolo }} {{ number_format($vs->deuda, 2) }}<br>
                                Interese Moratorios: &nbsp;&nbsp;&nbsp;{{ $vs->Simbolo }} {{ number_format($vs->intereses, 2) }}<br>
                                Articulo: &nbsp;&nbsp;&nbsp;<?php echo (isset($vs->vehiculo[0])) ? $vs->vehiculo[0]->producto : ""; echo ' / '; echo (isset($vs->segunda_venta[0])) ? $vs->segunda_venta[0]->serie_comprobante."-".$vs->segunda_venta[0]->numero_comprobante : ""; ?><br>
                                F. ULT. PAGO: &nbsp;&nbsp;&nbsp;<?php echo (isset($vs->ultimo_pago_cuota[0])) ? $vs->ultimo_pago_cuota[0]->fecha_emision : ""; ?>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Cuota(s) Vencida(s): (<?php echo implode(",", $vs->cuotas_vencidas); ?>)<br>
                            </label> 
                        </div>
                       
                    </div>
                    <div class="clear"></div>
                    <br>
                    <div class="row" >
                        
                        <div class="col" style="width: 100%; text-align: justify;">
                            <label for="">Por lo tanto solicitamos a Ud. Se sirva apersonarse  a nuestras oficinas dentro del PLAZO DE 48 HORAS, a fin de regularizar el pago de la cuota en mora, mas los gastos e intereses moratorios generado. <br> De igual forma le informamos que de hacer caso omiso  a este aviso le generaría mayores intereses moratorios hasta la cancelación de su cuota.</label>
                        </div>
                       
                    </div>
                    <div class="clear"></div>   
                    <br>
                    <div class="row" >
                        
                        <div class="col" style="width: 100%; text-align: justify; font-size: 11px !important;">
                            <label for=""><strong>NOTA:</strong> Si al momento de recibir la presente, su cuota se encuentra cancelada, le agredeceremos aceptar nuestras disculpas, quedando sin efecto la presente comunicación. <br><strong>Todo pago se realiza en caja y/o al cobrador, la empresa no se hace responsable de existir cualquier cobro de dinero.</strong></label>
                        </div>
                       
                    </div>
                    <br><br><br><br>
                    <div class="clear"></div>   
                    <br>
                    <div class="row" >
                        
                        <div class="col" style="width: 30%;">
                            <label for="">Atentamente:</label><br>
                            <img style="width: 100%; height: 123px;" src="<?php echo public_path($parametro_firma); ?>" alt=""><br>
                            <label for=""><center>{{ $parametro_jefe_cobranza }} <br> Jefe de Cobranzas</center></label><br>
                            
                        </div>
                       
                    </div>




        <?php
                }
                if($vs->primera_cuota_vencida->dias_mora >= $parametro_3) { //91 Días de mora mínimo (desde) para emitir carta cobranza 3
                
        ?>
                    
                    <div class="row" style="margin-top: 0px; margin-bottom: 10px; text-align: center; font-size: 20px !important;">
                        <div class="col" style="width: 100%;">
                            <h3 style="text-decoration: underline;">REQUERIMIENTO DE PAGO EXTRA JUDICIAL</h3>
                        </div>
                    </div>
                    <br>
                    <div class="clear"></div>
                    <div class="row-sm" >
                        <div class="col" style="width: 20%;">
                            <label for="">Sr. (a) : </label>
                        </div>
                        <div class="col" style="width: 80%;">
                            <label for="">{{ $vs->razonsocial_cliente }}</label>
                        </div>
                       
                    </div>
                    <div class="clear"></div>
                    <div class="row-sm" >
                        
                        <div class="col" style="width: 20%;">
                            <label for="">Dirección : </label>
                        </div>
                        <div class="col" style="width: 80%;">
                            <label for="">{{ $vs->direccion }}</label>
                        </div>
                    </div>
                 
                    <div class="clear"></div>
                    <br>
                    <div class="row" >
                        
                        <div class="col" style="width: 100%; text-align: justify;">
                            <label for="">
                                N de cuenta: &nbsp;&nbsp;&nbsp;{{ $vs->cCodConsecutivo }}-{{ $vs->nConsecutivo }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Dias Mora: {{ $vs->primera_cuota_vencida->dias_mora }}<br>
                                Vencimiento: &nbsp;&nbsp;&nbsp;<?php $arr_date = explode("-", $vs->primera_cuota_vencida->fecha_vencimiento); echo $arr_date[2]. " de ".$mes[$arr_date[1]-1]." del ".$arr_date[0];  ?><br>
                                Deuda a la fecha: &nbsp;&nbsp;&nbsp;{{ $vs->Simbolo }} {{ number_format($vs->deuda, 2) }}<br>
                                Interese Moratorios: &nbsp;&nbsp;&nbsp;{{ $vs->Simbolo }} {{ number_format($vs->intereses, 2) }}<br>
                                Articulo: &nbsp;&nbsp;&nbsp;<?php echo (isset($vs->vehiculo[0])) ? $vs->vehiculo[0]->producto : ""; echo ' / '; echo (isset($vs->segunda_venta[0])) ? $vs->segunda_venta[0]->serie_comprobante."-".$vs->segunda_venta[0]->numero_comprobante : ""; ?><br>
                                F. ULT. PAGO: &nbsp;&nbsp;&nbsp;<?php echo (isset($vs->ultimo_pago_cuota[0])) ? $vs->ultimo_pago_cuota[0]->fecha_emision : ""; ?>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Cuota(s) Vencida(s): (<?php echo implode(",", $vs->cuotas_vencidas); ?>)<br>
                            </label> 
                        </div>
                       
                    </div>
                    <div class="clear"></div>
                    <br>
                    <div class="row" >
                        
                        <div class="col" style="width: 100%; text-align: justify;">
                            <label for="">Por medio de la presente, cumplimos con comunicarle que en el término de 48 horas procederemos a <strong>Protestar Notarialmente su Título valor para ejecutarlo (art. 70° Ley 27287)</strong>, ya que pese a nuestros constantes requerimientos, usted no ha cumplido con <strong>cancelar la deuda que mantiene con nosotros.</strong> Motivo por el cual, nos veremos obligados a iniciar un proceso Ejecutivo contra usted hasta por el monto total del crédito, más los intereses compensatorios y moratorios (art. 1242° del código civil), cargos y gastos de cobranzas acumuludas<br>
                            Caso contrario nuestros abogados iniciaran dicho proceso judicial de conformidad con lo estipulado en los <strong>artículos 1219° del código civil, 18° de la Ley de Titulos Valores y 693°, 697°, 702°, 725°, 728° del código procesal civil</strong> y procedan a ejecutar la <strong>Medida cautelar</strong>, según lo también previsto en los <strong> artículos 611°, 637°, 641° y 642° del código procesal civil, </strong> que caerán en los bienes muebles de propiedad (Art. 1868° de código procesal civil) que posteriormente serán rematados (Art. 728° del código procesal civil)<br>
                            En concordancia con lo anterior, estamos procediendo a la verificación y/o constatación de su domicilio<br> Esperando que la presente tenga oportuno conocimiento de las acciones que tomara <strong>CONSORCIO & ASOCIADOS S.A.C.</strong>Dispuesto a absolver cualquier consulta, por lo indicado a fin de solucionar su PROBLEMA DE MOROSIDAD y llegar a un acuerdo satisfactorio que detenga las acciones mencionadas líneas arriba solicitamos se acerque a la brevedad a nuestras oficinas donde será atendido por nuestro personal de negociación</label>
                        </div>
                       
                    </div>
                    
                    
                    <div class="clear"></div>   
                    <br><br>
                    <div class="row" >
                        
                        <div class="col" style="width: 30%;">
                        <label for="">Atentamente:</label><br>
                            <img style="width: 100%; height: 123px;" src="<?php echo public_path($parametro_firma); ?>" alt=""><br>
                            <label for=""><center>{{ $parametro_jefe_cobranza }} <br> Jefe de Cobranzas</center></label><br>
                            
                        </div>
                       
                    </div>
        <?php
                }
            } 
        ?>
        
            


        
        
    </main>

    <footer>
      
      
            
    </footer>
  
</body>
</html>