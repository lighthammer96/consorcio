<?php

/**
 * Created by PhpStorm.
 * User: Ever
 * Date: 03/04/2017
 * Time: 03:51 PM
 */
namespace App\Http\Recopro\Module;

class ModuleRepository implements ModuleInterface
{
    public static $PARENT_ID = 1;

    protected $model;

    public function __construct(Module $model)
    {
        $this->model = $model;
    }

    public function search($s)
    {
        return $this->model->where(function($q) use ($s){
            $q->where('description', 'LIKE','%'.$s.'%');
            $q->orWhere('url', 'LIKE','%'.$s.'%');
            $q->orWhereHas('parent', function($p) use ($s){
                $p->where('description', 'LIKE','%'.$s.'%');
            });
        })->where('id','<>',self::$PARENT_ID);
    }

    public function all()
    {
        return $this->model->all();
    }

    public function create(array $attributes)
    {
        return $this->model->create($attributes);
    }

    public function update($id, array $attributes)
    {
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
    }

    public function find($id)
    {
        return $this->model->find($id);
    }

    public function destroy($id)
    {
        $model = $this->model->findOrFail($id);
        $model->delete();
    }

    public function getParents()
    {
        return $this->model->where('parent_id',self::$PARENT_ID)
                    ->where('id','<>',self::$PARENT_ID)
                    ->orderBy('order','ASC')
                    ->orderBy('description','ASC')
                    ->get();
    }

    public function getParentsAll()
    {
        return $this->model->where('parent_id',self::$PARENT_ID)
                    ->orderBy('description','ASC')
                    ->get();
    }

    public function getAllPermission()
    {
        return $this->model->select('id', 'description as modulo')
                    ->where('parent_id', '<>', self::$PARENT_ID)
                    ->orderBy('description')
//                    ->groupBy('id')
                    ->get();
    }

    public function getByProfileParent($profile_id, $parent_id)
    {
        return $this->model->whereHas('permissions', function($q) use ($profile_id){
                        $q->where('profile_id', $profile_id);
                    })
                    ->where('parent_id',$parent_id)
                    ->orderBy('order','ASC')
                    ->orderBy('description','ASC')
                    ->get();
    }

    public function getByProfileUrl($profile_id, $url)
    {
        return $this->model->whereHas('permissions', function($q) use ($profile_id){
                        $q->where('profile_id', $profile_id);
                    })
                    ->where('url',$url)
                    ->first();
    }
}