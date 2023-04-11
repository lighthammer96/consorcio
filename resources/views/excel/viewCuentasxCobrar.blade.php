<!DOCTYPE html>
<html lang="es">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>

<body>
    <?php
        function diasmora($fecha_vencimiento, $saldo_cuota)
        {
            $fecha1 = date('Y/m/d', strtotime($fecha_vencimiento));
        
            $hoy = date('Y/m/d');
            $fecha1 = new DateTime($fecha1);
            $hoy = new DateTime($hoy);
            $diff = $fecha1->diff($hoy);
            $dim = 0;
            if ($fecha1 > $hoy) {
                $dim = 0;
            } else {
                if ($diff->days > 0) {
                    $dim = $diff->days;
                }
                if (intval($saldo_cuota) <= 0) {
                    $dim = 0;
                }
            }
        
            return $dim;
        }
    ?>
    <table>
        <thead>
            <tr>
                <th></th>
                <td colspan="10" style="text-align: center">
                    <h3>C & A - CUENTAS POR COBRAR POR CLIENTE </h3>
                </td>
            </tr>
            <tr>
                <th></th>
            </tr>
            <tr style="background-color: #cccccc">
                <td style="background-color: #ffffff"></td>
                <th style="border: 1px solid #000000; text-align: center;width: 20">DOCUMENTO</th>
                <th style="border: 1px solid #000000; text-align: center;width: 20">SOLICITUD</th>
                <th style="border: 1px solid #000000; text-align: center;width: 15">FEC DOC</th>
                <th style="border: 1px solid #000000; text-align: center;width: 15">FEC VEC</th>
                <th style="border: 1px solid #000000; text-align: center;width: 20">DIAS VENCIDOS</th>
                <th style="border: 1px solid #000000; text-align: center;width: 15">FEC ULT. PAGO</th>
                <th style="border: 1px solid #000000; text-align: center;width: 15">MONEDA</th>
                <th style="border: 1px solid #000000; text-align: center;width: 20">MONTO TOTAL</th>
                <th style="border: 1px solid #000000; text-align: center;width: 25">MONTO PENDIENTE</th>
                <th style="border: 1px solid #000000; text-align: center;width: 30">VENDEDOR</th>
                <th style="border: 1px solid #000000; text-align: center;width: 30">COBRADOR</th>
            </tr>

        </thead>
        <tbody>
            <?php 
                $array = array();
                $conc = 1;
                $consol = 0;
                $condol = 0;
                $totalsole = 0;
                $totaldola = 0;
                $totalfin  = 0;
                $contfi = 0;
                $contador = 1;
                $total_monto = 0;
                $total_monto_dolares = 0;
                $total_monto_final = 0;
                $total_monto_dolares_final = 0;
                foreach ($data_cabe as $key => $value) {
                    $fecul = '';
                    if($value->fecultpago != null){
                        $fecul = date("d/m/Y",strtotime($value->fecultpago));
                    }

                   
                   

                    if(!in_array($value->cliente, $array)) {
                        

                        if($conc > 1) {
                            echo '<tr>';
                            echo '  <td></td>';
                            echo '  <td style="border: 1px solid #000000; text-align: center;color:#000000;     background-color:#ffff00" colspan="5"  >Total por Cobrar en Moneda Base</td>
                                    <td style="border: 1px solid #000000; text-align: center;color:#000000;background-color:#ffff00" colspan="2" >Soles:</td>
                                    <td style="border: 1px solid #000000; text-align: center;color:#000000;background-color:#ffff00" >'.$simboloMoneda[0]->Simbolo.' '.number_format($total_monto,2).'</td>
                                    <td style="border: 1px solid #000000; text-align: center;color:#000000;background-color:#ffff00" >'.$simboloMoneda[0]->Simbolo.' '.number_format($consol,2).'</td>
                                    <td style="border: 1px solid #000000; text-align: center;color:#000000;background-color:#ffff00" colspan="2"  >Nro. Registros Total: '.$contfi .'</td>';
                                
                            echo '</tr>';

                            echo '<tr>';
                            echo '  <td></td>';
                            echo '  <td style="border: 1px solid #000000; text-align: center;color:#000000;background-color:#ffff00" colspan="5"  ></td>
                                    <td style="border: 1px solid #000000; text-align: center;color:#000000;background-color:#ffff00" colspan="2" >Dolares:</td>
                                    <td style="border: 1px solid #000000; text-align: center;color:#000000;background-color:#ffff00" >'.$simboloMoneda[0]->Simbolo.' '.number_format($total_monto_dolares,2).'</td>
                                    <td style="border: 1px solid #000000; text-align: center;color:#000000;background-color:#ffff00" >'.$simboloMoneda[1]->Simbolo.' '.number_format($condol,2).'</td>
                                    <td style="border: 1px solid #000000; text-align: center;color:#000000;background-color:#ffff00" colspan="2"  > </td>';
                                    
                            echo '</tr>';
                            $consol = 0;
                            $condol = 0;
                            $contfi = 0;
                            $total_monto = 0;
                            $total_monto_dolares = 0;
                        }
                        // cliente
                        echo '<tr>';
                        echo '  <td></td>';
                        echo '  <td style="border: 1px solid #000000; text-align: center"  colspan="11">'.$conc.'.'.' Cliente'." - ".$value->cliente." - ". $value->documento_cliente ." - "." "." "." ".$value->direccion.' '.$value->cDepartamento.' '.$value->cProvincia.' '.$value->cDistrito.'</td>';
                        echo '</tr>';
                        $array = array();
                        $conc ++;
                       
                    }
                    
                    // detalle
                    echo '<tr>';
                    echo '  <td></td>';
                    echo '  <td style="border: 1px solid #000000; text-align: center">'.$value->documento_ven.'</td>';
                    echo '  <td style="border: 1px solid #000000; text-align: center">'.$value->cCodConsecutivo.'-'.$value->nConsecutivo.'</td>';
                    echo '  <td style="border: 1px solid #000000; text-align: center">'.date("d/m/Y",strtotime($value->fecha_emision)).'</td>';
                    echo '  <td style="border: 1px solid #000000; text-align: center">'.date("d/m/Y",strtotime($value->fecha_vencimiento)).'</td>';
                    echo '  <td style="border: 1px solid #000000; text-align: center">'.diasmora($value->fecha_vencimiento,$value->monto_pendiente).'</td>';
                    echo '  <td style="border: 1px solid #000000; text-align: center">'.$fecul.'</td>';
                    echo '  <td style="border: 1px solid #000000; text-align: center">'.$value->moneda.'</td>';
                    echo '  <td style="border: 1px solid #000000; text-align: center">'.$value->Simbolo.' '.number_format($value->monto_total,2).'</td>';
                    echo '  <td style="border: 1px solid #000000; text-align: center">'.$value->Simbolo.' '.number_format($value->monto_pendiente,2).'</td>';
                    echo '  <td style="border: 1px solid #000000; text-align: center">'.$value->vendedor.'</td>';
                    echo '  <td style="border: 1px solid #000000; text-align: center">'.$value->cobrador.'</td>';
                    echo '</tr>';

                    if($value->idmoneda==1) {
                        $consol = $consol + floatval($value->monto_pendiente);
                        $totalsole = $totalsole + floatval($value->monto_pendiente);
                        $total_monto = $total_monto + floatval($value->monto_total);
                        $total_monto_final = $total_monto_final + floatval($value->monto_total);
                    } else {
                        $condol = $condol + floatval($value->monto_pendiente);
                        $totaldola = $totaldola + floatval($value->monto_pendiente);
                        $total_monto_dolares = $total_monto_dolares_final + floatval($value->monto_total);
                        $total_monto_dolares_final = $total_monto_dolares_final + floatval($value->monto_total);
                    }

                   
                    

                    array_push($array, $value->cliente);

                    // para el ultimo registro
                    if(count($data_cabe) == $contador) {
                        $contfi ++;
                        echo '<tr>';
                        echo '  <td></td>';
                        echo '  <td style="border: 1px solid #000000; text-align: center;color:#000000;     background-color:#ffff00" colspan="5"  >Total por Cobrar en Moneda Base</td>
                                <td style="border: 1px solid #000000; text-align: center;color:#000000;background-color:#ffff00" colspan="2" >Soles:</td>
                                <td style="border: 1px solid #000000; text-align: center;color:#000000;background-color:#ffff00" >'.$simboloMoneda[0]->Simbolo.' '.number_format($total_monto,2).'</td>
                                <td style="border: 1px solid #000000; text-align: center;color:#000000;background-color:#ffff00" >'.$simboloMoneda[0]->Simbolo.' '.number_format($consol,2).'</td>
                                <td style="border: 1px solid #000000; text-align: center;color:#000000;background-color:#ffff00" colspan="2"  >Nro. Registros Total: '.$contfi.'</td>';
                            
                        echo '</tr>';

                        echo '<tr>';
                        echo '  <td></td>';
                        echo '  <td style="border: 1px solid #000000; text-align: center;color:#000000;background-color:#ffff00" colspan="5"  ></td>
                                <td style="border: 1px solid #000000; text-align: center;color:#000000;background-color:#ffff00" colspan="2" >Dolares:</td>
                                <td style="border: 1px solid #000000; text-align: center;color:#000000;background-color:#ffff00" >'.$simboloMoneda[0]->Simbolo.' '.number_format($total_monto_dolares,2).'</td>
                                <td style="border: 1px solid #000000; text-align: center;color:#000000;background-color:#ffff00" >'.$simboloMoneda[1]->Simbolo.' '.number_format($condol,2).'</td>
                                <td style="border: 1px solid #000000; text-align: center;color:#000000;background-color:#ffff00" colspan="2"  > </td>';
                                
                        echo '</tr>';
                    }
                    $contfi ++;
                    $contador ++;
                }

                $totalfin=floatval($totaldola)+(floatval($totalsole)/floatval($cambio[0]->Mensaje));
                $totalfin2=floatval($total_monto_dolares_final)+(floatval($total_monto_final)/floatval($cambio[0]->Mensaje));
                echo '<tr>';
                echo '  <td></td>';
                echo '  <td style="border: 1px solid #000000; text-align: center;color:#000000;background-color:#ffff00" colspan="5"  >Total por Cobrar a T.C: '.$cambio[0]->Mensaje.'</td>
                        <td style="border: 1px solid #000000; text-align: center;color:#000000;background-color:#ffff00" colspan="2" ></td>
                        <td style="border: 1px solid #000000; text-align: center;color:#000000;background-color:#ffff00">'.$simboloMoneda[0]->Simbolo.' '.number_format($total_monto_final,2).'</td>
                        <td style="border: 1px solid #000000; text-align: center;color:#000000;background-color:#ffff00">'.$simboloMoneda[0]->Simbolo.' '.number_format($totalsole,2).'</td>
                        <td style="border: 1px solid #000000; text-align: center;color:#000000;background-color:#ffff00" colspan="2" ></td>';
                echo '</tr>';

    
                echo '<tr>';
                echo '  <td></td>';
                echo '  <td style="border: 1px solid #000000; text-align: center;color:#000000;background-color:#ffff00" colspan="5"  ></td>
                        <td style="border: 1px solid #000000; text-align: center;color:#000000;background-color:#ffff00" colspan="2" >Dolares:</td>
                        <td style="border: 1px solid #000000; text-align: center;color:#000000;background-color:#ffff00" >'.$simboloMoneda[1]->Simbolo.' '.number_format($totalfin2,2).'</td>
                        <td style="border: 1px solid #000000; text-align: center;color:#000000;background-color:#ffff00" >'.$simboloMoneda[1]->Simbolo.' '.number_format($totalfin,2).'</td>
                        <td style="border: 1px solid #000000; text-align: center;color:#000000;background-color:#ffff00" colspan="2"  ></td>';
                       
                echo '</tr>'; 
            ?>
        </tbody>
    </table>
</body>
