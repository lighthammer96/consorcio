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

         <td colspan="36"  height="30" style="text-align: center;color:#ff0000;vertical-align: middle;"><h5><center>MOTOS REGISTRADAS POR DÍA </center></h5></td>
    </tr>
    <tr>
        <th></th>
    </tr>
    <tr>
        <th ></th>
        <!--  <th width="4" colspan="3" rowspan="2"></th> -->
        <th ></th>
        <td colspan="31"  style="border: 1px solid #000000;text-align: center;vertical-align: middle;"><h5><center>{{$mesName}}-{{$anio}}</center></h5></td>
        <td width="15" rowspan="2" style="border: 1px solid #000000;background-color:#ffff00;text-align: center;vertical-align: middle"><center>{{$mesName}}</center></td>
        <td width="15" rowspan="2"  style="border: 1px solid #000000;background-color:#ffff00;text-align: center;vertical-align:middle;" ><center> Total S/ </center></td>  
    </tr>
    <tr>
        <th></th>
        <th width="4"></th>
         @for ($i = 1; $i <= 31; $i++)
             <td  width="4" style="border: 1px solid #000000;text-align: center;color:#000000;background-color:#ffff00;vertical-align: middle;"><center>{{$i}}</center></td>
        @endfor
    </tr>
     <tr>
        <th></th>
        <th width="15" style="border: 1px solid #000000;text-align: center;vertical-align: middle;" >Total Diario</th>
        <?php $contotal=0;$contCant=0;?>
        @for ($i = 1; $i <= 31; $i++)
          <?php $cont=0?>
          @foreach($data_info as $d)
            @if( $mes==$d->mes and $d->dia == $i)
             <?php $cont=$cont+1;$contotal=$contotal+1;$contCant=$contCant+$d->total?>
            @endif  
          @endforeach
           <td  width="4" style="border: 1px solid #000000;text-align: center;background-color:#ffff00;vertical-align: middle;"><center>{{$cont}}</center></td>
        @endfor
         <td width="15"  style="border: 1px solid #000000;background-color:#ffff00;text-align: center;vertical-align: middle"><center>{{$contotal}}</center></td>
        <td width="15" style="border: 1px solid #000000;text-align: center;background-color:#ffff00;vertical-align: middle;" ><center>{{$contCant}}</center></td>
    </tr>
    <tr>
        <th></th>
    </tr>
    <tr>
        <th></th>
    </tr>
    <tr>
        <th></th>
    </tr>
    <tr>
        <th ></th>
        <th rowspan="2" style="border: 1px solid #000000;text-align: center;vertical-align: middle;" width="15"><center>TECNICO</center></th>
       
        <td  colspan="31"  style="border: 1px solid #000000;text-align: center;vertical-align: middle;"><h5><center>{{$mesName}}-{{$anio}}</center></h5></td>
        <td width="15" rowspan="2" style="border: 1px solid #000000;background-color:#96be25;text-align: center;vertical-align: middle"><center>{{$mesName}}</center></td>
        <td width="15" rowspan="2" style="border: 1px solid #000000;background-color:#96be25;text-align: center;vertical-align:middle;"><center> Total S/ </center></td> 
        <td width="15" rowspan="2" style="border: 1px solid #000000;background-color:#96be25;text-align: center;vertical-align: middle"><center>Meta mes</center></td>
        <td width="15" rowspan="2" style="border: 1px solid #000000;background-color:#96be25;text-align: center;vertical-align:middle;"><center>%</center></td> 
    </tr>
    <tr>
        <th></th>
        <th width="15"></th>
         @for ($i = 1; $i <= 31; $i++)
             <td  width="4" style="border: 1px solid #000000;text-align: center;color:#000000;background-color:#ffff00;vertical-align: middle;"><center>{{$i}}</center></td>
        @endfor
    </tr>
     <?php $metaToFin=0;?>
      <?php $porfToFin=0;?>
        <?php $metaB=1;?>
    @foreach($data_tecnico as $d)
      <?php $meta=0;?>
      <?php $conFin=0;?>
      <?php $montoFin=0;?>
      <?php $porFin=0;?>

      
    <tr>
        <th></th>
        <th width="20" style="border: 1px solid #000000" ><h6>{{$d->descripcion}}</h6></th>
           @for ($i = 1; $i <= 31; $i++)
            <?php $contd=0;?>
                @foreach($data_info as $din)
                    @if( $mes==$din->mes and $din->dia == $i and $d->id == $din->idTecnico)
                     <?php $contd=$contd+1;$conFin=$conFin+1;$montoFin=$montoFin+$din->total?>
                    @endif  
                @endforeach
               <td  width="4" style="border: 1px solid #000000;text-align: center;color:#000000;background-color:#ffff00;vertical-align: middle;"><center>{{$contd}}</center></td>

           @endfor
           @foreach($data_metas as $met) 
            @if( $mes==$met->Mes and $met->id_Persona == $d->id)
                <?php $meta=$met->nCant;?>
                <?php $metaB=$met->nCant;?>
            @endif  
           @endforeach
         <?php if($meta==0){$metaB=1;}; $porFin=$conFin*100/$metaB;?>
          <?php $metaToFin=$metaToFin+$meta;?>
         <?php $porfToFin=$porfToFin+$porFin;?>
         <td width="15" style="border: 1px solid #000000;background-color:#96be25;text-align: center;vertical-align: middle"><center>{{$conFin}}</center></td>
         <td width="15" style="border: 1px solid #000000;background-color:#96be25;text-align: center;vertical-align:middle;"><center> {{$montoFin}} </center></td> 
         <td width="15" style="border: 1px solid #000000;text-align: center;vertical-align: middle"><center>{{$meta}}</center></td>
         <td width="15" style="border: 1px solid #000000;text-align: center;vertical-align:middle;"><center> {{round($porFin,2)}} %</center></td> 
    </tr>
    @endforeach
     <tr>
        <th></th>
        <th width="15" style="border: 1px solid #000000;background-color:#96be25;vertical-align: middle;" >Total Diario</th>
        <?php $contotal=0;$contCant=0;?>
        @for ($i = 1; $i <= 31; $i++)
          <?php $cont=0?>
          @foreach($data_info as $d)
            @if( $mes==$d->mes and $d->dia == $i)
             <?php $cont=$cont+1;$contotal=$contotal+1;$contCant=$contCant+$d->total?>
            @endif  
          @endforeach
           <td  width="4" style="border: 1px solid #000000;text-align: center;background-color:#96be25;vertical-align: middle;"><center>{{$cont}}</center></td>
        @endfor
         <td width="15"  style="border: 1px solid #000000;background-color:#96be25;text-align: center;vertical-align: middle"><center>{{$contotal}}</center></td>
        <td width="15" style="border: 1px solid #000000;text-align: center;background-color:#96be25;vertical-align: middle;" ><center>{{$contCant}}</center></td>
         <td width="15" style="border: 1px solid #000000;text-align: center;vertical-align: middle"><center>{{$metaToFin}}</center></td>
         <td width="15" style="border: 1px solid #000000;text-align: center;vertical-align:middle;"><center> {{round($porfToFin,2)}} %</center></td> 
    </tr>
    <tr>
        <th></th>
    </tr>

    @foreach($data_tecnico as $tec)
      <?php $conFin2=0;?>
      <?php $montoFin2=0;?>
    <tr>
        <th></th>
        <th width="15" rowspan="{{count($mantenimientos)+1}}" style="border: 1px solid #000000;background-color:#ffff99;vertical-align: middle"><center>{{$tec->descripcion}}</center></th>
         @for ($i = 1; $i <= 31; $i++)
             <td  width="4" style="border: 1px solid #000000;text-align: center;color:#000000;background-color:#ffff00;vertical-align: middle;"><center>{{$i}}</center></td>
         @endfor
        <td width="15"  style="border: 1px solid #000000;background-color:#ffff99;text-align: center;vertical-align: middle"><center>Total mes </center></td>
        <td width="15"  style="border: 1px solid #000000;background-color:#ffff99;text-align: center;vertical-align:middle;"><center> Total S/ </center></td> 
        <td width="15" colspan="2" style="border: 1px solid #000000;background-color:#ffff99;text-align: center;vertical-align: middle"><center>Tipo de Servicio</center></td>
        
    </tr>
    @foreach($mantenimientos as $d)
      <?php $contotal=0;$contCant=0?>
    <tr>
        <th></th>
        <th width="15"></th>
         @for ($i = 1; $i <= 31; $i++)
           <?php $cont=0?>
             @foreach($data_info as $dinfo)
             @if( $mes==$dinfo->mes and $dinfo->dia == $i and $tec->id == $dinfo->idTecnico and $d->id == $dinfo->id_tipomant)
              <?php $cont=$cont+1;$contotal=$contotal+1;$contCant=$contCant+$dinfo->total?>
             @endif  
            @endforeach
             <td  width="4" style="border: 1px solid #000000;text-align: center;color:#000000;background-color:#ffff00;vertical-align: middle;"><center>{{$cont}}</center></td>
        @endfor
        <td width="15"  style="border: 1px solid #000000;vertical-align: middle"><center>{{$contotal}}</center></td>
        <td width="15"  style="border: 1px solid #000000;vertical-align:middle;"><center>{{$contCant}}</center></td>
        <td width="15" colspan="2" style="border: 1px solid #000000;vertical-align: middle"><center>{{$d->descripcion}}</center></td>

    </tr>
    @endforeach
     
      
    
    <tr>
        <th></th>
        <th width="20" style="border: 1px solid #000000;background-color:#ffff99;" ><h6>Total</h6></th>
          @for ($i = 1; $i <= 31; $i++)
            <?php $contd=0;?>
                @foreach($data_info as $din)
                    @if( $mes==$din->mes and $din->dia == $i and $tec->id == $din->idTecnico)
                     <?php $contd=$contd+1;$conFin2=$conFin2+1;$montoFin2=$montoFin2+$din->total?>
                    @endif  
                @endforeach
               <td  width="4" style="border: 1px solid #000000;text-align: center;color:#000000;background-color:#ffff99;vertical-align: middle;"><center>{{$contd}}</center></td>

          @endfor
         <?php $metaB=1;?>
         <?php $meta=0;?>
       

         @foreach($data_metas as $met) 
            @if( $mes==$met->Mes and $met->id_Persona == $d->id)
                <?php $meta=$met->nCant;?>
                <?php $metaB=$met->nCant;?>
            @endif  
         @endforeach
         <?php if($meta==0){$metaB=1;}; $porFin=$conFin2*100/$metaB;?>
          <?php $metaToFin=$metaToFin+$meta;?>
         <?php $porfToFin=$porfToFin+$porFin;?>
         <td width="15" style="border: 1px solid #000000;background-color:#ffff99;vertical-align: middle">{{$conFin2}}</td>
         <td width="15" style="border: 1px solid #000000;background-color:#ffff99;vertical-align:middle;"> {{$montoFin2}} </td> 
     </tr>
     <tr>
        <th></th>
    </tr>
    @endforeach
     <tr>
        <th></th>
     </tr>
    <tr>
        <th></th>
        <th width="15" rowspan="{{count($mantenimientos)+1}}" style="border: 1px solid #000000;background-color:#ffff99;vertical-align: middle"><center><h6 >TOTALIZADO</h6></center></th>
         @for ($i = 1; $i <= 31; $i++)
             <td  width="4" style="border: 1px solid #000000;text-align: center;color:#000000;background-color:#ffff00;vertical-align: middle;"><center>{{$i}}</center></td>
         @endfor
        <td width="15"  style="border: 1px solid #000000;background-color:#ffff99;text-align: center;vertical-align: middle"><center>Total mes </center></td>
        <td width="15"  style="border: 1px solid #000000;background-color:#ffff99;text-align: center;vertical-align:middle;"><center> Total S/ </center></td> 
        <td width="15" colspan="2" style="border: 1px solid #000000;background-color:#ffff99;text-align: center;vertical-align: middle"><center>Tipo de Servicio</center></td>
        
    </tr>
      @foreach($mantenimientos as $d)
      <?php $contotal=0;$contCant=0?>
      <tr>
        <th></th>
        <th width="15"></th>
         @for ($i = 1; $i <= 31; $i++)
           <?php $cont=0?>
             @foreach($data_info as $dinfo)
             @if( $mes==$dinfo->mes and $dinfo->dia == $i and $d->id == $dinfo->id_tipomant)
              <?php $cont=$cont+1;$contotal=$contotal+1;$contCant=$contCant+$dinfo->total?>
             @endif  
            @endforeach
             <td  width="4" style="border: 1px solid #000000;text-align: center;color:#000000;background-color:#ffff00;vertical-align: middle;"><center>{{$cont}}</center></td>
        @endfor
        <td width="15"  style="border: 1px solid #000000;vertical-align: middle"><center>{{$contotal}}</center></td>
        <td width="15"  style="border: 1px solid #000000;vertical-align:middle;"><center>{{$contCant}}</center></td>
        <td width="15" colspan="2" style="border: 1px solid #000000;vertical-align: middle"><center>{{$d->descripcion}}</center></td>
     </tr>
    @endforeach
    <tr>
        <th></th>
        <th width="15" style="border: 1px solid #000000;background-color:#ffff99;" >Total</th>
        <?php $contotal=0;$contCant=0;?>
        @for ($i = 1; $i <= 31; $i++)
          <?php $cont=0?>
          @foreach($data_info as $d)
            @if( $mes==$d->mes and $d->dia == $i)
             <?php $cont=$cont+1;$contotal=$contotal+1;$contCant=$contCant+$d->total?>
            @endif  
          @endforeach
           <td  width="4" style="border: 1px solid #000000;text-align: center;background-color:#ffff00;vertical-align: middle;"><center>{{$cont}}</center></td>
        @endfor
         <td width="15"  style="border: 1px solid #000000;background-color:#ffff99;text-align: center;vertical-align: middle"><center>{{$contotal}}</center></td>
        <td width="15" style="border: 1px solid #000000;text-align: center;background-color:#ffff99;vertical-align: middle;" ><center>{{$contCant}}</center></td>
    </tr>
    </thead>
    <tbody>
    </tbody>
</table>
</body>
