<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return UserResource::collection(
            User::query()->orderBy('id', 'desc')->paginate(3)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();

        $data['password'] = Hash::make($data['password']);

        $user = User::create($data);

        return response(new UserResource($user), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     * @throws \Illuminate\Validation\ValidationException
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();

        /*Validator::make($request->file(), [
            'avatar' => 'nullable|image|dimensions:min_width=50,min_height=50,max_width=2048,max_height=2048',
        ])->validate();*/

        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        /*if ($request->file('avatar') !== null) {
            $data['avatar'] = Str::random(32) . "." . $request->file('avatar')->getClientOriginalExtension();
            storage_path('public')->put($data['avatar'], file_get_contents($request->file('avatar')));
        }*/

        $user->update($data);

        return new UserResource($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return response('', 204);
    }
}
