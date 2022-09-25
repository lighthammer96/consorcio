<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/7/2017
 * Time: 12:22 AM
 */

namespace App\Http\Controllers;


use App\Http\Recopro\PlanAccount\PlanAccountInterface;
use Illuminate\Http\Request;

class PlanAccountController extends Controller
{
    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, PlanAccountInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['IdCuenta', 'NombreCuenta'];
        return parseList($repo->search($s), $request, 'IdCuenta', $params);
    }
}