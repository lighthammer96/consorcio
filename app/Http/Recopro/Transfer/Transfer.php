<?php namespace App\Http\Recopro\Transfer;

use App\Http\Recopro\Project\Project;
use App\Http\Recopro\TransferDetail\TransferDetail;
use App\Http\Recopro\TransferProduct\TransferProduct;
use App\Http\Recopro\User\User;
use App\Http\Recopro\Warehouse\Warehouse;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:54 PM
 */
class Transfer extends Model
{
    use SoftDeletes;

    protected $table = 'ERP_Transferencia';

    protected $fillable = ['transfer_date', 'warehouse_origin_id', 'warehouse_destination_id', 'project_id', 'archive', 'state_transfer',
        'user_id', 'type_id', 'state', 'type_description', 'code_transfer', 'state_description', 'user_created', 'user_updated', 'user_deleted'];

    protected $hidden = ['deleted_at'];

    public function TransferProduct()
    {
        return $this->hasMany(TransferProduct::class);
    }

    public function TransferDetail()
    {
        return $this->hasMany(TransferDetail::class);
    }

    public function warehouseOrigin()
    {
        return $this->belongsTo(Warehouse::class, 'warehouse_origin_id');
    }

    public function warehouseDestination()
    {
        return $this->belongsTo(Warehouse::class, 'warehouse_destination_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id');
    }

    public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }
}
