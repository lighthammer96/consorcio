<?php

use App\Http\Recopro\Nature\Nature;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNatureTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ERP_Nature', function (Blueprint $table) {
            $table->integer('id')->unsigned();
            $table->string('description');
        });

        $s = new Nature();
        $s->id = 0;
        $s->description = 'INGRESO';
        $s->save();

        $s = new Nature();
        $s->id = 1;
        $s->description = 'SALIDA';
        $s->save();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ERP_Nature');
    }
}
