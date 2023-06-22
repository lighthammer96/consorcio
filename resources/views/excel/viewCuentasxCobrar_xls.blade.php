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
                <td colspan="10" style="text-align: center">
                    <h3>C & A - CUENTAS POR COBRAR POR CLIENTE </h3>
                </td>
            </tr>
            <tr>
                <th></th>
            </tr>
            <tr style="background-color: #cccccc">
                <td style="background-color: #ffffff"></td>
                <th style="border: 1px solid #000000; text-align: center;width: 20">DOCUMENTO</th>
                <th style="border: 1px solid #000000; text-align: center;width: 20">SOLICITUD</th>
                <th style="border: 1px solid #000000; text-align: center;width: 15">FEC DOC</th>
                <th style="border: 1px solid #000000; text-align: center;width: 15">FEC VEC</th>
                <th style="border: 1px solid #000000; text-align: center;width: 20">DIAS VENCIDOS</th>
                <th style="border: 1px solid #000000; text-align: center;width: 15">FEC ULT. PAGO</th>
                <th style="border: 1px solid #000000; text-align: center;width: 15">MONEDA</th>
                <th style="border: 1px solid #000000; text-align: center;width: 20">MONTO TOTAL</th>
                <th style="border: 1px solid #000000; text-align: center;width: 25">MONTO PENDIENTE</th>
                <th style="border: 1px solid #000000; text-align: center;width: 30">VENDEDOR</th>
                <th style="border: 1px solid #000000; text-align: center;width: 30">COBRADOR</th>
            </tr>

        </thead>
        <tbody>
            <?php 
                for ($i=0; $i < count($data_envio); $i++) { 
                    echo $data_envio[$i];
                }
            ?>
        </tbody>
    </table>
</body>
