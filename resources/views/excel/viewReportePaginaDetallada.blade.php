<!DOCTYPE html>
<html lang="es">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
<body>
<table>
    <thead>
    <tr> 
        <th></th>
        <th width="20"></th>
        <th width="20"></th>
        <th width="20"></th>
        <th width="20"></th>
        <th width="20"></th>
        <th width="20"></th>
        <th width="20"></th>
    </tr>
   
     <?php $ene=0;$feb=0;$mar=0;$abr=0;$may=0;$jun=0;$jul=0;$ago=0;$sep=0;$oct=0;$nov=0;$dic=0;?>
     <?php $enem=0;$febm=0;$marm=0;$abrm=0;$maym=0;$junm=0;$julm=0;$agom=0;$sepm=0;$octm=0;$novm=0;$dicm=0;?>
     @foreach($data_metas as $d)
             <?php 
                if($d->Mes==1){
                    $ene=$ene+$d->nCant;
                     $enem=$enem+$d->nMonto;
                }else if($d->Mes==2){
                    $feb=$feb+$d->nCant;
                     $febm=$febm+$d->nMonto;
                }else if($d->Mes==3){
                     $mar=$mar+$d->nCant;
                      $marm=$marm+$d->nMonto;
                }else if($d->Mes==4){
                    $abr=$abr+$d->nCant;
                     $abrm=$abrm+$d->nMonto;
                } else if($d->Mes==5){
                    $may=$may+$d->nCant;
                     $maym=$maym+$d->nMonto;
                } else if($d->Mes==6){
                    $jun=$jun+$d->nCant;
                     $junm=$junm+$d->nMonto;
                } else if($d->Mes==7){
                    $jul=$jul+$d->nCant;
                     $julm=$julm+$d->nMonto;
                } else if($d->Mes==8){
                    $ago=$ago+$d->nCant;
                     $agom=$agom+$d->nMonto;
                } else if($d->Mes==9){
                    $sep=$sep+$d->nCant;
                     $sepm=$sepm+$d->nMonto;
                } else if($d->Mes==10){
                    $oct=$oct+$d->nCant;
                     $octm=$octm+$d->nMonto;
                } else if($d->Mes==11){
                    $nov=$nov+$d->nCant;
                     $novm=$novm+$d->nMonto;
                } else if($d->Mes==12){
                    $dic=$dic+$d->nCant;
                     $dicm=$dicm+$d->nMonto;
                }   
             ?>
     @endforeach
       @for ($i = 1; $i <= 12; $i++)

       <?php $valuni="";$valsol="";$name="";if($i==1){
                $name="ENERO";
                $valuni=$ene;
                $valsol=$enem;
              }else if ($i==2){
                 $name="FEBRERO";
                $valuni=$feb;
                $valsol=$febm;
              }else if ($i==3){
                 $name="MARZO";
                $valuni=$mar;
                $valsol=$marm;
              }else if ($i==4){
                 $name="ABRIL";
                   $valuni=$abr;
                $valsol=$abrm;
              }else if ($i==5){
                 $name="MAYO";
                   $valuni=$may;
                $valsol=$maym;
              }else if ($i==6){
                 $name="JUNIO";
                   $valuni=$jun;
                $valsol=$junm;
              }else if ($i==7){
                 $name="JULIO";
                   $valuni=$jul;
                $valsol=$julm;
              }else if ($i==8){
                 $name="AGOSTO";
                   $valuni=$ago;
                $valsol=$agom;
              }else if ($i==9){
                  $valuni=$sep;
                $valsol=$sepm;
                 $name="SEPTIEMBRE";
              }else if ($i==10){
                    $valuni=$oct;
                $valsol=$oct;
                 $name="OCTUBRE";
              }else if ($i==11){
                  $valuni=$nov;
                $valsol=$novm;
                 $name="NOVIEMBRE";
              }else if ($i==12){
                  $valuni=$dic;
                  $valsol=$dicm;
                 $name="DICIEMBRE";
              } ?>
      <tr>
        <th></th>
        <td colspan="7" height="20" style="text-align: center;color:#fefffe;background-color: #c10100;border: 1px solid #000000"><h3>PRODUCTIVIDAD SERVICIO TECNICO {{$name}} {{$anio}}</h3></td>
    </tr>
    <tr>
        <th></th>
        <th></th>
        <td colspan="3" height="20" style="text-align: center;background-color: #ffc101;border: 1px solid #000000"><h5>OBJETIVO UNID.= {{$valuni}} </h5></td>
        <td colspan="3" height="20" style="text-align: center;background-color: #ffc101;border: 1px solid #000000"><h5>OBJETIVO MONETARIO.= S/{{$valsol}}</h5></td>
    </tr>
    <tr>
        <th></th>
        <th rowspan="2"style="text-align: center;border: 1px solid #000000;text-align: center;vertical-align:middle;" ><h4><center>TECNICO</center><h4></th>
        <td colspan="3" height="20" style="text-align: center;background-color: #c4d8f1;border: 1px solid #000000"><h5>SERVICIOS ATENDIDOS (UNIDADES) </h5></td>
        <td colspan="3" height="20" style="text-align: center;background-color: #d8e4bc;border: 1px solid #000000"><h5>SERVICIOS PAGADOS (SOLES)</h5></td>
    </tr>
    <tr>
        <th></th>
        <th></th>
        <td  height="20" style="text-align: center;background-color: #c4d8f1;border: 1px solid #000000"><h5>AVANCE und. </h5></td>
        <td  height="20" style="text-align: center;background-color: #c4d8f1;border: 1px solid #000000"><h5>META und.</h5></td>
        <td  height="20" style="text-align: center;background-color: #c4d8f1;border: 1px solid #000000"><h5>%AVANCE </h5></td>
        <td  height="20" style="text-align: center;background-color: #d8e4bc;border: 1px solid #000000"><h5>AVANCE S/.</h5></td>
        <td  height="20" style="text-align: center;background-color: #d8e4bc;border: 1px solid #000000"><h5>META S/.</h5></td>
        <td  height="20" style="text-align: center;background-color: #d8e4bc;border: 1px solid #000000"><h5>%AVANCE</h5></td>
    </tr>
    
     <?php $mes=$i;?>
    <?php $metaToFin=0;?>
    <?php $porfToFin=0;?>

    <?php $ca=0;?>
    <?php $cb=0;?>
    <?php $cc=0;?>
    <?php $cd=0;?>
    <?php $ce=0;?>
    <?php $cf=0;?>
    @foreach($data_tecnico as $d)
        <?php $meta=0;?>
         <?php $metaM=0;?>
        <?php $conFin=0;?>
       <?php $montoFin=0;?>
       <?php $porFin=0;?>
        <?php $porFinM=0;?>
      <?php $contd=0;?>
    <tr>
        <th></th>
        <th width="20" style="border: 1px solid #000000" ><h6>{{$d->descripcion}}</h6></th>
        
           
        @foreach($data_info as $din)
            @if( $mes==$din->mes and $d->id == $din->idTecnico)
               <?php $contd=$contd+1;$conFin=$conFin+1;$montoFin=$montoFin+$din->total?>
            @endif  
        @endforeach 
        
         @foreach($data_metas as $met) 
            @if( $mes==$met->Mes and $met->id_Persona == $d->id)
                <?php $meta=$met->nCant?>
                <?php $metaM=$met->nMonto?>
            @endif  
         @endforeach

         <?php if($meta==0){
            $porFin=0;
         }else{$porFin=$contd*100/$meta;}?>

         <?php if($metaM==0){
            $porFinM=0;
         }else{$porFinM=$montoFin*100/$metaM;}?>

        <?php $pora=round($porFin,2);?>
        <?php $porb=round($porFinM,2);?>
         <td style="border: 1px solid #000000;background-color:#c4d8f1;text-align: center;vertical-align: middle"><center>{{$contd}}</center></td>

         <td style="border: 1px solid #000000;background-color:#c4d8f1;text-align: center;vertical-align: middle"><center>{{$meta}}</center></td>
        <td style="border: 1px solid #000000;background-color:#c4d8f1;text-align: center;vertical-align: middle"><center>{{$pora}}</center></td>

        <td style="border: 1px solid #000000;background-color:#d8e4bc;text-align: center;vertical-align: middle"><center>{{$montoFin}}</center></td>

         <td style="border: 1px solid #000000;background-color:#d8e4bc;text-align: center;vertical-align: middle"><center>{{$metaM}}</center></td>
        <td style="border: 1px solid #000000;background-color:#d8e4bc;text-align: center;vertical-align: middle"><center>{{$porb}}</center></td>
        <?php $ca=$ca+$contd;?>
        <?php $cb=$cb+$meta;?>
        <?php $cc=$cc+$pora;?>
        <?php $cd=$cd+$montoFin;?>
        <?php $ce=$ce+$metaM;?>
        <?php $cf=$cf+$porb;?>
    </tr>
    @endforeach
    <tr>
        <th></th>
        <th width="20" style="border: 1px solid #000000" ><h6>TOTAL:</h6></th>
        <td  height="20" style="text-align: center;background-color: #c4d8f1;border: 1px solid #000000"><h5>{{$ca}} </h5></td>
        <td  height="20" style="text-align: center;background-color: #c4d8f1;border: 1px solid #000000"><h5>{{$cb}}</h5></td>
        <td  height="20" style="text-align: center;background-color: #c4d8f1;border: 1px solid #000000"><h5>{{$cc}}</h5></td>
        <td  height="20" style="text-align: center;background-color: #d8e4bc;border: 1px solid #000000"><h5>{{$cd}}</h5></td>
        <td  height="20" style="text-align: center;background-color: #d8e4bc;border: 1px solid #000000"><h5>{{$ce}}</h5></td>
        <td  height="20" style="text-align: center;background-color: #d8e4bc;border: 1px solid #000000"><h5>{{$cf}}</h5></td>
    </tr>
     <tr> 
        <th></th>
        <th width="20"></th>
        <th width="20"></th>
        <th width="20"></th>
        <th width="20"></th>
        <th width="20"></th>
        <th width="20"></th>
        <th width="20"></th>
    </tr>
     <tr> 
        <th></th>
        <th width="20"></th>
        <th width="20"></th>
        <th width="20"></th>
        <th width="20"></th>
        <th width="20"></th>
        <th width="20"></th>
        <th width="20"></th>
    </tr>
  @endfor
   
    <tr><th></th></tr>
    </thead>
</table>
</body>
