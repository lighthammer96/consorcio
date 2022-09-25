<?php

use \App\Http\Recopro\ProofPayment\DocumentType;

use Illuminate\Database\Seeder;

class ComprobanteTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DocumentType::create([
            'code' => 'GRR0001',
            'description' => 'GUIA DE REMISIÓN - REMITENTE'
        ]);
    }
}
