<!DOCTYPE html>
<html lang="es">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
<body>
<table>
    <tbody>
    <tr>
        <th style="text-align: center" colspan="5">
            LIQUIDACION CAJA CHICA
        </th>
    </tr>
    <tr>
        <th style="border: 1px solid #000000;">Nombre</th>
        <td style="border: 1px solid #000000;">{{ $data['pc'] }}</td>
        <td style="border: 1px solid #000000;"></td>
        <td style="border: 1px solid #000000;"></td>
        <td style="border: 1px solid #000000;"></td>
    </tr>
    <tr>
        <th style="border: 1px solid #000000;">Responsable</th>
        <td style="border: 1px solid #000000;">{{ $data['responsible'] }}</td>
        <td style="border: 1px solid #000000;"></td>
        <td style="border: 1px solid #000000;">Usa vales</td>
        <th style="border: 1px solid #000000;">{{ $data['is_voucher'] }}</th>
    </tr>
    <tr>
        <th style="border: 1px solid #000000;">Saldo Inicial</th>
        <td style="border: 1px solid #000000;text-align: right">{{ $data['balance_initial'] }}</td>
        <td style="border: 1px solid #000000;">Moneda</td>
        <th style="border: 1px solid #000000;">{{ $data['currency'] }}</th>
        <td style="border: 1px solid #000000;"></td>
    </tr>
    <tr>
        <th style="border: 1px solid #000000;">TOTAL GASTOS</th>
        <td style="border: 1px solid #000000;text-align: right">{{ $data['total'] }}</td>
        <th style="border: 1px solid #000000;" colspan="2">TOTAL DOCUMENTOS DE CIERRE</th>
        <th style="border: 1px solid #000000;text-align: right">{{ $data['total_close'] }}</th>
    </tr>
    <tr>
        <th></th>
        <th></th>
        <th style="border: 1px solid #000000;" colspan="2">
            @if ($data['is_voucher'] == 'SI') TOTAL VALES CONSUMIDOS @endif</th>
        <th style="border: 1px solid #000000;text-align: right">
            @if ($data['is_voucher'] == 'SI') {{ $data['total_v_si'] }} @endif</th>
    </tr>
    @if ($data['is_voucher'] == 'SI')
    <tr>
        <th></th>
        <th></th>
        <th style="border: 1px solid #000000;" colspan="2">TOTAL VALES NO CONSUMIDOS</th>
        <th style="border: 1px solid #000000;text-align: right">{{ $data['total_v_no'] }}</th>
    </tr>
    @endif
    <tr>
        <th style="text-align: center" colspan="5">
            GASTOS
        </th>
    </tr>
    <tr>
        <th style="border: 1px solid #000000;">Fecha Registro</th>
        <th style="border: 1px solid #000000;">Proveedor</th>
        <th style="border: 1px solid #000000;">Tipo</th>
        <th style="border: 1px solid #000000;">Numero</th>
        <th style="border: 1px solid #000000;">Glosa</th>
        <th style="border: 1px solid #000000;">Monto</th>
    </tr>
    @foreach($data['detail1'] as $det)
        <tr>
            <td style="border: 1px solid #000000;text-align: center">{{ $det['date'] }}</td>
            <td style="border: 1px solid #000000;">{{ $det['provider'] }}</td>
            <td style="border: 1px solid #000000;">{{ $det['document_type'] }}</td>
            <td style="border: 1px solid #000000;">{{ $det['number'] }}</td>
            <td style="border: 1px solid #000000;">{{ $det['gloss'] }}</td>
            <td style="border: 1px solid #000000;text-align: right">{{ $det['total'] }}</td>
        </tr>
    @endforeach
    <tr>
        <th style="text-align: center" colspan="5">
            DOCUMENTOS DE CIERRE
        </th>
    </tr>
    <tr>
        <th style="border: 1px solid #000000;">Numero</th>
        <th style="border: 1px solid #000000;">Glosa</th>
        <th style="border: 1px solid #000000;">Responsable</th>
        <th style="border: 1px solid #000000;">Total</th>
    </tr>
    @foreach($data['detail_close'] as $det)
        <tr>
            <td style="border: 1px solid #000000;">{{ $det['number'] }}</td>
            <td style="border: 1px solid #000000;">{{ $det['gloss'] }}</td>
            <td style="border: 1px solid #000000;">{{ $det['responsible'] }}</td>
            <td style="border: 1px solid #000000;text-align: right">{{ $det['total'] }}</td>
        </tr>
    @endforeach
    @if ($data['is_voucher'] == 'SI')
        <tr>
            <th style="text-align: center" colspan="5">
                VALES
            </th>
        </tr>
        <tr>
            <th style="border: 1px solid #000000;">Código Vale</th>
            <th style="border: 1px solid #000000;">Fecha</th>
            <th style="border: 1px solid #000000;">Glosa</th>
            <th style="border: 1px solid #000000;">Responsable</th>
            <th style="border: 1px solid #000000;">Consumido</th>
            <th style="border: 1px solid #000000;">Monto</th>
        </tr>
        @foreach($data['detail2'] as $det)
            <tr>
                <td style="border: 1px solid #000000;text-align: center">{{ $det['code'] }}</td>
                <td style="border: 1px solid #000000;text-align: center">{{ $det['date'] }}</td>
                <td style="border: 1px solid #000000;">{{ $det['gloss'] }}</td>
                <td style="border: 1px solid #000000;">{{ $det['responsible'] }}</td>
                <td style="border: 1px solid #000000;text-align: center">{{ $det['is_consumed'] }}</td>
                <td style="border: 1px solid #000000;text-align: right">{{ $det['total'] }}</td>
            </tr>
        @endforeach
    @endif
    </tbody>
</table>
</body>
</html>