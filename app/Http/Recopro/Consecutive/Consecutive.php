<?php namespace App\Http\Recopro\Consecutive;

use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Http\Recopro\TypeConsecutive\TypeConsecutive;
use App\Http\Recopro\Shop\Shop;

/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class Consecutive extends Model
{
    protected $table = 'ERP_Consecutivos';

    public $timestamps = true;

    protected $primaryKey = 'cCodConsecutivo';

    protected $keyType = 'string';

    public $incrementing = false;

    const CREATED_AT = 'dFecCre';

    const UPDATED_AT = 'dFecMod';

    protected $fillable = ['cCodConsecutivo', 'cDetalle', 'cCodTipoCons', 'nConsecutivo', 'nCodTienda', 'cIdUsuCre', 'cIdUsuMod'];

    public function user_c()
    {
        return $this->belongsTo(User::class, 'cIdUsuCre');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'cIdUsuMod');
    }

    public function get_tienda_excel()
    {
        return $this->belongsTo(Shop::class, 'nCodTienda');
    }

    public function get_tipoConsecutivo_excel()
    {
        return $this->belongsTo(TypeConsecutive::class, 'cCodTipoCons');
    }

}