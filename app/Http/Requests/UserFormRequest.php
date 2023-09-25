<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;

class UserFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $changePassword = $this->changePassword;

        return [
            'name' => 'required|string',
            'email' => [
                'required',
                'email',
                Rule::unique('users')->ignore($this->idUser ?? 0),
            ],
            'role' => ['required', Rule::in(['ADMIN', 'DEFAULT'])],
            'password' => [
                $changePassword ? 'required' : 'nullable',
                'string',
                'min:8',
            ],
            'confirmPassword' => [
                $changePassword ? 'required' : 'nullable',
                'string',
                'same:password',
            ],
        ];
    }

    /**
     * Get custom validation messages.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'name.required' => 'O nome é obrigatório',
            'email.required' => 'O email é obrigatório',
            'email.unique' => 'Esse email já está cadastrado, tente outro.',
            'email.email' => 'Insira um email válido',
            'role.required' => 'O nível de acesso é obrigatório',
            'role.in' => 'Selecione um nível de acesso válido',
            'password.required' => 'A senha é obrigatória',
            'password.min' => 'A senha deve ter pelo menos 8 caracteres',
            'confirmPassword.required' => 'A confirmação de senha é obrigatória',
            'confirmPassword.same' => 'As senhas devem coincidir',
        ];
    }
}
