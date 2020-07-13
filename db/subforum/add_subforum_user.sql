insert into subforum_users
    (
    user_id,
    subforum_id
    )
values
    (
        $1,
        $2
)
returning *