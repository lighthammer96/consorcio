<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\View_Movimiento_Conformidad_Compra;


interface View_Movimiento_Conformidad_CompraInterface
{
    public function all();
    public function create(array $attributes);

}