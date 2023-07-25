<?php
/**
 * Created by PhpStorm.
 * User: EVER C.R
 * Date: 11/10/2017
 * Time: 12:37 PM
 */

namespace App\Http\Recopro\ClassificationAcquisition;


interface ClassificationAcquisitionInterface
{
    public function search($s);

    public function all();
}