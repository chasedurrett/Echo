update posts
set vote_tracker = vote_tracker + 1
where post_id = $1