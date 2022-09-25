<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateReceptionTransferTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ERP_RecepcionTransferencia', function (Blueprint $table) {
            $table->increments('id');
            $table->dateTime('date');
            $table->string('code_reception')->nullable()->default('');
            $table->integer('user_id');
            $table->integer('warehouse_origin_id');
            $table->integer('warehouse_destination_id');
            $table->integer('transfer_id')->nullable()->default(null);
            $table->string('state_description')->nullable()->default('');
            $table->integer('user_created')->unsigned()->default(1);
            $table->integer('user_updated')->unsigned()->default(1);
            $table->integer('user_deleted')->unsigned()->nullable()->default(null);
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::create('ERP_RecepcionTransferenciaProducto', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('reception_transfer_id')->unsigned();
            $table->integer('product_id')->unsigned();
            $table->integer('available')->unsigned()->nullable();
            $table->integer('received')->unsigned()->nullable();
            $table->integer('toReceived')->unsigned()->nullable();
            $table->string('code');
            $table->string('description');
            $table->string('unit');
            $table->decimal('cost', 18, 4)->nullable();
            $table->integer('user_created')->unsigned()->default(1);
            $table->integer('user_updated')->unsigned()->default(1);
            $table->integer('user_deleted')->unsigned()->nullable()->default(null);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ERP_RecepcionTransferenciaProducto');
        Schema::dropIfExists('ERP_RecepcionTransferencia');
    }
}
