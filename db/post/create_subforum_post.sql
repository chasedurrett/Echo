insert into posts
    (
    post_title,
    post_content,
    post_url,
    post_author_id,
    subforum_id,
    post_type_id,
    post_time,
    vote_tracker
    )
values
    (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        0
)
returning *