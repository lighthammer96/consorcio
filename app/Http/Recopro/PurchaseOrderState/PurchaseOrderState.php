<?php

namespace App\Http\Recopro\PurchaseOrderState;

/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 19/09/2017
 * Time: 03:22 PM
 */
use  \Illuminate\Database\Eloquent\Model;

class PurchaseOrderState extends Model
{

    protected $table = 'ERP_OrdenCompraEstados';

    protected $fillable = ['description'];

    protected $hidden = ['created_at', 'updated_at'];

}