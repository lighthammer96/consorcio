<?php

use App\Http\Recopro\TypeWarehouse\TypeWarehouse;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTypeWarehousesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ERP_TipoAlmacen', function (Blueprint $table) {
            $table->increments('id');
            $table->string('description');
        });

        $tw = new TypeWarehouse();
        $tw->description = 'CONSUMO';
        $tw->save();

        $tw = new TypeWarehouse();
        $tw->description = 'VENTA';
        $tw->save();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ERP_TipoAlmacen');
    }
}
