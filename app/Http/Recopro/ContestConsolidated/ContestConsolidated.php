<?php namespace App\Http\Recopro\ContestConsolidated;

use App\Http\Recopro\ContestProviderDetail\ContestProviderDetail;
use App\Http\Recopro\Product\Product;
use App\Http\Recopro\Quotation\Quotation;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 24/07/2017
 * Time: 04:54 PM
 */
class ContestConsolidated extends Model
{
    use SoftDeletes;

    protected $table = 'ERP_ConcursoConsolidado';

    protected $fillable = ['contest_id', 'article_id', 'quantity', 'reference_project', 'reference_quantity',
        'user_created', 'user_updated', 'user_deleted'];

    protected $hidden = ['created_at', 'updated_at', 'user_created', 'user_updated', 'user_deleted'];

    public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }

    public function contest()
    {
        return $this->belongsTo(Quotation::class, 'contest_id');
    }

    public function article()
    {
        return $this->belongsTo(Product::class);
    }

    public function compare_contest_provider_detail()
    {
        return $this->hasMany(ContestProviderDetail::class);
    }

}