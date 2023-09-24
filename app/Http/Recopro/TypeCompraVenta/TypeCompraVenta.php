<?php

namespace App\Http\Recopro\TypeCompraVenta;

use Illuminate\Database\Eloquent\Model;

class TypeCompraVenta extends Model
{
    protected $table = 'ERP_TipoCompraVenta';

    public $timestamps = true;

    protected $primaryKey = 'idTipoCompraVenta';

    public $incrementing = false;

    protected $fillable = ['idTipoCompraVenta', 'descripcion', 'estado',
        'user_created', 'created_at', 'user_updated', 'updated_at'];
}