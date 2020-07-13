insert into subforums
    (
    subforum_name,
    subforum_owner_id,
    subforum_img,
    subforum_banner,
    rules_section,
    description,
    cake_day
    )
values
    (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7
)
returning *