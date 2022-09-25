<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 04/07/2017
 * Time: 05:34 PM
 */

namespace App\Http\Controllers;


use App\Http\Recopro\Petty_cash\Petty_cashInterface;
use App\Http\Recopro\Petty_cash\Petty_cashTrait;
use App\Http\Recopro\Petty_cashUser\Petty_cashUserInterface;
use DB;
use Illuminate\Http\Request;

class PettyCashController extends  controller
{
    use Petty_cashTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, Petty_cashInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['id', 'code', 'description', 'liable_id'];
        $data = $repo->search($s);
        $info = parseDataList($data, $request, 'id', $params);
        $data = $info[1];

        foreach ($data as $d) {
            $d->liable_name = ($d->liable) ? $d->liable->name : '';
            $d->liable_username = ($d->liable) ? $d->liable->username : '';
        }

        return response()->json([
            'Result' => 'OK',
            'TotalRecordCount' => $info[0],
            'Records' => $data
        ]);
    }

    public function createUpdate($id, Petty_cashInterface $repo, Request $request, Petty_cashUserInterface $wuRepo)
    {
        DB::beginTransaction();
        try {
            $data = $request->all();
            $data_users = $data['users'];
            $users = explode(',', $data_users);
            unset($data['id'], $data['users']);
            $pc = $repo->findByCode($data['code']);
            if ($id != 0) {
                if ($pc && $pc->id != $id) {
                    throw new \Exception('Ya existe una caja chica con este código. Por favor ingrese otro código.');
                }
                $repo->update($id, $data);
            } else {
                if ($pc) {
                    throw new \Exception('Ya existe una caja chica con este código. Por favor ingrese otro código.');
                }
                $petty_cash = $repo->create($data);
                $id = $petty_cash->id;
            }
            $wuRepo->deleteByPettyCash($id, $users);
            if ($data_users != '') {
                foreach ($users as $b) {
                    $wuRepo->create([
                        'petty_cash_id' => $id,
                        'user_id' => $b
                    ]);
                }
            }
            DB::commit();
            return response()->json(['status' => true]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function find($id, Petty_cashInterface $repo)
    {
        try {
            $data = $repo->find($id);

            $data['liable_username'] = $data->liable->username;
            $data['liable_name'] = $data->liable->name;
            $users = [];
            foreach ($data->PettyCashUser as $bp) {
                $users[] = [
                    'id' => $bp->user->id,
                    'username' => $bp->user->username,
                    'name' => $bp->user->name,
                ];
            }
            $data['users'] = $users;

            return response()->json([
                'status' => true,
                'data' => $data
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function destroy(Petty_cashInterface $repo, Request $request)
    {
        $id = $request->input('id');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    public function excel(Petty_cashInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE CAJAS CHICAS', 'cajas_chicas');
    }
}