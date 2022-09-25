<?php  date_default_timezone_set('America/Lima'); $mes = array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"); ?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clausula</title>
    <style>
        
        /* referencia: https://ourcodeworld.co/articulos/leer/687/como-configurar-un-encabezado-y-pie-de-pagina-en-dompdf */
        @page {
            margin: 0cm 0cm;
        }

        /** Defina ahora los márgenes reales de cada página en el PDF **/
        body {
            margin-top: 2.7cm;
            margin-left: 2cm;
            margin-right: 2cm;
            margin-bottom: 2cm;
            line-height: 1cm;
        }
            
        header {
            position: fixed;
            top: 0.9cm;
            left: 2cm;
            right: 2cm;
            height: 1.8cm;
            /* text-align: center; */
            line-height: 0.8cm;
            /* border: 1px solid black; */
            font-family: 'Times New Roman' !important;
        }



        * {
            font-family: 'Roboto', sans-serif;
            box-sizing: border-box;
            /* font-weight: bold; */
            font-size: 14px;
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

    <header style="width: 100%;">

        <div class="row">
            <div class="col" style="width: 100%; text-align: center; ">
                <strong style="font-size: 16px !important;">CLAUSULA ADICIONAL DE CONTRATO DE COMPRA Y VENTA REALIZADO POR CONSORCIO & ASOCIADOS SAC, Y <br></strong>
            </div>
         
           
        </div>
       
    </header>
    <main>
         <div class="row">
            <div class="col" style="width: 100%; ">
                <label style=" display:block; width: 100%; font-size: 12px !important; border-bottom: 1px solid dashed;">{{ $cliente[0]->razonsocial_cliente }}</label>
            </div>
           
        </div>
        <div class="clear"></div>
        <div class="row">
            <div class="col"  style="width: 100%; text-align: justify; text-indent: 240px;">
                <?php 
                    $comprobante = "";
                    $condicion_pago = "";
                    $dia_emision = "";
                    $mes_emision = "";
                    $anio_emision = "";
                    if(count($segunda_venta) > 0) {
                        $comprobante = $segunda_venta[0]->serie_comprobante."-".$segunda_venta[0]->numero_comprobante;
                        if(count($solicitud) > 0)  {
                            if($solicitud[0]->tipo_solicitud == "1") {
                                $condicion_pago = "Contado";
                            } else {
                                $condicion_pago = "Crédito";
                            }
                        } else {
                            $condicion_pago = $segunda_venta[0]->condicion_pago;
                        }
                        $date = explode("/", $segunda_venta[0]->fecha_emision_user);
                       
                        $dia_emision = $date[0];
                        $mes_emision = $mes[intval($date[1]) - 1];
                        $anio_emision = $date[2];
                        // var_dump($mes[intval($date[1])]); exit;
                    }

                    $carroceria = (isset($producto[0]->carroceria)) ? $producto[0]->carroceria : "";
                    $marca = (isset($producto[0]->marca)) ? $producto[0]->marca : "";
                    $modelo = (isset($producto[0]->modelo)) ? $producto[0]->modelo : "";

                    // var_dump($condicion_pago); exit;
                ?>
                <label for="">
                    Por el Presente documento dejamos constancia que si se utilizó medio de pago, en el contrato de COMPRA - VENTA, de un vehículo automotor menor, Carroceria: {{ $carroceria }}, marca: {{ $marca }}, modelo: {{ $modelo }}, cuyas caracteristicas están señaladas en la {{ $comprobante }}, en donde la condicion de pago es: {{ $condicion_pago }}, {{ $solicitud[0]->descripcion_adicional_clausula }}
                </label>
            </div>
        </div>
        {{-- <div class="clear"></div>
        <br>
        <div class="row">
            <div class="col" style="width: 100%; border-bottom: 1px solid dashed;">
               
            </div>
           
        </div> --}}
        {{-- <div class="clear"></div>
       
        <div class="row">
            <div class="col" style="width: 100%; border-bottom: 1px solid dashed;">
               
            </div>
           
        </div> --}}
        <div class="clear"></div>

        <div class="row">
            <div class="col" style="width: 25%; ">
               <label for=""></label>
            </div>
            <div class="col" style="width: 75%;  text-align: right;">
               <label for="">De conformidad con lo indicado lineas arriba, firmamos el presente documento.</label>
            </div>
           
        </div>
        <div class="clear"></div>


        <div class="row">
            <div class="col" style="width: 60%; ">
               <label for=""></label>
            </div>
            <div class="col" style="width: 40%; text-align: right;">
               <label for="">Tarapoto, <?php echo $dia_emision; ?> de <?php  echo $mes_emision; ?> del <?php echo $anio_emision; ?></label>
            </div>
           
        </div>
        <div class="clear"></div>

        <br><br><br>
        <div class="row" style="">
            <div class="col" style="width: 48%;">
                {{-- <center>
                    
                    <label for="" style="border-top: 1px solid black; width: 100%; padding-top: 5px; display: block;">EL CONSECIONARIO</label>
                </center> --}}
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