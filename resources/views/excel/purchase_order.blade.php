<!DOCTYPE html>
<html lang="es">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
<body>
<table>
    <tbody>
    <tr>
        @php $colspan = ($data['type'] == 1) ? 10 : 15; @endphp
        <th style="text-align: center" colspan="{{ $colspan }}">
            REPORTE DE ORDEN DE COMPRA
        </th>
    </tr>
    @if ($data['type'] == 1)
        <tr>
            <td></td>
        </tr>
        <tr>
            <th>Item</th>
            <th>Nro Orden Compra</th>
            <th>Fecha Compra</th>
            <th>Fecha Requerida</th>
            <th>Proveedor</th>
            <th>Condicion Pago</th>
            <th>Comprador</th>
            <th>Moneda</th>
            <th>Monto</th>
            <th>Estado</th>
        </tr>
        @php $cont = 1; @endphp
        @foreach($data['data'] as $d)
            <tr>
                <td style="text-align: center">{{ $cont }}</td>
                <td style="text-align: center">{{ $d['code'] }}</td>
                <td style="text-align: center">{{ $d['date_reg'] }}</td>
                <td style="text-align: center">{{ $d['date_req'] }}</td>
                <td>{{ $d['provider'] }}</td>
                <td style="text-align: center">{{ $d['payment_condition'] }}</td>
                <td>{{ $d['buyer'] }}</td>
                <td style="text-align: center">{{ $d['currency'] }}</td>
                <td style="text-align: right">{{ $d['total'] }}</td>
                <td style="text-align: center">{{ $d['state'] }}</td>
                @php $cont++; @endphp
            </tr>
        @endforeach
    @else
        <tr>
            <td></td>
        </tr>
        <tr>
            <th>Item</th>
            <th>Nro Orden Compra</th>
            <th>Fecha Compra</th>
            <th>Fecha Requerida</th>
            <th>Proveedor</th>
            <th>Condicion Pago</th>
            <th>Comprador</th>
            <th>Moneda</th>
            <th>Monto</th>
            <th>Estado</th>
            <th>Categoria de Articulo</th>
            <th>Codigo Articulo</th>
            <th>Articulo</th>
            <th>Cantidad Recibida</th>
            <th>Cantidad Pendiente</th>
        </tr>
        @php $cont = 1; @endphp
        @foreach($data['data'] as $d)
            @foreach($d['detail'] as $det)
                <tr>
                    <td style="text-align: center">{{ $cont }}</td>
                    <td style="text-align: center">{{ $d['code'] }}</td>
                    <td style="text-align: center">{{ $d['date_reg'] }}</td>
                    <td style="text-align: center">{{ $d['date_req'] }}</td>
                    <td>{{ $d['provider'] }}</td>
                    <td style="text-align: center">{{ $d['payment_condition'] }}</td>
                    <td>{{ $d['buyer'] }}</td>
                    <td style="text-align: center">{{ $d['currency'] }}</td>
                    <td style="text-align: right">{{ $det['total'] }}</td>
                    <td style="text-align: center">{{ $det['state'] }}</td>
                    <td>{{ $det['category'] }}</td>
                    <td style="text-align: center">{{ $det['code'] }}</td>
                    <td>{{ $det['text'] }}</td>
                    <td style="text-align: right">{{ $det['q_rec'] }}</td>
                    <td style="text-align: right">{{ $det['q_pen'] }}</td>
                    @php $cont++; @endphp
                </tr>
            @endforeach
        @endforeach
    @endif
    </tbody>
</table>
</body>
</html>