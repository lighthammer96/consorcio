<!DOCTYPE html>
<html lang="es">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
<body>
<table>
    <thead>
    <tr>
       
        <td colspan="{{ count($data) }}" style="text-align: center"><h3>C & A - LISTA DE COMISIONES</h3></td>
    </tr>
    <tr><th></th></tr>
    <tr style="background-color: #cccccc">
  
      
        <th style="border: 1px solid #000000; text-align: center">Cliente</th>
        <th style="border: 1px solid #000000; text-align: center">Documento</th>
        <th style="border: 1px solid #000000; text-align: center">Número</th>
        <th style="border: 1px solid #000000; text-align: center">FechaDoc</th>
        <th style="border: 1px solid #000000; text-align: center">Monto Docum.</th>
        <th style="border: 1px solid #000000; text-align: center">T/C</th>
        <th style="border: 1px solid #000000; text-align: center">Moneda</th>
        <th style="border: 1px solid #000000; text-align: center">% Comisión</th>
        <th style="border: 1px solid #000000; text-align: center">En Soles</th>
        <th style="border: 1px solid #000000; text-align: center">Forma de Pago</th>
        <th style="border: 1px solid #000000; text-align: center">Descripcion</th>
        
    </tr>
  
    </thead>
    <tbody>
    
    @foreach($data as $item => $d)
      
        <tr >
        
            <td colspan="{{ count($data) }}" style="border: 1px solid #000000; text-align: left; background-color: #b9f7c1;"><strong><?php echo strtoupper($d->Vendedor); ?></strong></td>
          
        </tr>
        <?php 
            $total_monto = 0;
            $total_soles = 0;
            $cont = count($d->data);
        ?>
        @foreach($d->data as $key => $value)
            <?php 
                $total_monto += floatval($value->Monto);
                $total_soles += floatval($value->ComisionSoles);
            ?>
            <tr>
            
                <td style="border: 1px solid #000000; text-align: center">{{ $value->Cliente }}</td>
                <td style="border: 1px solid #000000; text-align: center">{{ $value->Documento }}</td>
                <td style="border: 1px solid #000000; text-align: center">{{ $value->Numero }}</td>
                <td style="border: 1px solid #000000; text-align: center">{{ $value->FechaDoc }}</td>
                <td style="border: 1px solid #000000; text-align: center">{{ $value->Monto }}</td>
                <td style="border: 1px solid #000000; text-align: center">{{ $value->TipoCambio }}</td>
                <td style="border: 1px solid #000000; text-align: center">{{ $value->Moneda }}</td>
                <td style="border: 1px solid #000000; text-align: center">{{ $value->PorcComision }}</td>
                <td style="border: 1px solid #000000; text-align: center">{{ $value->ComisionSoles }}</td>
                <td style="border: 1px solid #000000; text-align: center">{{ $value->CondPago }}</td>
                <td style="border: 1px solid #000000; text-align: center">{{ $value->Vehiculo }}</td>
            
            </tr>
        @endforeach
        <tr>
            <td></td>
            <td style="color: blue; text-align: left;">Ventas: {{ $cont }}</td>
            <td></td>
            <td></td>
            <td style="background-color: #cccccc"><strong><?php echo number_format($total_monto , 2); ?></strong></td>
            <td></td>
            <td></td>
            <td></td>
            <td style="background-color: #cccccc"><strong><?php echo number_format($total_soles , 2); ?></strong></td>
            <td></td>
            <td></td>
        </tr>
    
    @endforeach
    </tbody>
</table>
</body>
