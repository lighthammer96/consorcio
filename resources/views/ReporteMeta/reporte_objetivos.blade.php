<?php  date_default_timezone_set('America/Lima'); $mes = array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"); ?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reporte de Objetivos</title>
    <style>
        
        /* referencia: https://ourcodeworld.co/articulos/leer/687/como-configurar-un-encabezado-y-pie-de-pagina-en-dompdf */
        @page {
            margin: 0cm 0cm;
        }

        /** Defina ahora los márgenes reales de cada página en el PDF **/
        body {
            margin-top: 2cm;
            margin-left: 0.5cm;
            margin-right: 0.5cm;
            margin-bottom: 1cm;
           
        }
            
        header {
            position: fixed;
            top: 1cm;
            left: 0.5cm;
            right: 0.5cm;
            height: 1cm;
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
            height: 20px;
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
            <div class="col" style="width: 100%; text-align: center;">
                <label for="" style=" font-size: 15px !important;">Reporte de Objetivos <?php echo $mes[$mes_int-1]; ?></label>
            </div>
            
        </div>
       
    </header>
    <footer>
       
        
            
    </footer>
    <!-- <div class="clear"></div> -->
    
    <main style="">  
       
    
        <div class="row" style="font-size: 13px !important;" >
            
            <div class="col" style="width: 4%; border-left: 1px solid white; border-bottom: 1px solid black; border-right: 1px solid black; background: #adadad;">IdTec</div>
            <div class="col" style="width: 35%; border-left: 1px solid white; border-bottom: 1px solid black; border-right: 1px solid black; background: #adadad;">Tecnico</div>
            <div class="col" style="width: 10%; border-left: 1px solid white; border-bottom: 1px solid black; border-right: 1px solid black; background: #adadad;">AvanceUnd</div>
            <div class="col" style="width: 8%; border-left: 1px solid white; border-bottom: 1px solid black; border-right: 1px solid black; background: #adadad;">MetaCant</div>
            <div class="col" style="width: 11%; border-left: 1px solid white; border-bottom: 1px solid black; border-right: 1px solid black; background: #adadad;">PorcAvanceCant</div>
            <div class="col" style="width: 9%; border-left: 1px solid white; border-bottom: 1px solid black; border-right: 1px solid black; background: #adadad;">AvanceSoles</div>
            <div class="col" style="width: 8%; border-left: 1px solid white; border-bottom: 1px solid black; border-right: 1px solid black; background: #adadad;">MetaMonto</div>
            <div class="col" style="width: 13%; border-left: 1px solid white; border-bottom: 1px solid black; border-right: 1px solid black;background: #adadad;">PorcAvanceMonto</div>
        </div>   
        <?php 
            
            $total_AvanceUnd = 0;
            $total_MetaCant = 0;
            $total_AvanceSoles = 0;
            $total_MetaMonto = 0;
            $cont = 0;
            foreach ($data_1 as $kd1=> $vd1) {

                $total_AvanceUnd += floatval($vd1->AvanceUnd);
                $total_MetaCant += floatval($vd1->MetaCant);
                $total_AvanceSoles += floatval($vd1->AvanceSoles);
                $total_MetaMonto += floatval($vd1->MetaMonto);

                echo '<div class="row" style="font-size: 13px !important;" >
        
                    <div class="col" style="width: 4%; border-left: 1px solid transparent; border-right: 1px solid transparent; border-bottom: 1px solid transparent;">'.$vd1->IdTec.'</div>
                    <div class="col" style="width: 35%; border-left: 1px solid transparent; border-right: 1px solid transparent; border-bottom: 1px solid transparent;">'.$vd1->Tecnico.'</div>
                    <div class="col" style="width: 10%; border-left: 1px solid transparent; border-right: 1px solid transparent; border-bottom: 1px solid transparent;">'.$vd1->AvanceUnd.'</div>
                    <div class="col" style="width: 8%; border-left: 1px solid transparent; border-right: 1px solid transparent; border-bottom: 1px solid transparent;">'.number_format($vd1->MetaCant, 2).'</div>
                    <div class="col" style="width: 11%; border-left: 1px solid transparent; border-right: 1px solid transparent; border-bottom: 1px solid transparent;">'.number_format($vd1->PorcAvanceCant, 2).'</div>
                    <div class="col" style="width: 9%; border-left: 1px solid transparent; border-right: 1px solid transparent; border-bottom: 1px solid transparent;">'.number_format($vd1->AvanceSoles, 2).'</div>
                    <div class="col" style="width: 8%; border-left: 1px solid transparent; border-right: 1px solid transparent; border-bottom: 1px solid transparent;">'.number_format($vd1->MetaMonto, 2).'</div>
                    <div class="col" style="width: 13%; border-left: 1px solid transparent; border-right: 1px solid transparent; border-bottom: 1px solid transparent;">'.number_format($vd1->PorcAvanceMonto, 2).'</div>
                </div>';
                $cont ++;
                if($cont == 34) {
                
                    echo '<hr>
                    <div class="row" style="font-size: 13px !important;" >
            
                        <div class="col" style="width: 4%; border-left: 1px solid white; border-bottom: 1px solid black; border-right: 1px solid black; background: #adadad;">IdTec</div>
                        <div class="col" style="width: 35%; border-left: 1px solid white; border-bottom: 1px solid black; border-right: 1px solid black; background: #adadad;">Tecnico</div>
                        <div class="col" style="width: 10%; border-left: 1px solid white; border-bottom: 1px solid black; border-right: 1px solid black; background: #adadad;">AvanceUnd</div>
                        <div class="col" style="width: 8%; border-left: 1px solid white; border-bottom: 1px solid black; border-right: 1px solid black; background: #adadad;">MetaCant</div>
                        <div class="col" style="width: 11%; border-left: 1px solid white; border-bottom: 1px solid black; border-right: 1px solid black; background: #adadad;">PorcAvanceCant</div>
                        <div class="col" style="width: 9%; border-left: 1px solid white; border-bottom: 1px solid black; border-right: 1px solid black; background: #adadad;">AvanceSoles</div>
                        <div class="col" style="width: 8%; border-left: 1px solid white; border-bottom: 1px solid black; border-right: 1px solid black; background: #adadad;">MetaMonto</div>
                        <div class="col" style="width: 13%; border-left: 1px solid white; border-bottom: 1px solid black; border-right: 1px solid black; background: #adadad;">PorcAvanceMonto</div>
                    </div> ';
                }
                $cont ++;
           
                

            }

            echo '<div class="row" style="font-size: 13px !important; font-weight: bold" >
            
            <div class="col" style="width: 4%; border-left: 1px solid transparent; border-right: 1px solid transparent; border-bottom: 1px solid transparent;"></div>
            <div class="col" style="width: 35%; border-left: 1px solid transparent; border-right: 1px solid transparent; border-bottom: 1px solid transparent;"></div>
            <div class="col" style="width: 10%; border-left: 1px solid transparent; border-right: 1px solid transparent; border-bottom: 1px solid transparent;">'.number_format($total_AvanceUnd, 2).'</div>
            <div class="col" style="width: 8%; border-left: 1px solid transparent; border-right: 1px solid transparent; border-bottom: 1px solid transparent;">'.number_format($total_MetaCant, 2).'</div>
            <div class="col" style="width: 11%; border-left: 1px solid transparent; border-right: 1px solid transparent; border-bottom: 1px solid transparent;"></div>
            <div class="col" style="width: 9%; border-left: 1px solid transparent; border-right: 1px solid transparent; border-bottom: 1px solid transparent;">'.number_format($total_AvanceSoles, 2).'</div>
            <div class="col" style="width: 8%; border-left: 1px solid transparent; border-right: 1px solid transparent; border-bottom: 1px solid transparent;">'.number_format($total_MetaMonto, 2).'</div>
            <div class="col" style="width: 13%; border-left: 1px solid transparent; border-right: 1px solid transparent; border-bottom: 1px solid transparent;"></div>
        </div>';
        echo '<div class="clear"></div>';

        ?>
   
       
        <br>
        <div class="row" style="font-size: 14px !important;" >
                    
            <div class="col" style="width: 18%; border-left: 1px solid white; border-bottom: 1px solid black; border-right: 1px solid black; background: #adadad;">Fecha</div>
            <div class="col" style="width: 60%; border-left: 1px solid white; border-bottom: 1px solid black; border-right: 1px solid black; background: #adadad;">Detalle</div>
            <div class="col" style="width: 20%; border-left: 1px solid white; border-bottom: 1px solid black; border-right: 1px solid black; background: #adadad;">Cantidad</div>
          
        </div>   
        <?php 
            
            
            foreach ($data_2 as $kd2=> $vd2) {


                echo '<div class="row" style="font-size: 14px !important;" >
                    
                        <div class="col" style="width: 18%; border-left: 1px solid white; border-bottom: 1px solid transparent; border-right: 1px solid transparent;">'.$vd2->Fecha.'</div>
                        <div class="col" style="width: 60%; border-left: 1px solid white; border-bottom: 1px solid transparent; border-right: 1px solid transparent;">'.$vd2->Detalle.'</</div>
                        <div class="col" style="width: 20%; border-left: 1px solid white; border-bottom: 1px solid transparent; border-right: 1px solid transparent;">'.$vd2->Cantidad.'</</div>
                    
                    </div>';
                $cont ++;
                if($cont == 34) {
                
                    echo '<hr>
                    <div class="row" style="font-size: 14px !important;" >
                    
                        <div class="col" style="width: 18%; border-left: 1px solid white; border-bottom: 1px solid black; border-right: 1px solid black; background: #adadad;">Fecha</div>
                        <div class="col" style="width: 60%; border-left: 1px solid white; border-bottom: 1px solid black; border-right: 1px solid black; background: #adadad;">Detalle</div>
                        <div class="col" style="width: 20%; border-left: 1px solid white; border-bottom: 1px solid black; border-right: 1px solid black; background: #adadad;">Cantidad</div>
                    
                    </div>';
                }
               
            }

        

        ?>


        
        
    </main>

  
  
</body>
</html>