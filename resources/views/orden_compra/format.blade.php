<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>ORDEN DE COMPRA</title>
    @include('pdf.css')
</head>
<body>
<table style="width:100%">
    <tr>
        <td style="width:65%;vertical-align:top;">
            <table style="width:100%;" class="table table-no-border">
                <tr>
                    <td style="width:28%" rowspan="4" class="text-center no-pad">
                        <img src="{{ url($company['img'])  }}" style="width:110px; border:0 !important;">
                    </td>
                    <td><b>{{ $company['name'] }}</b></td>
                </tr>
                <tr>
                    <td>RUC {{ $company['ruc'] }}</td>
                </tr>
                <tr>
                    <td>{{ $company['address'] }}</td>
                </tr>
                <tr>
                    <td>Tel: {{ $company['phone'] }}</td>
                </tr>
            </table>
        </td>
        <td style="width:35%;vertical-align:top;">
            <table class="table">
                <tr>
                    <td style="width:40%; vertical-align: middle" rowspan="3" align="center">
                        <b>ORDEN<br>DE<br>COMPRA</b>
                    </td>
                    <td><b>Nº: {{ $order['code'] }}</b></td>
                </tr>
                <tr>
                    <td>FECHA EMISION: <br>{{ $order['date_emi'] }}</td>
                </tr>
                <tr>
                    <td>FECHA REQUERIDA: <br>{{ $order['date_req'] }}</td>
                </tr>
            </table>
        </td>
    </tr>
</table>
<div class="separator"></div>
<table style="width: 100%">
    <tr>
        <td style="width:65%;vertical-align:top;">
            <table style="width: 98%;" class="table">
                <tr>
                    <th colspan="2">ORDENADO A:</th>
                </tr>
                <tr>
                    <td style="width: 25%">RAZON SOCIAL</td>
                    <td><b>{{ $order['provider'] }}</b></td>
                </tr>
                <tr>
                    <td>RUC</td>
                    <td>{{ $order['ruc'] }}</td>
                </tr>
                <tr>
                    <td>DIRECCIÓN</td>
                    <td>{{ $order['prov_address'] }}</td>
                </tr>
                <tr>
                    <td>CONTACTO</td>
                    <td>{{ $order['contact'] }}</td>
                </tr>
            </table>
        </td>
        <td style="width:35%;vertical-align:top;">
            <table class="table">
                <tr>
                    <td style="width: 40%; font-size: 70%; height: 2%" align="center">CONDICIÓN DE PAGO</td>
                    <td style="font-size: 75%">{{ $order['payment_condition'] }}</td>
                </tr>
                <tr>
                    <td style="font-size: 70%; height: 2%" align="center">DIRECCIÓN DE ENTREGA</td>
                    <td style="font-size: 75%">{{ $order['address'] }}</td>
                </tr>
                <tr>
                    <td style="font-size: 70%; height: 2%" align="center">MONEDA</td>
                    <td style="font-size: 75%">{{ $order['currency'] }}</td>
                </tr>
                <tr>
                    <td style="font-size: 70%; height: 2%" align="center">ESTADO</td>
                    <td style="font-size: 75%">{{ $order['state'] }}</td>
                </tr>
            </table>
        </td>
    </tr>
</table>
<div class="separator"></div>
<table class="table" style="font-size: 9px">
    <thead>
    <tr class="table-active" style="font-size: 9px">
        <th style="width:8%">ITEM</th>
        <th style=" width:10%">CÓDIGO</th>
        <th style="">DESCRIPCIÓN</th>
        <th style="width:10%">CANTIDAD</th>
        <th style=" width:7%">U.M.</th>
        <th style="width:10%">P.U.</th>
        <th style="width:10%">TOTAL</th>
    </tr>
    </thead>
    <tbody>
    @foreach($detail as $idx => $det)
        <tr>
            <td class="text-center">{{ $idx + 1 }}</td>
            <td class="text-center">{{ $det['code'] }}</td>
            <td>{{ $det['description'] }}</td>
            <td class="text-right">{{ formatNumberTotal($det['q'], 2) }}</td>
            <td class="text-center">{{ $det['und'] }}</td>
            <td class="text-right">{{ formatNumberTotal($det['p'], 2) }}</td>
            <td class="text-right">{{ formatNumberTotal($det['t'], 2) }}</td>
        </tr>
    @endforeach
    </tbody>
    <tfoot>
    <tr>
        <td rowspan="6" colspan="3" style="vertical-align: top"><b>Comentario:</b><br> {{ $order['comment'] }}</td>
        <td colspan="3" class="text-right">Subtotal</td>
        <th class="text-right">{{ formatNumberTotal($totals['subtotal1'], 2) }}</th>
    </tr>
    <tr>
        <td colspan="3" class="text-right">Descuento de Items</td>
        <td class="text-right">{{ formatNumberTotal($totals['discount'], 2) }}</td>
    </tr>
    <tr>
        <td colspan="3" class="text-right">Valor de Compra</td>
        <th class="text-right">{{ formatNumberTotal($totals['vc'], 2) }}</th>
    </tr>
    <tr>
        <td colspan="3" class="text-right">Valor de Compra Descuento</td>
        <td class="text-right">{{ formatNumberTotal($totals['vcd'], 2) }}</td>
    </tr>
    <tr>
        <td colspan="3" class="text-right">Impuesto {{ $totals['imp_per'] }}%</td>
        <td class="text-right">{{ formatNumberTotal($totals['imp'], 2) }}</td>
    </tr>
    <tr>
        <td colspan="3" class="text-right">Total</td>
        <th class="text-right">{{ formatNumberTotal($totals['total'], 2) }}</th>
    </tr>
    </tfoot>
</table>
</body>
</html>