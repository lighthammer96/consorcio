<?php namespace App\Http\Recopro\Entry;

use App\Http\Recopro\EntryProduct\EntryProduct;
use App\Http\Recopro\User\User;
use App\Http\Recopro\Warehouse\Warehouse;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 4/5/2017
 * Time: 6:54 PM
 */
class Entry extends Model
{
    use SoftDeletes;

    protected $table = 'ERP_Ingreso';

    protected $fillable = ['entry_date', 'warehouse_id', 'user_id', 'observation', 'state_entry', 'code_entry', 'state_description', 'user_created', 'user_updated', 'user_deleted'];

    protected $hidden = ['deleted_at'];

    public function EntryProduct()
    {
        return $this->hasMany(EntryProduct::class);
    }

    public function Warehouse()
    {
        return $this->belongsTo(Warehouse::class, 'warehouse_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
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
