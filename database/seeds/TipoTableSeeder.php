<?php

use Illuminate\Database\Seeder;
use App\Http\Recopro\Type\Type;

class TipoTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Type::create(['description'=>'Articulos']);
        Type::create(['description'=>'Servicios']);
    }
}
