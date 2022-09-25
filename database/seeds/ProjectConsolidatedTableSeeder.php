<?php

use App\Http\Recopro\ProjectConsolidated\ProjectConsolidated;
use Illuminate\Database\Seeder;

class ProjectConsolidatedTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ProjectConsolidated::create([
            'project_id' => 1,
            'article_id' => 1,
            'quantity_requested' => 24.00,
            'quantity_served' => 24.00,
            'price' => null,
            'project_balance' => null
        ]);
        ProjectConsolidated::create([
            'project_id' => 1,
            'article_id' => 2,
            'quantity_requested' => 30.00,
            'quantity_served' => 30.00,
            'price' => null,
            'project_balance' => null
        ]);
        ProjectConsolidated::create([
            'project_id' => 1,
            'article_id' => 4,
            'quantity_requested' => 20.00,
            'quantity_served' => 20.00,
            'price' => null,
            'project_balance' => null
        ]);
        ProjectConsolidated::create([
            'project_id' => 2,
            'article_id' => 4,
            'quantity_requested' => 20.00,
            'quantity_served' => 20.00,
            'price' => null,
            'project_balance' => null
        ]);
    }
}
