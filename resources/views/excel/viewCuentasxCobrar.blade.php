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
                <td style="background-color: #ffffff; width: 50px;"></td>
                <th style="border: 1px solid #000000; text-align: center; width: 120px;">DOCUMENTO</th>
                <th style="border: 1px solid #000000; text-align: center; width: 120px;">SOLICITUD</th>
                <th style="border: 1px solid #000000; text-align: center; width: 115px;">FEC DOC</th>
                <th style="border: 1px solid #000000; text-align: center; width: 115px;">FEC VEC</th>
                <th style="border: 1px solid #000000; text-align: center; width: 120px;">DIAS VENCIDOS</th>
                <th style="border: 1px solid #000000; text-align: center; width: 115px;">FEC ULT. PAGO</th>
                <th style="border: 1px solid #000000; text-align: center; width: 115px;">MONEDA</th>
                <th style="border: 1px solid #000000; text-align: center; width: 120px;">MONTO TOTAL</th>
                <th style="border: 1px solid #000000; text-align: center; width: 125px;">MONTO PENDIENTE</th>
                <th style="border: 1px solid #000000; text-align: center; width: 130px;">VENDEDOR</th>
                <th style="border: 1px solid #000000; text-align: center; width: 130px;">COBRADOR</th>
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
