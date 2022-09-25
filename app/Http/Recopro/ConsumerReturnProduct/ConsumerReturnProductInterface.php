<?php
/**
 * Created by PhpStorm.
 * User: ever-pc
 * Date: 16/08/2017
 * Time: 11:01 PM
 */

namespace App\Http\Recopro\ConsumerReturnProduct;


interface ConsumerReturnProductInterface
{
    public function deleteByConsumerReturn($consumption_id, array $ids);

    public function createUpdate(array $data);
}