delete from followers
where user_id = $1 and following_id = $2