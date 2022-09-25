<?php
use Illuminate\Database\Seeder;
use  App\Http\Recopro\TypeTransfer\TypeTransfer;

class TypeTransferTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        TypeTransfer::create(['description' => 'INGRESO']);
        TypeTransfer::create(['description' => 'SALIDA']);
        TypeTransfer::create(['description' => 'CONSUMO']);
        TypeTransfer::create(['description' => 'TRANSFERENCIA']);
    }
}
