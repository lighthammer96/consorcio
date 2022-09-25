<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 24/07/2017
 * Time: 05:35 PM
 */

namespace App\Http\Recopro\ContestConsolidated;

class ContestConsolidatedRepository implements ContestConsolidatedInterface
{
    protected $model;

    public function __construct(ContestConsolidated $model)
    {
        $this->model = $model;
    }

    public function search($filter)
    {
        $items = (isset($filter['items'])) ? $filter['items'] : [];

        $s = (isset($filter['search'])) ? $filter['search'] : '';
        $c_id = $filter['contest'];
        return $this->model->where(function ($q) use ($s) {
            $q->where('quantity', 'LIKE', '%' . $s . '%');
            $q->orWhereHas('article', function ($p) use ($s) {
                $p->where('description', 'LIKE', '%' . $s . '%');
                $p->orWhereHas('unity', function ($u) use ($s) {
                    $u->where('Descripcion', 'LIKE', '%' . $s . '%');
                });
            });
        })->where('contest_id', $c_id)
            ->whereNotIn('article_id', $items);
    }

    public function createUpdate(array $attributes)
    {
        $model = $this->model->where('contest_id', $attributes['contest_id'])
            ->where('article_id', $attributes['article_id'])
            ->withTrashed()
            ->first();

        $attributes['user_updated'] = auth()->id();
        if (isset($model)) {
            if ($model->trashed()) {
                $model->restore();
            }
            $model->update($attributes);
        } else {
            $attributes['user_created'] = auth()->id();
            $model = $this->model->create($attributes);
        }
        return $model;
    }

    public function findByContestArticle($contest_id, $article_id)
    {
        return $this->model->where('contest_id', $contest_id)
            ->where('article_id', $article_id)
            ->first();
    }

    public function findByContest($contest_id)
    {
        return $this->model->where('contest_id', $contest_id)
            ->first();
    }
}