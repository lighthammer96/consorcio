<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 5/14/2021
 * Time: 4:13 PM
 */

namespace App\Http\Recopro\ConformanceServicesDetail;


trait ConformanceServicesDetailTrait
{
    public function parseDataCSD($attributes)
    {
        $attributes['type_rec'] = (isset($attributes['type_rec'])) ? $attributes['type_rec'] : 1;
        return $attributes;
    }

}