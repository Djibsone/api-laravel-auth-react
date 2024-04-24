<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register', 'emailVerify', 'verifyEmail', 'forgotPassword', 'changePassword']]);
    }

    public function login(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|string|email',
                'password' => 'required|string',
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);
            }

            $cridentiels = $request->only('email', 'password');

            $token = Auth::attempt($cridentiels);

            if (!$token) {
                return response()->json(['status' => 'error', 'message' => 'Non authorisé.'], 401);
            }

            $user = Auth::user();
            return response()->json([
                'status' => 'success',
                'user' => $user,
                'authorisation' => [
                    'token' => $token,
                    'type' => 'bearer',
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json($e);
        }
    }

    public function register(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string',
                'email' => 'required|string|email|unique:users',
                'password' => 'required|string|min:6',
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);
            }

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            $this->emailVerify($user->email);

            $token = Auth::login($user);

            return response()->json([
                'status' => 'success',
                'message' => 'Registration avec succès.',
                'authorisation' => [
                    'token' => $token,
                    'type' => 'bearer',
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json($e);
        }
    }

    public function userDetails()
    {
        try {
            return response()->json(auth()->user());
        } catch (\Exception $e) {
            return response()->json($e);
        }
    }

    // send email Verification Link
    public function emailVerify($email)
    {
        try {
            $user = User::where('email', $email)->first();
            if ($user) {
                $user->emailVerification();
                return response()->json(['status' => 'error', 'message' => 'Verify Your Email Adddress']);
            } else {
                return response()->json(['status' => 'success', 'message' => 'User Not Found']);
            }
        } catch (\Exception $e) {
            return response()->json($e);
        }
    }

    // confirm email Verification Status
    public function verifyEmail(Request $request)
    {
        try {
            $token = $request->input('token');

            $user = User::where('email_verification_token', $token)->first();
            if ($user) {
                if ($user->email_verified_at === null) {
                    $user->update([
                        'email_verified_at' => now(),
                        'email_verification_token' => null,
                        'email_verified' => 1,
                    ]);
                    return response()->json(['status' => 'success', 'message' => 'Email verified successful']);
                } else {
                    return response()->json(['status' => 'error', 'message' => 'Email already verified']);
                }
            } else {
                return response()->json(['status' => 'error', 'message' => 'Invalid token']);
            }
        } catch (\Exception $e) {
            return response()->json($e);
        }
    }

    // forgot password
    public function forgotPassword(Request $request)
    {
        try {
            $email = $request->email;
            $user = User::where('email', $email)->first();
            if ($user) {
                $password = Str::random(10);
                Mail::send([], [], function ($message) use ($email, $password) {
                    $message
                        ->to($email)
                        ->subject('Reset Password')
                        ->html('<p>Your new password is</p><br/> ' . $password);
                });
                User::where('email', $email)->update(['password' => Hash::make($password)]);
                return response()->json(['status' => 'success', 'message' => 'New Password send in your email']);
            } else {
                return response()->json(['status' => 'error', 'message' => 'User Not Found']);
            }
        } catch (\Exception $e) {
            return response()->json($e);
        }
    }

    // change password
    public function changePassword(Request $request)
    {
        try {
            $userId = $request->userId;
            $currentPassword = $request->cpassword;
            $newPassword = $request->npassword;

            $user = User::find($userId);
            if ($user) {
                if (Hash::check($currentPassword, $user->password)) {
                    User::where('id', $userId)->update(['password' => Hash::make($newPassword)]);
                    return response()->json(['status' => 'success', 'message' => 'Password Change Successfully']);
                } else {
                    return response()->json(['status' => 'error', 'message' => 'Current Password Not Match']);
                }
            } else {
                return response()->json(['status' => 'error', 'message' => 'User Not Found']);
            }
        } catch (\Exception $e) {
            return response()->json($e);
        }
    }
}
