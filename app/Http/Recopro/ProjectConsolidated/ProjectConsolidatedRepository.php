<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 13/06/2017
 * Time: 11:24 AM
 */

namespace App\Http\Recopro\ProjectConsolidated;

class ProjectConsolidatedRepository implements ProjectConsolidatedInterface
{
    protected $model;

    public function __construct(ProjectConsolidated $model)
    {
        $this->model = $model;
    }

    public function search($data)
    {
        $s = $data['search'];
        $project_id = $data['project_id'];
        $items = (isset($data['items'])) ? $data['items'] : [];

        return $this->model->where(function ($q) use ($s) {
            $q->whereHas('article', function ($a) use ($s) {
                $a->where('description_detail', 'LIKE', '%' . $s . '%');
                $a->orWhere('code_article', 'LIKE', '%' . $s . '%');
                $a->orWhereHas('level', function ($l) use ($s) {
                    $l->where('id', 'LIKE', '%' . $s . '%');
                });
                $a->orWhereHas('unity', function ($l) use ($s) {
                    $l->where('Descripcion', 'LIKE', '%' . $s . '%');
                });
            });
        })->where('project_id', $project_id)
            ->whereNotIn('id', $items);
    }

    public function search_available($data)
    {
        $s = $data['search'];
        $project_id = $data['project_id'];
        $items = (isset($data['items'])) ? $data['items'] : [];

        return $this->model->where(function ($q) use ($s) {
            $q->whereHas('article', function ($a) use ($s) {
                $a->where('description_detail', 'LIKE', '%' . $s . '%');
                $a->orWhere('code_article', 'LIKE', '%' . $s . '%');
                $a->orWhereHas('level', function ($l) use ($s) {
                    $l->where('id', 'LIKE', '%' . $s . '%');
                });
                $a->orWhereHas('unity', function ($l) use ($s) {
                    $l->where('Descripcion', 'LIKE', '%' . $s . '%');
                });
            });
        })->where('project_id', $project_id)
            ->where('quantity_served', '>', '0')
            ->whereNotIn('id', $items);
    }

    public function getByProject($project_id)
    {
        return $this->findByProject($project_id)->get();
    }

    public function findByProject($project_id)
    {
        return $this->model->where('project_id', $project_id);
    }

    public function loadMatrix($project_id)
    {
        return $this->model->where('project_id', $project_id)
            ->where('quantity_served', '>', '0')
            ->get();
    }

    public function find($id)
    {
        return $this->model->findOrFail($id);
    }

    public function update($id, array $attributes)
    {
        $attributes['user_updated'] = auth()->id();
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
    }

    public function createUpdate(array $attributes)
    {
        $model = $this->model->where('project_id', $attributes['project_id'])
            ->where('level_id', $attributes['level_id'])
            ->first();

        $attributes['user_updated'] = auth()->id();
        if (isset($model)) {
            $model->update($attributes);
        } else {
            $attributes['user_created'] = auth()->id();
            $model = $this->model->create($attributes);
        }
        return $model;
    }

    public function deleteExcept(array $ids, $project_id)
    {
        $this->model->where('project_id', $project_id)
            ->whereNotIn('article_id', $ids)
            ->delete();
    }
}