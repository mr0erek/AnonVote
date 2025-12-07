<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validated = $request->validate([
            'external_user_id' => 'required|string',
            'display_name'     => 'required|string|max:255',
            'real_identity'    => 'required|string',
        ]);

        $user = User::updateOrCreate(
            ['external_user_id' => $validated['external_user_id']],
            [
                'display_name'       => $validated['display_name'],
                'encrypted_identity' => $validated['real_identity'],
                'last_login'         => now(),
            ]
        );

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'token'   => $token,
            'user'    => [
                'id'           => $user->id,
                'display_name' => $user->display_name,
            ],
        ], 200);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully',
        ]);
    }

    public function me(Request $request)
    {
        return response()->json([
            'success' => true,
            'user'    => [
                'id'           => $request->user()->id,
                'display_name' => $request->user()->display_name,
            ],
        ]);
    }
}
