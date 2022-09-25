<?php

use Illuminate\Database\Seeder;
use App\Http\Recopro\Config\Config;

class ConfigsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $config = Config::where('description', 'TIME_EXPIRATION_PASSWORD')->first();
        if (!$config) {
            Config::create([
                'description' => 'TIME_EXPIRATION_PASSWORD',
                'value' => 60,
                'check' => true
            ]);
        }

        $config = Config::where('description', 'USES_PASSWORD')->first();
        if (!$config) {
            Config::create([
                'description' => 'USES_PASSWORD',
                'value' => 5,
                'check' => true
            ]);
        }

        $config = Config::where('description', 'STRUCTURE_PASSWORD')->first();
        if (!$config) {
            Config::create([
                'description' => 'STRUCTURE_PASSWORD',
                'value' => '1-0-0-0-0',
                'check' => true
            ]);
        }
    }
}
