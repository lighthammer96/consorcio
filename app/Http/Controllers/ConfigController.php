<?php namespace App\Http\Controllers;

// Author: EVER

use App\Http\Recopro\Config\ConfigInterface;
use App\Http\Requests\ConfigRequest;
use Illuminate\Http\Request;

class ConfigController extends Controller
{
    public function __construct()
    {
//        $this->middleware('ajax');
    }

    public function getConfigs(ConfigInterface $repo)
    {
        return response()->json([
            'status' => true,
            'Data' => $repo->all()
        ]);
    }

    public function update($id, ConfigInterface $repo, Request $request)
    {
        $keys = explode(',', $request->input('keys'));
        $values = explode(',', $request->input('values'));
        $checks = explode(',', $request->input('checks'));
        foreach ($keys as $item => $k) {
            $repo->update($k, [
                'value' => $values[$item],
                'check' => $checks[$item]
            ]);
        }
        return response()->json(['status' => true]);
    }
}
