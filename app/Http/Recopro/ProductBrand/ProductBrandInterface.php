<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/11/2017
 * Time: 3:27 PM
 */

namespace App\Http\Recopro\ProductBrand;

interface ProductBrandInterface
{
    public function deleteByProduct($product_id, array $ids);

    public function create(array $attributes);
}