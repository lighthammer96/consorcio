<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/10/2017
 * Time: 4:45 PM
 */

namespace App\Http\Controllers;


use App\Http\Recopro\Type\TypeInterface;

class TypeController extends Controller
{
    public function __construct()
    {
        $this->middleware('json');
    }

    public function getAll(TypeInterface $repo)
    {
        return parseSelect($repo->all(), 'id', 'description');
    }
}