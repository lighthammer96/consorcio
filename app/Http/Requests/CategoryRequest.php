<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\JsonResponse;

class CategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    { 
         return [
            'Categoria' => 'required|min:1|max:30',
            
        ];
    }
    
    public function response(array $errors)
    {
        $errors = [
            'Result' => 'ERROR',
            'Message' => $errors
        ];
        return new JsonResponse($errors, 200);
    }
}
