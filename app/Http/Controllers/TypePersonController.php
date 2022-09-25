<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/6/2017
 * Time: 10:22 AM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\TypePerson\TypePersonInterface;

class TypePersonController extends Controller
{
    public function getAll(TypePersonInterface $repo)
    {
        return parseSelect($repo->all(), 'IdTipoPersona', 'Descripcion');
    }
}