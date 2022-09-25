<?php

use Illuminate\Database\Seeder;
use App\Http\Recopro\QuotationState\QuotationState;

class QuotationStateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        QuotationState::truncate();

        QuotationState::create([
            'description' => 'Registrado'
        ]);

        QuotationState::create([
            'description' => 'Aprobado'
        ]);

        QuotationState::create([
            'description' => 'Con O/C'
        ]);
    }
}
