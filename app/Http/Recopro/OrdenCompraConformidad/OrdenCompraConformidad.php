<?php

namespace App\Http\Recopro\OrdenCompraConformidad;

use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;

class OrdenCompraConformidad extends Model
{
    protected $table = 'ERP_OrdenCompraConformidad';

    public $timestamps = true;

    protected $primaryKey = 'nIdConformidad';

    public $incrementing = false;

    protected $fillable = ['nIdConformidad', 'cCodConsecutivo', 'nConsecutivo', 'nIdAprob', 'nOrden', 'nIdUsuario',
        'dFecReg', 'iEstado', 'cObservacion',
        'user_created', 'created_at', 'user_updated', 'updated_at'];

    public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'nIdUsuario');
    }

}