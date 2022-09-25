<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/3/2017
 * Time: 6:27 PM
 */

namespace App\Http\Recopro\Level;


class LevelRepository implements LevelInterface
{
    protected $model;

    private static $_PARENT_ID = '0';

    public function __construct(Level $model)
    {
        $this->model = $model;
    }

    public function search($s)
    {
        return $this->model->where(function($q) use ($s){
            $q->where('code', 'LIKE', '%'.$s.'%');
            $q->orWhere('description', 'LIKE', '%'.$s.'%');
        });
    }

    public function getAll()
    {
        return $this->model->all();
    }

    public function getParents()
    {
        return $this->model->where('parent_id', self::$_PARENT_ID)->get();
    }

    public function getChildren($parent_id)
    {
        return $this->model->where('parent_id', $parent_id)->get();
    }

    public function find($id)
    {
        return $this->model->findOrFail($id);
    }

    public function searchChildren($s)
    {
        return $this->model->where(function($q) use ($s){
            $q->where('code', 'LIKE', '%'.$s.'%');
            $q->orWhere('description', 'LIKE', '%'.$s.'%');
        })
        ->has('parent')
        ->doesntHave('children')
        ->doesntHave('products');
    }

    public function searchChildrenAPU($s)
    {
        return $this->model->where(function($q) use ($s){
            $q->where('code', 'LIKE', '%'.$s.'%');
            $q->orWhere('description', 'LIKE', '%'.$s.'%');
        })
        ->where('type_apu', '<>', 0)
        ->has('parent')
        ->doesntHave('children')
        ->doesntHave('products');
    }

    public function searchChildrenGT($s, $type)
    {
        return $this->model->where(function($q) use ($s){
            $q->where('code', 'LIKE', '%'.$s.'%');
            $q->orWhere('description', 'LIKE', '%'.$s.'%');
        })
        ->where('type_gt', $type)
        ->has('parent')
        ->doesntHave('children')
        ->doesntHave('products');
    }

}