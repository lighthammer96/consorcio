<?php namespace App\Http\Recopro\Category;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class Category extends Model
{
  
    protected $table = 'ERP_Categoria';

    public $timestamps = true;

    protected $primaryKey = 'idCategoria';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['idCategoria', 'descripcion','estado','user_created','user_updated'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }

}