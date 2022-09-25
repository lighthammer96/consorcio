<?php namespace App\Http\Recopro\QuotationState;

use Illuminate\Database\Eloquent\Model;

/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 22/06/2017
 * Time: 10:31 AM
 */
class QuotationState extends Model
{
    protected $table = 'ERP_ConcursoEstados';

    protected $fillable = ['description'];

    protected $hidden = ['created_at', 'updated_at'];
}