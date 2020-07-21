update users 
set 
    user_banner = $2
where 
    user_id = $1
returning *;
