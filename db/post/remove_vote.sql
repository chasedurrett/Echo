delete from post_votes
where user_id = $1 and post_id = $2;
