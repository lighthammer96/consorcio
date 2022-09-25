<?php namespace App\Http\Recopro\DescuentoProducto;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class DescuentoProducto extends Model
{
  
    protected $table = 'ERP_DescuentosProducto';

    public $timestamps = true;

    protected $primaryKey = 'nIdDscto';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['nIdDscto', 'nIdProducto','user_created','user_updated'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }

}