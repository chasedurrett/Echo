update post_votes 
set 
upvote = $3,
downvote = $4
where user_id = $1 and post_id = $2
