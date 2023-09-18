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
use Intervention\Image\Facades\Image;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): AnonymousResourceCollection
    {
        return UserResource::collection(
            User::query()->orderBy('id', 'desc')->paginate(10)
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
            $rootPath = '/images/users/avatar/';

            $path['full'] = $rootPath . 'full/';
            $path['thumb'] = $rootPath . 'thumb/';
            $path['medium'] = $rootPath . 'medium/';

            if (!Storage::disk('public')->directoryExists($path['full'])) {
                Storage::disk('public')->makeDirectory($path['full']);
            }

            if (!Storage::disk('public')->directoryExists($path['medium'])) {
                Storage::disk('public')->makeDirectory($path['medium']);
            }

            if (!Storage::disk('public')->directoryExists($path['thumb'])) {
                Storage::disk('public')->makeDirectory($path['thumb']);
            }

            if ($user->avatar) {
                Storage::disk('public')->delete($path['full'] . $user->avatar);
                Storage::disk('public')->delete($path['medium'] . $user->avatar);
                Storage::disk('public')->delete($path['thumb'] . $user->avatar);
            }

            $filename = $user->id . '-' . Str::random(16) . "." . $request->file('avatar')->getClientOriginalExtension();

            Image::make($request->file('avatar'))->save(storage_path('app/public') . $path['full'] . $filename);
            Image::make($request->file('avatar'))->fit(400, 400)->save(storage_path('app/public') . $path['medium'] . $filename);
            Image::make($request->file('avatar'))->fit(100, 100)->save(storage_path('app/public') . $path['thumb'] . $filename);

            $data['avatar'] = $filename;
        }

        $user->update($data);

        return new UserResource($user);
    }

    public function deleteImage(int $id)
    {
        $user = User::query()->find($id);

        if ($user->avatar) {
            $rootPath = '/images/users/avatar/';

            $path['full'] = $rootPath . 'full/';
            $path['thumb'] = $rootPath . 'thumb/';
            $path['medium'] = $rootPath . 'medium/';

            Storage::disk('public')->delete($path['full'] . $user->avatar);
            Storage::disk('public')->delete($path['thumb'] . $user->avatar);
            Storage::disk('public')->delete($path['medium'] . $user->avatar);

            $data['avatar'] = NULL;

            $user->update($data);
        }

        return response()->noContent();
    }
}
