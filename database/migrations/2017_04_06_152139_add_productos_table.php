<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddProductosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ERP_Productos', function (Blueprint $table) {
            $table->increments('id');
            $table->string('description');
            $table->text('description_detail');
            $table->boolean('state')->default(true);
            $table->integer('type_id')->unsigned();
            $table->string('um_id')->nullable();
            $table->integer('um_quantity')->unsigned()->nullable();
            $table->string('model');
            $table->date('year_enter')->nullable()->default(null);
            $table->string('cc_debe_id')->unsigned()->nullable()->default('');
            $table->string('cc_haber_id')->unsigned()->nullable()->default('');
            $table->string('retention_id')->nullable();
            $table->boolean('sale_blocked')->default(false);
            $table->boolean('serie')->default(false);
            $table->boolean('lote')->default(false);
            $table->boolean('kit')->default(false);
            $table->decimal('price_service_reference', 18, 5)->nullable();
            $table->decimal('commission_sale', 5, 2)->nullable();
            $table->string('sale')->nullable()->default('');
            $table->string('sale_description')->nullable()->default('');
            $table->string('maker')->nullable()->default('');
            $table->string('image')->nullable()->default('');
            $table->integer('matrix')->unsigned()->nullable()->default(null);
            $table->integer('user_created')->unsigned()->default(1);
            $table->integer('user_updated')->unsigned()->default(1);
            $table->integer('user_deleted')->unsigned()->nullable()->default(null);
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('ERP_MarcaProducto', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('product_id')->unsigned();
            $table->integer('brand_id')->unsigned();
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
        Schema::dropIfExists('ERP_MarcaProducto');
        Schema::dropIfExists('ERP_Productos');
    }
}
