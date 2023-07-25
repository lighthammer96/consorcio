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
        $params = ['id', 'code', 'description', 'liable_id', 'total', 'is_vale'];
        $data = $repo->search($s);
        $info = parseDataList($data, $request, 'id', $params);
        $data = $info[1];

        foreach ($data as $d) {
            $d->liable_name = ($d->liable) ? $d->liable->name : '';
            $d->liable_username = ($d->liable) ? $d->liable->username : '';
            $d->total = is_null($d->total) ? 0 : $d->total;
            $d->is_vale = ($d->is_vale == 1) ? 'SI' : 'NO';
        }

        return response()->json([
            'Result' => 'OK',
            'TotalRecordCount' => $info[0],
            'Records' => $data
        ]);
    }

    public function createUpdate($id, Petty_cashInterface $repo, Request $request, Petty_cashUserInterface $pcuRepo)
    {
        DB::beginTransaction();
        try {
            $data = $request->except(['is_vale']);
            $is_vale = $request->input('is_vale', 0);
            $data['is_vale'] = $is_vale;
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
            $pcuRepo->deleteByPettyCash($id, $users);
            if ($data_users != '') {
                foreach ($users as $b) {
                    $pcuRepo->create([
                        'petty_cash_id' => $id,
                        'user_id' => $b
                    ]);
                }
            }
            DB::commit();
            return response()->json([
                'status' => true
            ]);
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

            $data['liable_username'] = ($data->liable) ? $data->liable->username : '';
            $data['liable_name'] = ($data->liable) ? $data->liable->name : '';
            $users = [];
            foreach ($data->PettyCashUser as $bp) {
                $users[] = [
                    'id' => ($bp->user) ? $bp->user->id : '',
                    'username' => ($bp->user) ? $bp->user->username : '',
                    'name' => ($bp->user) ? $bp->user->name : '',
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

    public function destroy(Request $request, Petty_cashInterface $pcRepo, Petty_cashUserInterface $pcuRepo)
    {
        DB::beginTransaction();
        try {
            $id = $request->input('id');
            $pcuRepo->deleteByPettyCash($id, []);
            $pcRepo->destroy($id);
            DB::commit();
            return response()->json([
                'Result' => 'OK'
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'Result' => 'ERROR',
                'Message' => [$e->getMessage()]
            ]);
        }
    }

    public function excel(Petty_cashInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE CAJAS CHICAS', 'cajas_chicas');
    }

    public function getPettyCash(Request $request, Petty_cashInterface $repo)
    {
        try {
            $s = $request->input('search', '');
            $params = ['id', 'code', 'description', 'liable_id', 'total', 'is_vale'];
            $data = $repo->search($s);
            $info = parseDataList($data, $request, 'id', $params);
            $data = $info[1];

            foreach ($data as $d) {
                $d->liable_name = ($d->liable) ? $d->liable->name : '';
                $d->total = is_null($d->total) ? 0 : $d->total;
                $d->is_vale = (int)$d->is_vale;
                unset($d->liable);
            }

            return response()->json([
                'Result' => 'OK',
                'TotalRecordCount' => $info[0],
                'Records' => $data
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'Result' => 'ERROR',
                'Message' => [$e->getMessage()]
            ]);
        }
    }
}