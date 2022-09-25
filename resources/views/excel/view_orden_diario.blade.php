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
        <td colspan="{{ count($data['data'][0]) + 1 }}" style="text-align: center"><h3>C & A - {{ $data['title'] }}</h3></td>
    </tr>
    <tr><th></th></tr>
      <?php $marca=$Marca; if($idMarca==''){$marca='TODOS';};$tipo=$tipoveh; if($idtipoveh==''){$tipo='TODOS';};  ?>
    <tr>
        <td style="background-color: #ffffff"></td>
        <th colspan="5" style="border: 1px solid #000000; text-align: center">FECHA DE IMPRESIÓN:{{$fechacAc}}</th>
        <th colspan="3"style="border: 1px solid #000000; text-align: center">FECHA INICIO:{{$FechaInicioFiltro}}</th>
        <th colspan="3"style="border: 1px solid #000000; text-align: center">FECHA FIN:{{$FechaFinFiltro}}</th>
        <th colspan="3"style="border: 1px solid #000000; text-align: center">TIPO VEHÍCULO:{{$tipo}}</th>
        <th colspan="3"style="border: 1px solid #000000; text-align: center">MARCA:{{$marca}}</th>
    </tr>
    <tr><th></th></tr>
     <tr style="background-color: #cccccc">
        <td style="background-color: #ffffff"></td>
        <th colspan="7" style="border: 1px solid #000000; text-align: center">DATOS DEL SERVICIO</th>
        <th colspan="5" style="border: 1px solid #000000; text-align: center">DATOS DE LA MOTOCICLETA</th>
        <th colspan="5" style="border: 1px solid #000000; text-align: center">DATOS DEL CLIENTE</th>
    </tr>
    <tr style="background-color: #cccccc">
        <td style="background-color: #ffffff"></td>
        <th style="border: 1px solid #000000; text-align: center">ITEM</th>
        @foreach($data['data'][0] as $d)
            <th style="border: 1px solid #000000; text-align: center">{{ $d }}</th>
        @endforeach
    </tr>
    <?php unset($data['data'][0]) ?>
    </thead>
    <tbody>
    @foreach($data['data'] as $item => $d)
        <tr>
            <td></td>
            <td style="border: 1px solid #000000; text-align: center">{{ $item }}</td>
            @foreach($d as $i)
                <td style="border: 1px solid #000000; text-align: {{ $i[0] }}">{{ $i[1] }}</td>
            @endforeach
        </tr>
    @endforeach
    </tbody>
</table>
</body>
