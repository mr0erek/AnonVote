<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Poll;
use App\Models\Vote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class VoteController extends Controller
{
    public function vote(Request $request, $pollId)
    {
        $validated = $request->validate([
            'vote_type' => 'required|in:up,down',
        ]);

        $poll = Poll::findOrFail($pollId);

        if ($poll->vote_type === 'upvote' && $validated['vote_type'] === 'down') {
            return response()->json([
                'success' => false,
                'message' => 'Only upvotes are allowed for this poll',
            ], 400);
        }

        if ($poll->vote_type === 'downvote' && $validated['vote_type'] === 'up') {
            return response()->json([
                'success' => false,
                'message' => 'Only downvotes are allowed for this poll',
            ], 400);
        }

        DB::transaction(function () use ($poll, $validated) {
            $existingVote = Vote::where('poll_id', $poll->id)
                ->where('user_id', auth()->id())
                ->first();

            if ($existingVote) {
                if ($existingVote->vote_type === 'up') {
                    $poll->decrement('upvotes_count');
                } else {
                    $poll->decrement('downvotes_count');
                }
                $poll->decrement('total_voters');

                if ($existingVote->vote_type === $validated['vote_type']) {
                    $existingVote->delete();
                    return;
                }

                $existingVote->update(['vote_type' => $validated['vote_type']]);
            } else {
                Vote::create([
                    'poll_id'   => $poll->id,
                    'user_id'   => auth()->id(),
                    'vote_type' => $validated['vote_type'],
                ]);
            }

            if ($validated['vote_type'] === 'up') {
                $poll->increment('upvotes_count');
            } else {
                $poll->increment('downvotes_count');
            }
            $poll->increment('total_voters');
        });

        $poll->refresh();

        return response()->json([
            'success' => true,
            'message' => 'Vote recorded successfully',
            'poll'    => $poll,
        ]);
    }

    public function removeVote($pollId)
    {
        $vote = Vote::where('poll_id', $pollId)
            ->where('user_id', auth()->id())
            ->first();

        if (! $vote) {
            return response()->json([
                'success' => false,
                'message' => 'Vote not found',
            ], 404);
        }

        DB::transaction(function () use ($vote) {
            $poll = $vote->poll;

            if ($vote->vote_type === 'up') {
                $poll->decrement('upvotes_count');
            } else {
                $poll->decrement('downvotes_count');
            }
            $poll->decrement('total_voters');

            $vote->delete();
        });

        return response()->json([
            'success' => true,
            'message' => 'Vote removed successfully',
        ]);
    }
}
