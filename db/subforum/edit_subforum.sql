update subforums
set
    subforum_name = $1,
    subforum_owner_id = $2,
    subforum_img = $3,
    subforum_banner = $4,
    rules_section = $5,
    description = $6
where
    subforum_id = $7
returning *;
