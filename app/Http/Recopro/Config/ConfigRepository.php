<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:56 PM
 */

namespace App\Http\Recopro\Config;

class ConfigRepository implements ConfigInterface
{
    protected $model;

    private static $_MESSAGE_STRUCTURE = 'STRUCTURE_PASSWORD';

    public function __construct(Config $model)
    {
        $this->model = $model;
    }

    public function search($s)
    {
        return $this->model->where(function($q) use ($s){
            $q->where('description', 'LIKE', '%'.$s.'%');
            $q->orWhere('value', 'LIKE', '%'.$s.'%');
        });
    }

    public function all()
    {
        return $this->model->all();
    }

    public function create(array $attributes)
    {
        $attributes['user_created'] = auth()->id();
        $attributes['user_updated'] = auth()->id();
        return $this->model->create($attributes);
    }

    public function update($key, array $attributes)
    {
        $attributes['user_updated'] = auth()->id();
        $model = $this->model->where('description', $key)->first();
        if ($model) {
            $model->update($attributes);
        }
    }

    public function find($id)
    {
        return $this->model->find($id);
    }

    public function destroy($id)
    {
        $attributes = [];
        $attributes['user_deleted'] = auth()->id();
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
        $model->delete();
    }

    public function findByDescription($description)
    {
        return $this->model->where('description', $description)->first();
    }

    public function messageStructure()
    {
        $config = $this->model->where('description', self::$_MESSAGE_STRUCTURE)->first();
        $message = '';
        if ($config) {
            $values = (isset($config)) ? $config->value : '1-0-0-0-0';
            $value = explode('-', $values);
            if ($value[0] != '1') {
                $contains = [];
                if ($value[1] == '1') {
                    $contains[] = 'mayúscula';
                }
                if ($value[2] == '1') {
                    $contains[] = 'minúscula';
                }
                if ($value[3] == '1') {
                    $contains[] = 'carácter especial';
                }
                if ($value[4] == '1') {
                    $contains[] = 'número';
                }
                $message = '<span class="fa fa-info-circle"></span> La nueva contraseña debe contener: ' .
                    implode(', ', $contains);
            }
        }
        return $message;
    }
}