update comments
set vote_tracker = vote_tracker + 1
where comment_id = $1
returning vote_tracker;