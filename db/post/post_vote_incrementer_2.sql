update posts
set vote_tracker = vote_tracker + 2
where post_id = $1