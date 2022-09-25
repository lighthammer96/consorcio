<?php  date_default_timezone_set('America/Lima'); $mes = array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"); ?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Visita</title>
    <style>
        
        /* referencia: https://ourcodeworld.co/articulos/leer/687/como-configurar-un-encabezado-y-pie-de-pagina-en-dompdf */
        @page {
            margin: 0cm 0cm;
        }

        /** Defina ahora los márgenes reales de cada página en el PDF **/
        body {
            margin-top: 4.5cm;
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
        table {
            border-collapse: collapse;
        }
        table, th, td {
            border: 1px solid;
        }
    </style>
   
</head>
<body>

    <header style="">
        <div class="row">
            <div class="col" style="width: 25%; /*border: 1px solid black;*/ text-align: center;">
                <img style="width: 100%; height: 123px;" src="<?php echo public_path($empresa[0]->ruta_logo); ?>" alt="">
                
            </div>
            <div class="col" style="width: 60%; line-height: 20px; font-weight: bold; ">
                <br>
                <label for="">Nro VISITA: {{ $visita_cliente[0]->id }} &nbsp;&nbsp;&nbsp;&nbsp; FECHA: {{ $visita_cliente[0]->fechareg_user }}</label><br>
                <label for="">COMENTARIO: &nbsp;&nbsp;&nbsp;&nbsp; GESTOR: {{ $visita_cliente[0]->cobrador }}</label>  <br>
                <label for="" style="display:block; height: 20px; border: 1px solid black;"></label>  
              
            </div>
            <div class="col" style="width: 15%; text-align: right; font-weight: bold; font-size: 30px; /*border: 1px solid black;*/ line-height: 60px;">
                <label for=""><?php echo date("d-m-Y H:i:s"); ?></label>
              
            </div>
        </div>
        
        
        
       
    </header>
        
    <main>  
       <table  style="width: 100%; font-size: 12px !important;">
           <thead>
               <tr>
                <th>FECHA DOC.</th>
                <th>ULTIMO PAG.</th>
                <th>DOC. VENTA</th>
                <th>CLIENTE</th>
                <th>DIRECCION</th>
                <th>MONEDA</th>
                <th>DEUDA</th>
                <th>ULT. PAG.</th>
                <th>CUOTA</th>
                <th>F. VENCM.</th>
                <th>OBSERVACION</th>
               </tr>
           </thead>
           <tbody>
               <?php 
                    foreach ($solicitudes as $key => $value) {
                        $fecha_ultimo_pago = (isset($value->ultimo_pago_cuota[0])) ? $value->ultimo_pago_cuota[0]->fecha_emision_user : "";
                        $fecha_ultimo_pago_cuota = (isset($value->ultimo_pago_x_cuota[0])) ? $value->ultimo_pago_x_cuota[0]->fecha_emision_user : "";
                       
                        echo '<tr>';
                        echo '  <td>'.$value->segunda_venta[0]->fecha_emision_user.'</td>';
                        echo '  <td>'.$fecha_ultimo_pago.'</td>';
                        echo '  <td>'.$value->segunda_venta[0]->serie_comprobante.'-'.$value->segunda_venta[0]->numero_comprobante.'</td>';
                        echo '  <td>'.$value->razonsocial_cliente.'</td>';
                        echo '  <td>'.$value->direccion.'</td>';
                        echo '  <td>'.$value->moneda.'</td>';
                        echo '  <td>'.number_format($value->deuda, 2).'</td>';
                        echo '  <td>'.$fecha_ultimo_pago_cuota.'</td>';
                        echo '  <td>'.number_format($value->primera_cuota_vencida->saldo_cuota, 2).'</td>';
                        echo '  <td>'.$value->primera_cuota_vencida->fecha_vencimiento_user.'</td>';
                        echo '  <td>'.$value->cObservacion.'</td>';
                        echo '</tr>';
                    }
               ?>
           </tbody>
       </table>

        
        
    </main>

    <footer>
      
      
            
    </footer>
  
</body>
</html>