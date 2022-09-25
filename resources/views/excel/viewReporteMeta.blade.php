<!DOCTYPE html>
<html lang="es">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
<body>
<?php 
     $m1=0;
     $m2=0;
     $mp=0;
     $mm=0;
     $mc=0;
     $mr=0;
     $mg=0;
     $mi=0;
     $ma=0;
     $sra=0;
     $rpa=0;
     $lua=0;

     $m1b=0;
     $m2b=0;
     $mpb=0;
     $mmb=0;
     $mcb=0;
     $mrb=0;
     $mgb=0;
     $mib=0;
     $mab=0;
     $srb=0;
     $rpb=0;
     $lua=0;
     $tota=0;
     $totb=0;
     $montoRep=0;
     $montoAcie=0;
     $montoServi=0;
     $m1r=0;
     $m2r=0;
     $mpr=0;
     $mmr=0;
     $mcr=0;
     $mrr=0;
     $mgr=0;
     $mir=0;
     $mar=0;

     $m1s=0;
     $m2s=0;
     $mps=0;
     $mms=0;
     $mcs=0;
     $mrs=0;
     $mgs=0;
     $mis=0;
     $mas=0;

     $m1l=0;
     $m2l=0;
     $mpl=0;
     $mml=0;
     $mcl=0;
     $mrl=0;
     $mgl=0;
     $mil=0;
     $mal=0;


     $m1br=0;
     $m2br=0;
     $mpbr=0;
     $mmbr=0;
     $mcbr=0;
     $mrbr=0;
     $mgbr=0;
     $mibr=0;
     $mabr=0;

     $m1bs=0;
     $m2bs=0;
     $mpbs=0;
     $mmbs=0;
     $mcbs=0;
     $mrbs=0;
     $mgbs=0;
     $mibs=0;
     $mabs=0;

     $m1bl=0;
     $m2bl=0;
     $mpbl=0;
     $mmbl=0;
     $mcbl=0;
     $mrbl=0;
     $mgbl=0;
     $mibl=0;
     $mabl=0;

     $totaMoa=0;
     $totaRea=0;
     $totaACa=0;

     $totaMob=0;
     $totaReb=0;
     $totaACb=0;
     $tofinR=0;
     $tofinL=0;

    if($mes==1){
        $mes='Enero';
    }else if($mes==2){
        $mes='Febrero';
    }else if($mes==3){
        $mes='Marzo';
    }
    else if($mes==4){
        $mes='Abril';
    }
    else if($mes==5){
        $mes='Mayo';
    }
    else if($mes==6){
        $mes='Junio';
    }
    else if($mes==7){
        $mes='Julio';
    }
    else if($mes==8){
        $mes='Agosto';
    }
    else if($mes==9){
        $mes='Septiembre';
    }else if($mes==10){
        $mes='Octubre';
    }
    else if($mes==11){
        $mes='Noviembre';
    }
    else if($mes==12){
        $mes='Diciembre';
    };

    foreach ($data_mensual as $index)
    {
            $montoRep=floatval($index->REPUESTO);
            $montoAcie=floatval($index->ACEITE);
            $montoServi=floatval($index->MontoSerPro);
            if($index->id_tipoveh==1){
            if($index->id_tipomant==1){
             
                $m1r=floatval($m1r)+floatval($montoRep);
                $m1s=floatval($m1s)+floatval($montoServi);
                $m1l=floatval($m1l)+floatval($montoAcie); 
            }else if($index->id_tipomant==2){
              
                $m2r=floatval($m2r)+floatval($montoRep);
                $m2s=floatval($m2s)+floatval($montoServi);
                $m2l=floatval($m2l)+floatval($montoAcie); 
            }else if($index->id_tipomant==3){
            
                $mpr=floatval($mpr)+floatval($montoRep);
                $mps=floatval($mps)+floatval($montoServi);
                $mpl=floatval($mpl)+floatval($montoAcie); 
            }else if($index->id_tipomant==4){
              
                $mmr=floatval($mmr)+floatval($montoRep); 
                $mms=floatval($mms)+floatval($montoServi);
                $mml=floatval($mml)+floatval($montoAcie); 
            }else if($index->id_tipomant==5){
              
                $mcr=floatval($mcr)+floatval($montoRep);
                 $mcs=floatval($mcs)+floatval($montoServi);
                 $mcl=floatval($mcl)+floatval($montoAcie); 
            }else if($index->id_tipomant==6){
              
                $mrr=floatval($mrr)+floatval($montoRep); 
                 $mrs=floatval($mrs)+floatval($montoServi);
                $mrl=floatval($mrl)+floatval($montoAcie);  
            }else if($index->id_tipomant==7){
               
                $mgr=floatval($mgr)+floatval($montoRep);
                $mgs=floatval($mgs)+floatval($montoServi);
               $mgl=floatval($mgl)+floatval($montoAcie);  
            }else if($index->id_tipomant==8){
               
                $mir=floatval($mir)+floatval($montoRep); 
                $mis=floatval($mis)+floatval($montoServi);
               $mil=floatval($mil)+floatval($montoAcie);   
            }else if($index->id_tipomant==8){
              
                $mar=floatval($mar)+floatval($montoRep);
                $mas=floatval($mas)+floatval($montoServi);
                $mal=floatval($mal)+floatval($montoAcie); 
            }
            $totaRea=floatval($totaRea)+$montoRep;
            $totaMoa=floatval($montoServi)+$totaMoa;
            $totaACa=floatval($montoAcie)+ $totaACa;
       }else{
      
            if($index->id_tipomant==1){
               
                $m1br=floatval($m1br)+floatval($montoRep);
                $m1bs=floatval($m1bs)+floatval($montoServi);
                $m1bl=floatval($m1bl)+floatval($montoAcie);

            }else if($index->id_tipomant==2){
              
                 $m2br=floatval($m2br)+floatval($montoRep);
                 $m2bs=floatval($m2bs)+floatval($montoServi);
                  $m2bl=floatval($m2bl)+floatval($montoAcie);
            }else if($index->id_tipomant==3){
               
                 $mpbr=floatval($mpbr)+floatval($montoRep);
                 $mpbs=floatval($mpbs)+floatval($montoServi);
                  $mpbl=floatval($mpbl)+floatval($montoAcie);
            }else if($index->id_tipomant==4){
               
                 $mmbr=floatval($mmbr)+floatval($montoRep);
                 $mmbs=floatval($mmbs)+floatval($montoServi);
                  $mmbl=floatval($mmbl)+floatval($montoAcie);
            }else if($index->id_tipomant==5){
              
                 $mcbr=floatval($mcbr)+floatval($montoRep);
                 $mcbs=floatval($mcbs)+floatval($montoServi);
                 $mcbl=floatval($mcbl)+floatval($montoAcie); 

            }else if($index->id_tipomant==6){
               
                 $mrbr=floatval($mrbr)+floatval($montoRep);
                 $mrbs=floatval($mrbs)+floatval($montoServi);
                 $mrbl=floatval($mrbl)+floatval($montoAcie); 

            }else if($index->id_tipomant==7){
              
                 $mgbr=floatval($mgbr)+floatval($montoRep);
                 $mgbs=floatval($mgbs)+floatval($montoServi);
                 $mgbl=floatval($mgbl)+floatval($montoAcie); 
            }else if($index->id_tipomant==8){
                
                 $mibr=floatval($mibr)+floatval($montoRep);
                 $mibs=floatval($mibs)+floatval($montoServi);
                 $mibl=floatval($mibl)+floatval($montoAcie); 
            }else if($index->id_tipomant==8){
                
                 $mabr=floatval($mabr)+floatval($montoRep);
                 $mabs=floatval($mabs)+floatval($montoServi);
                 $mabl=floatval($mabl)+floatval($montoAcie); 
            }
            $totaReb=floatval($montoRep)+$totaReb;
            $totaMob=floatval($montoServi)+$totaMob;
            $totaACb=floatval($montoAcie)+ $totaACb;
            
       }
    };
    foreach ($data_orden as $index)
    {
          $montoServi=floatval($index->MontoSerOrden);
          if($index->id_tipoveh==1){
            if($index->id_tipomant==1){
                $m1=$m1+1;
                $m1s=floatval($m1s)+floatval($montoServi);
            }else if($index->id_tipomant==2){
                $m2=$m2+1;
                $m2s=floatval($m2s)+floatval($montoServi);
            }else if($index->id_tipomant==3){
                $mp=$mp+1;
               
                $mps=floatval($mps)+floatval($montoServi);
               
            }else if($index->id_tipomant==4){
                $mm=$mm+1;
               
                $mms=floatval($mms)+floatval($montoServi);
             
            }else if($index->id_tipomant==5){
                $mc=$mc+1;
              
                 $mcs=floatval($mcs)+floatval($montoServi);
              
            }else if($index->id_tipomant==6){
                $mr=$mr+1;
                 $mrs=floatval($mrs)+floatval($montoServi);
              
            }else if($index->id_tipomant==7){
                $mg=$mg+1;
             
                $mgs=floatval($mgs)+floatval($montoServi);
            
            }else if($index->id_tipomant==8){
                $mi=$mi+1;
              
                $mis=floatval($mis)+floatval($montoServi);
           
            }else if($index->id_tipomant==8){
                $ma=$ma+1;
               
                $mas=floatval($mas)+floatval($montoServi);
               
            }
     
            $totaMoa=floatval($montoServi)+$totaMoa;
       
            $tota=$tota+1;
       }else{
       
            if($index->id_tipomant==1){
                $m1b=$m1b+1;
              
                $m1bs=floatval($m1bs)+floatval($montoServi);
             

            }else if($index->id_tipomant==2){
                $m2b=$m2b+1;
             
                 $m2bs=floatval($m2bs)+floatval($montoServi);
               
            }else if($index->id_tipomant==3){
                $mpb=$mpb+1;
              
                 $mpbs=floatval($mpbs)+floatval($montoServi);
               
            }else if($index->id_tipomant==4){
                $mmb=$mmb+1;
               
                 $mmbs=floatval($mmbs)+floatval($montoServi);
                
            }else if($index->id_tipomant==5){
                $mcb=$mcb+1;
               
                 $mcbs=floatval($mcbs)+floatval($montoServi);
             

            }else if($index->id_tipomant==6){
                $mrb=$mrb+1;
                
                 $mrbs=floatval($mrbs)+floatval($montoServi);
              

            }else if($index->id_tipomant==7){
                $mgb=$mgb+1;
               
                 $mgbs=floatval($mgbs)+floatval($montoServi);
                 
            }else if($index->id_tipomant==8){
                $mib=$mib+1;
                
                 $mibs=floatval($mibs)+floatval($montoServi);
              
            }else if($index->id_tipomant==8){
                $mab=$mab+1;
              
                 $mabs=floatval($mabs)+floatval($montoServi);
                
            }
       
            $totaMob=floatval($montoServi)+$totaMob;
            $totb=$totb+1;
       }

    }
    $tofinR=floatval($totaReb)+floatval($totaRea);
    $tofinL=floatval($totaACb)+floatval($totaACa);

?>    
<table>
    <thead>
    <tr>
        <th></th>
        <td colspan="13" style="text-align: center"><h3> RESUMEN MENSUAL DE ACTIVIDADES </h3></td>
    </tr>
    <tr><th></th></tr>
    <tr> 
        <th></th>
         <td width="15" colspan="13" style="text-align: center"><b>Conseccionario/STA:</b> <p>{{ $data_compania[0]->NombreComercial }}</p>  </td>
    </tr>
    <tr> 
        <th></th>
         <td width="15" colspan="6" style="text-align: center"><b>Fecha Reporte:</b><p>{{ date('d/m/Y') }}</p>  </td>
         <td width="15" colspan="7" style="text-align: center"><b>Responsable:</b> <p>{{ $usuario[0]->name }}</p>  </td>
    </tr>
    <tr> 
        <th></th>
        <td width="15" colspan="4" style="text-align: center"><b>Año:</b> <p>{{ $Anio }}</p>  </td>
        <td width="15" colspan="5" style="text-align: center"><b>Mes:</b> <p>{{ $mes}}</p>  </td>
        <td width="15" colspan="4" style="text-align: center"><b>Tipo de cambio:</b><p>{{ $cambio[0]->Mensaje}}</p>  </td>
    </tr>
    <tr><th></th></tr>
    <tr> 
        <th></th>
        <td width="15" colspan="13" style="text-align: center;border: 1px solid #000000"><b>Reporte de Sercicio Técnico</b></td>
    </tr>
    <tr> 
        <th></th>
        <td width="15" colspan="13" style="text-align: center;border: 1px solid #000000"><b>Ingresos por Sercicio 2W Taller</b></td>
    </tr>
    <tr><th></th></tr>
    <tr> 
        <th></th>
        <td width="15" colspan="4" style="text-align: center"><b>Tipo de Mantenimiento</b></td>
        <td width="30" colspan="3" style="text-align: center"><b>Cantidad de Servicios (Taller)</b></td>
        <td width="15" colspan="6" style="text-align: center"><b>Facturación (S/)</b></td>
    </tr>
     <tr> 
        <th></th>
        <td width="15" colspan="7" style="text-align: center"><b></b></td>
        <td width="15" colspan="2" style="text-align: center"><b>Mano de Obra</b></td>
        <td width="15" colspan="2" style="text-align: center"><b>Repuestos</b></td>
        <td width="15" colspan="2" style="text-align: center"><b>Lubricantes</b></td>
    </tr>
    <tr> 
        <th></th>
        <td width="15" colspan="4" style="text-align: center;border: 1px solid #000000">Mantenimiento 1:</td>
        <td width="15" colspan="3" style="text-align: center;border: 1px solid #000000">{{$m1}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$m1s}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$m1r}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$m1l}}</td>
    </tr>
    <tr> 
        <th></th>
        <td width="15" colspan="4" style="text-align: center;border: 1px solid #000000">Mantenimiento 2:</td>
        <td width="15" colspan="3" style="text-align: center;border: 1px solid #000000">{{$m2}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$m2s}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$m2r}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$m2l}}</td>
    </tr>
    
    <tr> 
        <th></th>
        <td width="15" colspan="4" style="text-align: center;border: 1px solid #000000">Mantenimiento Periódico:</td>
        <td width="15" colspan="3" style="text-align: center;border: 1px solid #000000">{{$mp}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$mps}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$mpr}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$mpl}}</td>
    </tr>
    
    <tr> 
        <th></th>
        <td width="15" colspan="4" style="text-align: center;border: 1px solid #000000">Reparación (Mecánica):</td>
        <td width="15" colspan="3" style="text-align: center;border: 1px solid #000000">{{$mm}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$mms}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$mmr}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$mml}}</td>
    </tr>
    
    <tr> 
        <th></th>
        <td width="15" colspan="4" style="text-align: center;border: 1px solid #000000">Reparación (Colisión):</td>
        <td width="15" colspan="3" style="text-align: center;border: 1px solid #000000">{{$mc}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$mcs}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$mcr}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$mcl}}</td>
    </tr>
    
    <tr> 
        <th></th>
        <td width="15" colspan="4" style="text-align: center;border: 1px solid #000000">Servicio Rápido:</td>
        <td width="15" colspan="3" style="text-align: center;border: 1px solid #000000">{{$mr}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$mrs}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$mrr}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$mrl}}</td>
    </tr>
    
    <tr> 
        <th></th>
        <td width="15" colspan="4" style="text-align: center;border: 1px solid #000000">Reclamo de Garantía:</td>
        <td width="15" colspan="3" style="text-align: center;border: 1px solid #000000">{{$mg}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$mgs}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$mgr}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$mgl}}</td>
    </tr>
    
    <tr> 
        <th></th>
        <td width="15" colspan="4" style="text-align: center;border: 1px solid #000000">Orden de Servicio Interna:</td>
        <td width="15" colspan="3" style="text-align: center;border: 1px solid #000000">{{$mi}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$mis}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$mir}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$mil}}</td>
    </tr>
    
    <tr> 
        <th></th>
        <td width="15" colspan="4" style="text-align: center;border: 1px solid #000000">Accesorios:</td>
        <td width="15" colspan="3" style="text-align: center;border: 1px solid #000000">{{$ma}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$mas}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$mar}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$mal}}</td>
    </tr>
    
    <tr> 
        <th></th>
        <td width="15" colspan="4" style="text-align: center;border: 1px solid #000000"><b>Total:</b></td>
        <td width="15" colspan="3" style="text-align: center;border: 1px solid #000000">{{$tota}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$totaMoa}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$totaRea}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$totaACa}}</td>
    </tr>
    <tr><th></th></tr>
    <tr> 
        <th></th>
        <td width="15" colspan="13" style="text-align: center;border: 1px solid #000000"><b>Ingresos por Sercicio 3W Taller</b></td>
    </tr>
    <tr> 
        <th></th>
        <td width="15" colspan="4" style="text-align: center"><b>Tipo de Mantenimiento</b></td>
        <td width="30" colspan="3" style="text-align: center"><b>Cantidad de Servicios (Taller)</b></td>
        <td width="15" colspan="6" style="text-align: center"><b>Facturación (S/)</b></td>
    </tr>
     <tr> 
        <th></th>
        <td width="15" colspan="7" style="text-align: center"><b></b></td>
        <td width="15" colspan="2" style="text-align: center"><b>Mano de Obra</b></td>
        <td width="15" colspan="2" style="text-align: center"><b>Repuestos</b></td>
        <td width="15" colspan="2" style="text-align: center"><b>Lubricantes</b></td>
    </tr>
    <tr> 
        <th></th>
        <td width="15" colspan="4" style="text-align: center;border: 1px solid #000000">Mantenimiento 1:</td>
        <td width="15" colspan="3" style="text-align: center;border: 1px solid #000000">{{$m1b}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$m1bs}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$m1br}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$m1bl}}</td>
    </tr>
    <tr> 
        <th></th>
        <td width="15" colspan="4" style="text-align: center;border: 1px solid #000000">Mantenimiento 2:</td>
        <td width="15" colspan="3" style="text-align: center;border: 1px solid #000000">{{$m2b}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$m2bs}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$m2br}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$m2bl}}</td>
    </tr>
    
    <tr> 
        <th></th>
        <td width="15" colspan="4" style="text-align: center;border: 1px solid #000000">Mantenimiento Periódico:</td>
        <td width="15" colspan="3" style="text-align: center;border: 1px solid #000000">{{$mpb}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$mpbs}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$mpbr}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$mpbl}}</td>
    </tr>
    
    <tr> 
        <th></th>
        <td width="15" colspan="4" style="text-align: center;border: 1px solid #000000">Reparación (Mecánica):</td>
        <td width="15" colspan="3" style="text-align: center;border: 1px solid #000000">{{$mmb}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$mmbs}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$mmbr}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$mmbl}}</td>
    </tr>
    
    <tr> 
        <th></th>
        <td width="15" colspan="4" style="text-align: center;border: 1px solid #000000">Reparación (Colisión):</td>
        <td width="15" colspan="3" style="text-align: center;border: 1px solid #000000">{{$mcb}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$mcbs}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$mcbr}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$mcbl}}</td>
    </tr>
    
    <tr> 
        <th></th>
        <td width="15" colspan="4" style="text-align: center;border: 1px solid #000000">Servicio Rápido:</td>
        <td width="15" colspan="3" style="text-align: center;border: 1px solid #000000">{{$mrb}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$mrbs}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$mrbr}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$mrbl}}</td>
    </tr>
    
    <tr> 
        <th></th>
        <td width="15" colspan="4" style="text-align: center;border: 1px solid #000000">Reclamo de Garantía:</td>
        <td width="15" colspan="3" style="text-align: center;border: 1px solid #000000">{{$mgb}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$mgbs}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$mgbr}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$mgbl}}</td>
    </tr>
    
    <tr> 
        <th></th>
        <td width="15" colspan="4" style="text-align: center;border: 1px solid #000000">Orden de Servicio Interna:</td>
        <td width="15" colspan="3" style="text-align: center;border: 1px solid #000000">{{$mib}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$mibs}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$mibr}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$mibl}}</td>
    </tr>
    
    <tr> 
        <th></th>
        <td width="15" colspan="4" style="text-align: center;border: 1px solid #000000">Accesorios:</td>
        <td width="15" colspan="3" style="text-align: center;border: 1px solid #000000">{{$mab}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$mabs}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$mabr}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$mabl}}</td>
    </tr>
    
    <tr> 
        <th></th>
        <td width="15" colspan="4" style="text-align: center;border: 1px solid #000000"><b>Total:</b></td>
        <td width="15" colspan="3" style="text-align: center;border: 1px solid #000000">{{$tota}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$totaMob}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$totaReb}}</td>
        <td width="15" colspan="2" style="text-align: center;border: 1px solid #000000">{{$totaACb}}</td>
    </tr>
    <tr><th></th></tr>
    <tr> 
        <th></th>
        <td width="15" colspan="13" style="text-align: center;border: 1px solid #000000"><b>Ingresos por Venta de Repuestos y Lubricantes</b></td>
    </tr>
    <tr><th></th></tr>
    <tr> 
        <th></th>
        <td width="15" colspan="4" style="text-align: center"><b></b></td>
        <td width="30" colspan="3" style="text-align: center"><b>Venta de Repuestos</b></td>
        <td width="15" colspan="6" style="text-align: center"><b>Venta de Lubricantes</b></td>
    </tr>
    <tr> 
        <th></th>
        <td width="15" colspan="4" style="text-align: center;border: 1px solid #000000"><b>Total</b></td>
        <td width="30" colspan="3" style="text-align: center;border: 1px solid #000000"><b>{{$tofinR}}</b></td>
        <td width="15" colspan="6" style="text-align: center;border: 1px solid #000000"><b>{{$tofinL}}</b></td>
    </tr>
    </thead>
   
</table>

</body>
