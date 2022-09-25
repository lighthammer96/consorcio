<?php

use App\Http\Recopro\State\State;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ERP_States', function (Blueprint $table) {
            $table->integer('id')->unsigned();
            $table->string('description');
        });

        $s = new State();
        $s->id = 0;
        $s->description = 'Inactivo';
        $s->save();

        $s = new State();
        $s->id = 1;
        $s->description = 'Activo';
        $s->save();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ERP_States');
    }
}
