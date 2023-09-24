<!DOCTYPE html>
<html lang="es">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
<body>
<table>
    <tbody>
    <tr>
        <th style="text-align: center" colspan="15">
            REPORTE DE DEVOLUCIÓN DE ORDEN DE COMPRA
        </th>
    </tr>
    <tr>
        <td></td>
    </tr>
    <tr>
        <th>Item</th>
        <th>Codigo</th>
        <th>Recepcion</th>
        <th>Fecha</th>
        <th>Almacen</th>
        <th>Moneda</th>
        <th>Total</th>
        <th>Estado</th>
        <th>Articulo</th>
        <th>Localizacion</th>
        <th>Lote</th>
        <th>Precio</th>
        <th>Cantidad Rec</th>
        <th>Cantidad Devolver</th>
        <th>Devolver</th>
    </tr>
    @php $cont = 1; @endphp
    @foreach($data['data'] as $d)
        @foreach($d['detail'] as $det)
            <tr>
                <td style="text-align: center">{{ $cont }}</td>
                <td style="text-align: center">{{ $d['code'] }}</td>
                <td style="text-align: center">{{ $d['rec'] }}</td>
                <td style="text-align: center">{{ $d['date'] }}</td>
                <td style="text-align: center">{{ $d['wh'] }}</td>
                <td style="text-align: center">{{ $d['currency'] }}</td>
                <td style="text-align: right">{{ $d['total'] }}</td>
                <td style="text-align: center">{{ $d['state'] }}</td>
                <td>{{ $det['description'] }}</td>
                <td>{{ $det['localization'] }}</td>
                <td>{{ $det['lote'] }}</td>
                <td style="text-align: right">{{ $det['price'] }}</td>
                <td style="text-align: right">{{ $det['reception'] }}</td>
                <td style="text-align: right">{{ $det['pending'] }}</td>
                <td style="text-align: right">{{ $det['return'] }}</td>
                @php $cont++; @endphp
            </tr>
        @endforeach
    @endforeach
    </tbody>
</table>
</body>
</html>