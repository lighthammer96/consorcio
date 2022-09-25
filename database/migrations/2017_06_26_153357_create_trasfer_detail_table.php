<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTrasferDetailTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ERP_TransferenciasDetalle', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('product_id')->unsigned();
            $table->integer('warehouse_id')->unsigned();
            $table->integer('type_transfer_id')->unsigned();
            $table->dateTime('date_transfer');
            $table->integer('quantity')->unsigned()->nullable();
            $table->decimal('price', 18, 4)->nullable();
            $table->decimal('costs', 18, 4)->nullable();
            $table->text('observation')->nullable();
            $table->integer('user_id')->unsigned();
            $table->string('code_transfer');
            $table->integer('nature_id')->unsigned();
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
        Schema::dropIfExists('ERP_TransferenciaDetalle');
    }
}
