<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 24/07/2017
 * Time: 05:34 PM
 */

namespace App\Http\Recopro\ContestConsolidated;

interface ContestConsolidatedInterface
{
    public function search($s);

    public function createUpdate(array $data);

    public function findByContest($contest_id);

    public function findByContestArticle($contest_id, $article_id);
}