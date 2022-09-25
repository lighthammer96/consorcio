<?php namespace App\Http\Recopro\Nature;

/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 26/06/2017
 * Time: 11:45 AM
 */
use \Illuminate\Database\Eloquent\Model;

class Nature extends Model
{
    protected $primaryKey = null;

    public $incrementing = false;

    protected $table = 'ERP_Nature';

    protected $fillable = ['id', 'description'];

    public $timestamps = false;
}