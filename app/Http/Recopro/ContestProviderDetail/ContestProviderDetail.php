<?php namespace App\Http\Recopro\ContestProviderDetail;

use App\Http\Recopro\ContestConsolidated\ContestConsolidated;
use App\Http\Recopro\ContestProvider\ContestProvider;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 27/07/2017
 * Time: 10:15 AM
 */
class ContestProviderDetail extends Model
{
    use SoftDeletes;

    protected $table = 'ERP_ConcursoProveedorDetalle';

    protected $fillable = ['contest_provider_id', 'contest_consolidated_id', 'description', 'quantity', 'price',
        'discount_percentage', 'discount', 'total', 'total_local', 'total_dollar', 'contest_id', 'price_buyer', 'price_system',
        'user_created', 'user_updated', 'user_deleted', 'deleted_at'];

    protected $hidden = ['created_at', 'updated_at', 'deleted_at', 'user_created', 'user_updated', 'user_deleted'];

    public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }

    public function contest_provider()
    {
        return $this->belongsTo(ContestProvider::class);
    }

    public function contest_consolidated()
    {
        return $this->belongsTo(ContestConsolidated::class);
    }

}