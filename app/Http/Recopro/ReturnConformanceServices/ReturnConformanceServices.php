<?php

namespace App\Http\Recopro\ReturnConformanceServices;

use App\Http\Recopro\ConformanceServices\ConformanceServices;
use App\Http\Recopro\Currency\Currency;
use App\Http\Recopro\Operation\Operation;
use App\Http\Recopro\Register_movement\Register_movement;
use App\Http\Recopro\ReturnConformanceServicesDetail\ReturnConformanceServicesDetail;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ReturnConformanceServices extends Model
{
    use SoftDeletes;

    protected $primaryKey = 'id';

    public $incrementing = false;

    protected $table = 'ERP_DevolucionConformidadServicios';

    protected $fillable = ['id', 'state_id', 'code', 'date', 'cs_id', 'observation', 'total',
        'operation_id', 'currency_id', 'mov_id',
        'user_created', 'user_updated', 'user_deleted'];

    protected $hidden = ['deleted_at'];

    public function detail()
    {
        return $this->hasMany(ReturnConformanceServicesDetail::class, 'return_cs_id');
    }

    public function conformanceServices()
    {
        return $this->belongsTo(ConformanceServices::class, 'cs_id');
    }

    public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function operation()
    {
        return $this->belongsTo(Operation::class, 'operation_id');
    }

    public function currency()
    {
        return $this->belongsTo(Currency::class, 'currency_id');
    }

    public function movement()
    {
        return $this->belongsTo(Register_movement::class, 'mov_id');
    }

}