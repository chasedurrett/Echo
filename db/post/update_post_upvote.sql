update post_votes 
set 
upvote = true,
downvote = false
where user_id = $1 and post_id = $2
