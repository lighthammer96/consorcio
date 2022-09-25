<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 14/09/2017
 * Time: 04:54 PM
 */

namespace App\Http\Recopro\ProjectGGT;

interface ProjectGGTInterface
{
    public function createUpdate(array $attributes);

    public function deleteByLevelType(array $attributes);
}