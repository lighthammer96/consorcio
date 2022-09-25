<?php namespace App\Http\Recopro\State;

use Illuminate\Database\Eloquent\Model;

/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 5/17/2017
 * Time: 11:16 AM
 */

class State extends Model
{
    protected $primaryKey = null;

    public $incrementing = false;

    protected $table = 'ERP_States';

    protected $fillable = ['id', 'description'];

    public $timestamps = false;
}