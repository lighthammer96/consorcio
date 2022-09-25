<?php

use App\Http\Recopro\RequirementLineState\RequirementLineState;
use Illuminate\Database\Seeder;

class RequirementLineStateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        RequirementLineState::create([
            'description' => 'Sin proceso de compra'
        ]);
        RequirementLineState::create([
            'description' => 'En proceso de compra'
        ]);
        RequirementLineState::create([
            'description' => 'Comprado'
        ]);
    }
}
