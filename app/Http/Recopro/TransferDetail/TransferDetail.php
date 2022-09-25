<?php namespace App\Http\Recopro\TransferDetail;

/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 26/06/2017
 * Time: 03:40 PM
 */
use \Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TransferDetail extends Model
{
    use SoftDeletes;

    protected $table = 'ERP_TransferenciasDetalle';

    protected $fillable = ['product_id', 'warehouse_id', 'type_transfer_id', 'date_transfer', 'quantity', 'price', 'costs',
        'observation', 'user_id', 'code_transfer', 'transfer_id', 'nature_id', 'user_created', 'user_updated', 'user_deleted', 'deleted_at'];

    protected $hidden = ['deleted_at'];
}