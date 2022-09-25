<?php  date_default_timezone_set('America/Lima'); $mes = array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"); ?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reporte de Comprobantes</title>
    <style>
        
        /* referencia: https://ourcodeworld.co/articulos/leer/687/como-configurar-un-encabezado-y-pie-de-pagina-en-dompdf */
        @page {
            margin: 0cm 0cm;
        }

        /** Defina ahora los márgenes reales de cada página en el PDF **/
        body {
            margin-top: 3.6cm;
            margin-left: 0.5cm;
            margin-right: 0.5cm;
            margin-bottom: 1cm;
           
        }
            
        header {
            position: fixed;
            top: 0.2cm;
            left: 0.5cm;
            right: 0.5cm;
            height: 3.4cm;
            /* text-align: center; */
            /* line-height: 0.8cm; */
            /* font-family: 'Times New Roman' !important; */
            font-family: 'Arial' !important;
            /* border: 1px solid black; */
        }

        main {
            /* border: 1px solid blue; */
        
          
            
        
          
        }
        footer {
            /* border: 1px solid blue; */
            position: fixed; 
           
            left: 0.5cm;
            right: 0.5cm;
            height: 1cm;
            bottom: 0cm;
            /* border: 1px solid black; */

            /** Extra personal styles **/
            /* background-color: #03a9f4;
            color: white; */
            /* text-align: center; */
            /* line-height: 35px; */
        }

     
        .pagenum:before {
            content: counter(page);
        }
       



        * {
            /* font-family: 'Roboto', sans-serif; */
            font-family: 'Arial'
            /* box-sizing: border-box; */
            /* font-weight: bold; */
            font-size: 12px;
        }
        
    
        /* #contenido {
            
            width: 696px; */
            /* border: 1px solid gray */
					
        /* } */

        .row {
            width: 100%;
            height: 25px;
            /* border: 1px solid orange; */
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
            /* border: 1px solid pink; */
        }
        

        h2, h3, h4, h5 {
            /* text-align: center !important; */
            margin: 2px 0;
            /* padding-botton: 2px; */
			
        }

        hr{
            page-break-after: always;
           
            border: none;
            margin: 0;
            padding: 0;
        }

   
    </style>
   
</head>
<body>
    
    <header style="">
        <div class="row">
        
            <div class="col" style="width: 40%; /*border: 1px solid black;*/ ">
                <label style="font-size: 15px; ">{{ $dataTienda[0]->direccion }}</label>
            </div>
        </div>
        <div class="clear"></div>
        <div class="row">
            <div class="col" style="width: 100%; text-align: center;">
                <label for="" style=" font-size: 15px !important;">REPORTE DE COMPROBANTES</label>
            </div>
            
        </div>
        <div class="clear"></div>
        <div class="row">
            <div class="col" style="width: 40%;">
                <label for="" style=" font-size: 13px !important;">FECHA DE APERTURA: </label>
                <label for="" style=" font-size: 13px !important;">{{ $fecha_apertura }}</label>
            </div>
            <div class="col" style="width: 60%;">
                <label for="" style=" font-size: 13px !important;">APERTURA DE CAJA: </label>
                <label for="" style=" font-size: 13px !important;"><?php echo $dataTienda[0]->nombre_caja; ?></label>
            </div>  
            
        </div>

        <div class="clear"></div>
        <div class="row">
            <div class="col" style="width: 40%;">
                <label for="" style=" font-size: 13px !important;">CAJERO(A): </label>
                <label for="" style=" font-size: 13px !important;"><?php echo $nameuser[0]->name; ?></label>
            </div>
            <div class="col" style="width: 12%;">
                <label for="" style=" font-size: 13px !important;">COMENTARIO: </label>
              
            </div>  
            <div class="col"  style="width: 48%; border: 1px solid black; height: 40px;">
                <label for="" style=""></label>
            </div>
            
        </div>
        
        
       
    </header>
    <footer>
       
        <div class="row">
            <div class="col" style="width: 95%;"><strong>Fecha de Impresión: <?php echo date("d/m/Y H:i:s"); ?></strong></div>
            <div class="col pagenum" style="width: 5%; text-align: right;"></div>
        </div>
    
            
    </footer>
    <!-- <div class="clear"></div> -->
    
    <main style="">  
       
    
        <div class="row" style="font-size: 12px !important;" >
            
            <div class="col" style="width: 12%; border-left: 1px solid white; border-bottom: 1px solid black; border-right: 1px solid black; background: #adadad;">Documento</div>
            <div class="col" style="width: 10%; border-left: 1px solid white; border-bottom: 1px solid black; border-right: 1px solid black; background: #adadad;">Ingreso</div>
            <div class="col" style="width: 41%; border-left: 1px solid white; border-bottom: 1px solid black; border-right: 1px solid black; background: #adadad;">Cliente</div>
            <div class="col" style="width: 8%; border-left: 1px solid white; border-bottom: 1px solid black; border-right: 1px solid black; background: #adadad;">Total</div>
            <div class="col" style="width: 9%; border-left: 1px solid white; border-bottom: 1px solid black; border-right: 1px solid black; background: #adadad;">Monto Pago</div>
            <div class="col" style="width: 8%; border-left: 1px solid white; border-bottom: 1px solid black; border-right: 1px solid black; background: #adadad;">Ticket</div>
            {{-- <div class="col" style="width: 5%; border-left: 1px solid white; border-bottom: 1px solid black; border-right: 1px solid black; background: #adadad;">Moneda</div> --}}
            {{-- <div class="col" style="width: 15%; border-left: 1px solid white; border-bottom: 1px solid black; border-right: 1px solid black; background: #adadad;">Cajero</div> --}}
            <div class="col" style="width: 5%; border-left: 1px solid white; border-bottom: 1px solid black; border-right: 1px solid black; background: #adadad;">Cuota</div>
            <div class="col" style="width: 5%; border-left: 1px solid white; border-bottom: 1px solid black; border-right: 1px solid black; background: #adadad;">Mora</div>
        </div>   
        <?php 
            
            $total = 0;
            $cont = 0;
            foreach ($formas as $key => $value) {

                
                echo '<div class="row" style="font-size: 10px !important; font-weight: bold" >
            
                        <div class="col" style="width: 12%; border-left: 1px solid transparent; border-right: 1px solid transparent; border-bottom: 1px solid transparent;">'.$value->codigo_formapago.'</div>
                        <div class="col" style="width: 10%; border-left: 1px solid transparent; border-right: 1px solid transparent; border-bottom: 1px solid transparent;">'.$value->Moneda.'</div>
                        <div class="col" style="width: 41%; border-left: 1px solid transparent; border-right: 1px solid transparent; border-bottom: 1px solid transparent;">'.$value->descripcion_subtipo.'</div>
                        <div class="col" style="width: 8%; border-left: 1px solid transparent; border-right: 1px solid transparent; border-bottom: 1px solid transparent;"></div>
                        <div class="col" style="width: 9%; border-left: 1px solid transparent; border-right: 1px solid transparent; border-bottom: 1px solid transparent;"></div>
                        <div class="col" style="width: 8%; border-left: 1px solid transparent; border-right: 1px solid transparent; border-bottom: 1px solid transparent;"></div>
                      
                 
                        <div class="col" style="width: 5%; border-left: 1px solid transparent; border-right: 1px solid transparent; border-bottom: 1px solid transparent;"></div>
                        <div class="col" style="width: 5%; border-left: 1px solid transparent; border-right: 1px solid transparent; border-bottom: 1px solid transparent;"></div>
                    </div>';
                $cont ++;
                $total_suma = 0;
                foreach ($value->data as $kd => $vd) {
                    $total_suma += floatval($vd->MontoPago);
                    echo '<div class="row" style="font-size: 10px !important;" >
            
                        <div class="col" style="width: 12%; border-left: 1px solid transparent; border-right: 1px solid transparent; border-bottom: 1px solid transparent;">'.$vd->Documento.'</div>
                        <div class="col" style="width: 10%; border-left: 1px solid transparent; border-right: 1px solid transparent; border-bottom: 1px solid transparent;">'.$vd->Ingreso.'</div>
                        <div class="col" style="width: 41%; border-left: 1px solid transparent; border-right: 1px solid transparent; border-bottom: 1px solid transparent;">'.$vd->Cliente.'</div>
                        <div class="col" style="width: 8%; border-left: 1px solid transparent; border-right: 1px solid transparent; border-bottom: 1px solid transparent;">'.number_format($vd->Total, 2).'</div>
                        <div class="col" style="width: 9%; border-left: 1px solid transparent; border-right: 1px solid transparent; border-bottom: 1px solid transparent;">'.number_format($vd->MontoPago, 2).'</div>
                        <div class="col" style="width: 8%; border-left: 1px solid transparent; border-right: 1px solid transparent; border-bottom: 1px solid transparent;">'.$vd->Ticket.'</div>
                       
                      
                        <div class="col" style="width: 5%; border-left: 1px solid transparent; border-right: 1px solid transparent; border-bottom: 1px solid transparent;">'.number_format($vd->Cuota, 2).'</div>
                        <div class="col" style="width: 5%; border-left: 1px solid transparent; border-right: 1px solid transparent; border-bottom: 1px solid transparent;">'.number_format($vd->Mora, 2).'</div>
                    </div>';
                    $cont ++;
                    if($cont == 34) {
                  
                        echo '<hr>
                        <div class="row" style="font-size: 12px !important;" >
                
                            <div class="col" style="width: 12%; border-left: 1px solid white; border-bottom: 1px solid black; border-right: 1px solid black; background: #adadad;">Documento</div>
                            <div class="col" style="width: 10%; border-left: 1px solid white; border-bottom: 1px solid black; border-right: 1px solid black; background: #adadad;">Ingreso</div>
                            <div class="col" style="width: 41%; border-left: 1px solid white; border-bottom: 1px solid black; border-right: 1px solid black; background: #adadad;">Cliente</div>
                            <div class="col" style="width: 8%; border-left: 1px solid white; border-bottom: 1px solid black; border-right: 1px solid black; background: #adadad;">Total</div>
                            <div class="col" style="width: 9%; border-left: 1px solid white; border-bottom: 1px solid black; border-right: 1px solid black; background: #adadad;">Monto Pago</div>
                            <div class="col" style="width: 8%; border-left: 1px solid white; border-bottom: 1px solid black; border-right: 1px solid black; background: #adadad;">Ticket</div>
                
                        
                            <div class="col" style="width: 5%; border-left: 1px solid white; border-bottom: 1px solid black; border-right: 1px solid black; background: #adadad;">Cuota</div>
                            <div class="col" style="width: 5%; border-left: 1px solid white; border-bottom: 1px solid black; border-right: 1px solid black; background: #adadad;">Mora</div>
                        </div> ';
                    }
                }
                echo '<div class="row" style="font-size: 10px !important; font-weight: bold" >
            
                    <div class="col" style="width: 12%; border-left: 1px solid transparent; border-right: 1px solid transparent; border-bottom: 1px solid transparent;"></div>
                    <div class="col" style="width: 10%; border-left: 1px solid transparent; border-right: 1px solid transparent; border-bottom: 1px solid transparent;"></div>
                    <div class="col" style="width: 41%; border-left: 1px solid transparent; border-right: 1px solid transparent; border-bottom: 1px solid transparent; text-align: center">TOTAL '.$value->descripcion_subtipo.'</div>
                    <div class="col" style="width: 8%; border-left: 1px solid transparent; border-right: 1px solid transparent; border-bottom: 1px solid transparent;">'.number_format($total_suma, 2).'</div>
                    <div class="col" style="width: 9%; border-left: 1px solid transparent; border-right: 1px solid transparent; border-bottom: 1px solid transparent;"></div>
                    <div class="col" style="width: 8%; border-left: 1px solid transparent; border-right: 1px solid transparent; border-bottom: 1px solid transparent;"></div>
            
                   
                    <div class="col" style="width: 5%; border-left: 1px solid transparent; border-right: 1px solid transparent; border-bottom: 1px solid transparent;"></div>
                    <div class="col" style="width: 5%; border-left: 1px solid transparent; border-right: 1px solid transparent; border-bottom: 1px solid transparent;"></div>
                </div>';
                echo '<div class="clear"></div>';

                $cont ++;
           
                

            }

         
           
            
        ?>
   
       
       
        


        
        
    </main>

  
  
</body>
</html>