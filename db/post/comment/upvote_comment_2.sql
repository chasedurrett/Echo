update comments
set vote_tracker = vote_tracker + 2
where comment_id = $1
returning vote_tracker;