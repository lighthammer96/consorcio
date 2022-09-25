<?php

use App\Http\Recopro\MotiveTransfer\MotiveTransfer;
use Illuminate\Database\Seeder;

class MotiveTransferTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        MotiveTransfer::create([
            'description' => 'Venta'
        ]);
        MotiveTransfer::create([
            'description' => 'Compra'
        ]);
        MotiveTransfer::create([
            'description' => 'Devolución'
        ]);
        MotiveTransfer::create([
            'description' => 'Consignación'
        ]);
        MotiveTransfer::create([
            'description' => 'Importación'
        ]);
        MotiveTransfer::create([
            'description' => 'Exportación'
        ]);
        MotiveTransfer::create([
            'description' => 'Venta sujeta a confirmación'
        ]);
        MotiveTransfer::create([
            'description' => 'Traslado entre establecimientos'
        ]);
        MotiveTransfer::create([
            'description' => 'De la misma empresa'
        ]);
        MotiveTransfer::create([
            'description' => 'Traslado de bienes para transformación'
        ]);
        MotiveTransfer::create([
            'description' => 'Recojo de bienes'
        ]);
        MotiveTransfer::create([
            'description' => 'Traslado por emisor itinerante'
        ]);
        MotiveTransfer::create([
            'description' => 'Traslado zona primaria'
        ]);
        MotiveTransfer::create([
            'description' => 'Venta con entrega a terceros'
        ]);
        MotiveTransfer::create([
            'description' => 'Otras no incluida en los puntos anteriores'
        ]);
    }
}
