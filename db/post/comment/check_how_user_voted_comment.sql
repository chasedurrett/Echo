select upvote from comment_votes
where user_id = $1 and comment_id = $2 and upvote = true;