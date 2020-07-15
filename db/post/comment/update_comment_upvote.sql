update comment_votes 
set 
upvote = true, 
downvote = false 
where user_id = $1 and comment_id = $2