<!DOCTYPE html>
<html lang="es">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
<body>
<?php
       function diasmora($fecha_vencimiento,$saldo_cuota)
        {
            $fecha1=date("Y/m/d",strtotime($fecha_vencimiento));
          
            $hoy = date("Y/m/d");
            $fecha1= new DateTime($fecha1);
            $hoy= new DateTime($hoy);
            $diff = $fecha1->diff($hoy);
            $dim=0;
            if($fecha1>$hoy){
             $dim=0;
           }else{
               
              
                 if(($diff->days)>0){
                    $dim=$diff->days;
                };
                if(intval($saldo_cuota)<=0){
                      $dim=0;
                };
           }
           
            return ($dim);
        }
?>    
<table>
    <thead>
    <tr>
        <th></th>
        <td colspan="10" style="text-align: center"><h3>C & A - CUENTAS POR COBRAR POR CLIENTE </h3></td>
    </tr>
    <tr><th></th></tr>
    <tr style="background-color: #cccccc">
        <td style="background-color: #ffffff"></td>
        <th style="border: 1px solid #000000; text-align: center;width: 20">DOCUMENTO</th>
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
    <?php $ind='C' ;?>
    <?php $conc=1 ;?>
    <?php $consol=0 ;?>
    <?php $condol=0 ;?>
    <?php $contfi=0 ;?>
    <?php $tem='' ;?>
    <?php $totalsole=0 ;?>
    <?php $totaldola=0 ;$totalfin =0;?>
    @for($i = 0; $i < count($data_cabe); $i++)
        <?php $fecul='';?>
        <?php 
            if($data_cabe[$i]->fecultpago!=null){
               $fecul=date("d/m/Y",strtotime($data_cabe[$i]->fecultpago));
            }
            if($data_cabe[$i]->idmoneda==1){
                $consol=$consol+intval($data_cabe[$i]->monto_pendiente);
            }else{
                $condol=$condol+intval($data_cabe[$i]->monto_pendiente);
            }

        ?>
        @if ($ind=='C')
          
            <tr>
            <td></td>
             <td style="border: 1px solid #000000; text-align: center"  colspan="10" >{{ $conc .'.'.' Cliente'." - ".$data_cabe[$i]->cliente." - ". $data_cabe[$i]->documento_cliente ." - "." "." "." ".$data_cabe[$i]->direccion.' '.$data_cabe[$i]->cDepartamento.' '.$data_cabe[$i]->cProvincia.' '.$data_cabe[$i]->cDistrito }}  </td>
            </tr>
            
          <?php $conc=$conc+1 ;?>

            <tr>
             <td></td>
             <td style="border: 1px solid #000000; text-align: center" >{{ $data_cabe[$i]->documento_ven}}  </td>
             <td style="border: 1px solid #000000; text-align: center" >{{ date("d/m/Y",strtotime($data_cabe[$i]->fecha_emision))}}  </td>
             <td style="border: 1px solid #000000; text-align: center" >{{ date("d/m/Y",strtotime($data_cabe[$i]->fecha_vencimiento))}}  </td>
             <td style="border: 1px solid #000000; text-align: center" >{{ diasmora($data_cabe[$i]->fecha_vencimiento,$data_cabe[$i]->monto_pendiente)}}  </td>
             <td style="border: 1px solid #000000; text-align: center" >{{ $fecul}}  </td>
             <td style="border: 1px solid #000000; text-align: center" >{{ $data_cabe[$i]->moneda}}  </td>
             <td style="border: 1px solid #000000; text-align: center" >{{ $data_cabe[$i]->Simbolo.' '.number_format($data_cabe[$i]->monto_total,2)}}  </td>
             <td style="border: 1px solid #000000; text-align: center" >{{ $data_cabe[$i]->Simbolo.' '.number_format($data_cabe[$i]->monto_pendiente,2)}}  </td>
             <td style="border: 1px solid #000000; text-align: center" >{{ $data_cabe[$i]->vendedor}}  </td>
             <td style="border: 1px solid #000000; text-align: center" >{{ $data_cabe[$i]->cobrador}}  </td>  
            </tr>
          <?php $ind='B' ;?>
          <?php $contfi=$contfi+1 ;?>
        @else  
            <?php $ni=$i+1;$contfi=$contfi+1;?>
             <tr>
             <td></td>
             <td style="border: 1px solid #000000; text-align: center" >{{ $data_cabe[$i]->documento_ven}}  </td>
             <td style="border: 1px solid #000000; text-align: center" >{{ date("d/m/Y",strtotime($data_cabe[$i]->fecha_emision))}}  </td>
             <td style="border: 1px solid #000000; text-align: center" >{{ date("d/m/Y",strtotime($data_cabe[$i]->fecha_vencimiento))}}  </td>
             <td style="border: 1px solid #000000; text-align: center" >{{ diasmora($data_cabe[$i]->fecha_vencimiento,$data_cabe[$i]->monto_pendiente)}}  </td>
             <td style="border: 1px solid #000000; text-align: center" >{{ $fecul}}  </td>
             <td style="border: 1px solid #000000; text-align: center" >{{ $data_cabe[$i]->moneda}}  </td>
             <td style="border: 1px solid #000000; text-align: center" >{{ $data_cabe[$i]->Simbolo.' '.number_format($data_cabe[$i]->monto_total,2)}}  </td>
             <td style="border: 1px solid #000000; text-align: center" >{{ $data_cabe[$i]->Simbolo.' '.number_format($data_cabe[$i]->monto_pendiente,2)}}  </td>
             <td style="border: 1px solid #000000; text-align: center" >{{ $data_cabe[$i]->vendedor}}  </td>
             <td style="border: 1px solid #000000; text-align: center" >{{ $data_cabe[$i]->cobrador}}  </td>  
            </tr>
            <?php if($ni<=count($data_cabe)){
                $tem=$ni;
                if($ni==count($data_cabe)){
                    $tem=$ni-1;
                }
              }
            ?>
            @if ($data_cabe[$i]->idventa!=$data_cabe[$tem]->idventa || ($ni)==count($data_cabe))
                <?php $ind='C'; ?>

                 <tr>
                         <td></td>
                         <td style="border: 1px solid #000000; text-align: center;color:#000000;background-color:#ffff00" colspan="5"  >Total por Cobrar en Moneda Base</td>
                         <td style="border: 1px solid #000000; text-align: center;color:#000000;background-color:#ffff00" colspan="2" >Soles:</td>
                         
                         <td style="border: 1px solid #000000; text-align: center;color:#000000;background-color:#ffff00" >{{ $simboloMoneda[0]->Simbolo.' '.number_format($consol,2)}}  </td>
                         <td style="border: 1px solid #000000; text-align: center;color:#000000;background-color:#ffff00" colspan="2"  >Nro. Registros Total: {{' '.$contfi}} </td>
                       
                </tr>
                 <tr>
                         <td></td>
                         <td style="border: 1px solid #000000; text-align: center;color:#000000;background-color:#ffff00" colspan="5"  ></td>
                         <td style="border: 1px solid #000000; text-align: center;color:#000000;background-color:#ffff00" colspan="2" >Dolares:</td>
                         
                         <td style="border: 1px solid #000000; text-align: center;color:#000000;background-color:#ffff00" >{{ $simboloMoneda[1]->Simbolo.' '.number_format($condol,2)}}  </td>
                         <td style="border: 1px solid #000000; text-align: center;color:#000000;background-color:#ffff00" colspan="2"  > </td>
                       
                </tr>
               

                <?php
                    $totalsole=$totalsole+$consol;
                    $totaldola=$totaldola+$condol;
                    $contfi=0;
                    $consol=0;
                    $condol=0;
                ?>
            @else
                <?php
                    $ind='B';
                ?>
            @endif
        @endif
       
       
    @endfor
       <tr>
                         <td></td>
                         <td style="border: 1px solid #000000; text-align: center;color:#000000;background-color:#ffff00" colspan="5"  >Total por Cobrar a T.C: {{ ''.$cambio[0]->Mensaje}}</td>
                         <td style="border: 1px solid #000000; text-align: center;color:#000000;background-color:#ffff00" colspan="2" ></td>

                         <td style="border: 1px solid #000000; text-align: center;color:#000000;background-color:#ffff00">{{ $simboloMoneda[0]->Simbolo.' '.number_format($totalsole,2)}} </td>
                        <td style="border: 1px solid #000000; text-align: center;color:#000000;background-color:#ffff00" colspan="2" ></td>
                         
                       
        </tr>
        <?php $totalfin=floatval($totaldola)+(floatval($totalsole)/floatval($cambio[0]->Mensaje));?>
                <tr>
                         <td></td>
                         <td style="border: 1px solid #000000; text-align: center;color:#000000;background-color:#ffff00" colspan="5"  ></td>
                         <td style="border: 1px solid #000000; text-align: center;color:#000000;background-color:#ffff00" colspan="2" >Dolares:</td>
                         
                         <td style="border: 1px solid #000000; text-align: center;color:#000000;background-color:#ffff00" >{{ $simboloMoneda[0]->Simbolo.' '.number_format($totalfin,2)}}  </td>
                         <td style="border: 1px solid #000000; text-align: center;color:#000000;background-color:#ffff00" colspan="2"  ></td>
                       
                </tr> 
    </tbody>
</table>
</body>
