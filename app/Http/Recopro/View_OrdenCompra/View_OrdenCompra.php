<?php namespace App\Http\Recopro\View_OrdenCompra;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class View_OrdenCompra extends Model
{
  
    protected $table = 'ERP_view_OrdenCompra';

    public $timestamps = true;

    protected $primaryKey = 'ident';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['id','cCodConsecutivo','nConsecutivo','iEstado','ident','created_at'];
    
    

}