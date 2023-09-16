<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserImageRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): AnonymousResourceCollection
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

        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

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

    public function uploadImage(UpdateUserImageRequest $request, int $id)
    {
        $data = $request->validated();

        $user = User::query()->find($id);

        if ($request->hasFile('avatar')) {
            $path = '/images/users/avatar/full';
            $filename = $user->id . '-' . Str::random(16) . "." . $request->file('avatar')->getClientOriginalExtension();

            if ($user->avatar) {
                $pathForRemove = $path . '/' . $user->avatar;
                Storage::disk('public')->delete($pathForRemove);
            }

            Storage::disk('public')->put($path . '/' . $filename, file_get_contents($request->file('avatar')));
            $data['avatar'] = $filename;
        }

        $user->update($data);

        return new UserResource($user);
    }

    public function deleteImage(int $id)
    {
        $user = User::query()->find($id);

        if ($user->avatar) {
            $path = '/images/users/avatar/full';
            $pathForRemove = $path . '/' . $user->avatar;
            Storage::disk('public')->delete($pathForRemove);

            $data['avatar'] = NULL;

            $user->update($data);
        }

        return response()->noContent();
    }
}
