<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AuthResource extends JsonResource
{
    public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $authUser = [
            'id' => $this->id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'email' => $this->email,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
        ];

        if ($this->avatar) {
            $authUser['avatar'] = [
                'full' => $this->avatar ? asset('storage/images/users/avatar/full/' . $this->avatar) : null,
                'medium' => $this->avatar ? asset('storage/images/users/avatar/medium/' . $this->avatar) : null,
                'thumb' => $this->avatar ? asset('storage/images/users/avatar/thumb/' . $this->avatar) : null,
            ];
        }

        return $authUser;
    }
}
