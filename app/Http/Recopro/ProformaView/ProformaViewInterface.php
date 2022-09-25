<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\ProformaView;


interface ProformaViewInterface
{
    public function all();
    public function create(array $attributes);

}