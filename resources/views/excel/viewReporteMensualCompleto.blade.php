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
        <th></th>
    </tr>
    <tr>
        <th></th>
        <th></th>
        <td colspan="12" height="20" style="text-align: center;color:#fefffe;background-color: #c10100;border: 1px solid #000000"><h3>OBJETIVOS DE PRODUCCIÓN POSVENTA {{$anio}}(CONSORCIO & ASOCIADOS)</h3></td>
    </tr>
     <tr>
        <th></th>
        <th></th>
    </tr>
    <tr>
        <th></th>
        <th></th>
        <td colspan="12" style="text-align: center;background-color: #92d151;border: 1px solid #000000"><h3>TALLER DE SERVICIO TÉCNICO</h3></td>
    </tr>
    <tr>
        <th></th>
        <th></th>
        <td colspan="12" style="text-align: center;background-color: #ffff00;border: 1px solid #000000"><h3>VOLUMEN DE SERVICIO TÉCNICO</h3></td>
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
     <tr>
        <th></th>
        <th></th>
        <td width="13" style="text-align: center;background-color: #ffc101;border: 1px solid #000000"><h3>Ene-{{$anio}}</h3></td>
        <td width="13" style="text-align: center;background-color: #ffc101;border: 1px solid #000000"><h3>Feb-{{$anio}}</h3></td>
        <td width="13" style="text-align: center;background-color: #ffc101;border: 1px solid #000000"><h3>Mar-{{$anio}}</h3></td>
        <td width="13" style="text-align: center;background-color: #ffc101;border: 1px solid #000000"><h3>Abr-{{$anio}}</h3></td>
        <td width="13" style="text-align: center;background-color: #ffc101;border: 1px solid #000000"><h3>May-{{$anio}}</h3></td>
        <td width="13" style="text-align: center;background-color: #ffc101;border: 1px solid #000000"><h3>Jun-{{$anio}}</h3></td>
        <td width="13" style="text-align: center;background-color: #ffc101;border: 1px solid #000000"><h3>Jul-{{$anio}}</h3></td>
        <td width="13" style="text-align: center;background-color: #ffc101;border: 1px solid #000000"><h3>Ago-{{$anio}}</h3></td>
        <td width="13" style="text-align: center;background-color: #ffc101;border: 1px solid #000000"><h3>Sep-{{$anio}}</h3></td>
        <td width="13" style="text-align: center;background-color: #ffc101;border: 1px solid #000000"><h3>Oct-{{$anio}}</h3></td>
        <td width="13" style="text-align: center;background-color: #ffc101;border: 1px solid #000000"><h3>Nov-{{$anio}}</h3></td>
        <td width="13" style="text-align: center;background-color: #ffc101;border: 1px solid #000000"><h3>Dic-{{$anio}}</h3></td>
    </tr>
    <tr>
        <th></th>
        <th width="15" style="background-color: #fde4d7;border: 1px solid #000000">Unidades</th>
        <td width="13" style="text-align: center;background-color: #fde4d7;border: 1px solid #000000"><h3>{{$ene}}</h3></td>
        <td width="13" style="text-align: center;background-color: #fde4d7;border: 1px solid #000000"><h3>{{$feb}}</h3></td>
        <td width="13" style="text-align: center;background-color: #fde4d7;border: 1px solid #000000"><h3>{{$mar}}</h3></td>
        <td width="13" style="text-align: center;background-color: #fde4d7;border: 1px solid #000000"><h3>{{$abr}}</h3></td>
        <td width="13" style="text-align: center;background-color: #fde4d7;border: 1px solid #000000"><h3>{{$may}}</h3></td>
        <td width="13" style="text-align: center;background-color: #fde4d7;border: 1px solid #000000"><h3>{{$jun}}</h3></td>
        <td width="13" style="text-align: center;background-color: #fde4d7;border: 1px solid #000000"><h3>{{$jul}}</h3></td>
        <td width="13" style="text-align: center;background-color: #fde4d7;border: 1px solid #000000"><h3>{{$ago}}</h3></td>
        <td width="13" style="text-align: center;background-color: #fde4d7;border: 1px solid #000000"><h3>{{$sep}}</h3></td>
        <td width="13" style="text-align: center;background-color: #fde4d7;border: 1px solid #000000"><h3>{{$oct}}</h3></td>
        <td width="13" style="text-align: center;background-color: #fde4d7;border: 1px solid #000000"><h3>{{$nov}}</h3></td>
        <td width="13" style="text-align: center;background-color: #fde4d7;border: 1px solid #000000"><h3>{{$dic}}</h3></td>
    </tr>
    <tr>
        <th></th>
        <th width="15" style="background-color: #d8e4bc;border: 1px solid #000000">Monetario S/</th>
        <td width="13" style="text-align: center;background-color: #d8e4bc;border: 1px solid #000000"><h3>{{$enem}}</h3></td>
        <td width="13" style="text-align: center;background-color: #d8e4bc;border: 1px solid #000000"><h3>{{$febm}}</h3></td>
        <td width="13" style="text-align: center;background-color: #d8e4bc;border: 1px solid #000000"><h3>{{$marm}}</h3></td>
        <td width="13" style="text-align: center;background-color: #d8e4bc;border: 1px solid #000000"><h3>{{$abrm}}</h3></td>
        <td width="13" style="text-align: center;background-color: #d8e4bc;border: 1px solid #000000"><h3>{{$maym}}</h3></td>
        <td width="13" style="text-align: center;background-color: #d8e4bc;border: 1px solid #000000"><h3>{{$junm}}</h3></td>
        <td width="13" style="text-align: center;background-color: #d8e4bc;border: 1px solid #000000"><h3>{{$julm}}</h3></td>
        <td width="13" style="text-align: center;background-color: #d8e4bc;border: 1px solid #000000"><h3>{{$agom}}</h3></td>
        <td width="13" style="text-align: center;background-color: #d8e4bc;border: 1px solid #000000"><h3>{{$sepm}}</h3></td>
        <td width="13" style="text-align: center;background-color: #d8e4bc;border: 1px solid #000000"><h3>{{$octm}}</h3></td>
        <td width="13" style="text-align: center;background-color: #d8e4bc;border: 1px solid #000000"><h3>{{$novm}}</h3></td>
        <td width="13" style="text-align: center;background-color: #d8e4bc;border: 1px solid #000000"><h3>{{$dicm}}</h3></td>
    </tr>
    <tr><th></th></tr>
    
    </thead>
</table>
</body>
