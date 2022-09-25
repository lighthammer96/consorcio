<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateReferralGuideTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ERP_GuiaRemision', function (Blueprint $table) {
            $table->increments('id');
            $table->dateTime('date');
            $table->string('document_type_id');
            $table->string('entity_id');
            $table->string('transport_company_id');
            $table->string('transport_unit')->nullable()->default(null);;
            $table->string('license_plate')->nullable()->default(null);;
            $table->string('license')->nullable()->default(null);;
            $table->string('driver')->nullable()->default(null);;
            $table->boolean('type_entity')->default(false);
            $table->integer('warehouse_origin_id');
            $table->integer('warehouse_destination_id');
            $table->dateTime('date_transfer');
            $table->integer('transfer_id')->nullable()->default(null);
            $table->integer('motive_id');
            $table->string('order_purchase')->nullable()->default(null);
            $table->text('observation')->nullable()->default(null);
            $table->string('serial')->nullable()->default(null);
            $table->string('number')->nullable()->default(null);
            $table->integer('project_id')->nullable()->default(null);
            $table->boolean('state_ReferralGuide')->default(false);
            $table->integer('user_created')->unsigned()->default(1);
            $table->integer('user_updated')->unsigned()->default(1);
            $table->integer('user_deleted')->unsigned()->nullable()->default(null);
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::create('ERP_GuiaRemisionProducto', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('referral_guide_id')->unsigned();
            $table->integer('product_id')->nullable()->default(null);
            $table->string('code');
            $table->string('description');
            $table->string('unit');
            $table->decimal('cost', 18, 4)->nullable();
            $table->integer('quantity')->unsigned()->nullable();
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
        Schema::dropIfExists('ERP_GuiaRemisionProducto');
        Schema::dropIfExists('ERP_GuiaRemision');
    }
}
