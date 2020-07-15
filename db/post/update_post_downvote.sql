update post_votes 
set 
upvote = false,
downvote = true
where user_id = $1 and post_id = $2
