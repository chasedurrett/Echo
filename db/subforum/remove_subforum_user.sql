delete from subforum_users
where user_id = $1 and subforum_id = $2
returning *;