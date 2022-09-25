<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 3:34 PM
 */

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth')->except('sql_error');
    }

    public function index()
    {
        if (session()->has('change_password')) {
            return redirect()->route('change_password');
        }
        return view('app');
    }

    public function sql_error()
    {
        return view('exceptions.connection');
    }

    public function validateURL(Request $request)
    {
        $url = $request->input('url');
        $validate = validatePermission($url);

        return response()->json([
            'status' => $validate
        ]);
    }
}