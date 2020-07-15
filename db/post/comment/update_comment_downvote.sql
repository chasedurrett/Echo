update comment_votes
set
upvote = false,
downvote = true
where user_id = $1 and comment_id = $2