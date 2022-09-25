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
        <td colspan="{{ count($data['data'][0]) + 1 }}" style="text-align: center"><h3>REPORTE DE CIERRE DE INVENTARIO PERIODO: {{ $periodo }}   ESTADO:  {{$estado}}</h3></td>
    </tr>
    <tr><th></th></tr>
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
                @if(  $i[2]=='bold')
            <td style="border: 1px solid #000000; text-align: {{ $i[0] }}"><b>{{ $i[1] }}</b></td>
            @else
                  
                <td style="border: 1px solid #000000; text-align: {{ $i[0] }}">{{ $i[1] }}</td>
            @endif
            @endforeach
        </tr>
    @endforeach
    </tbody>
</table>
</body>
