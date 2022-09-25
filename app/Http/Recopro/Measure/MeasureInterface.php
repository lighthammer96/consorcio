<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 9:28 PM
 */

namespace App\Http\Recopro\Measure;

interface MeasureInterface
{
    public function search($s);

    public function all();

}