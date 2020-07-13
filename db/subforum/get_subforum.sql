select
    p.post_id,
    p.post_title,
    p.post_content,
    p.post_url,
    p.post_author_id,
    p.subforum_id,
    pt.post_type,
    p.post_time,
    p.vote_tracker,
    s.subforum_id,
    s.subforum_name,
    s.subforum_img,
    s.subforum_banner,
    s.rules_section,
    s.description as subforum_description,
    s.cake_day,
    u.username
from subforums s
    inner join posts p on p.subforum_id = s.subforum_id
    inner join users u on p.post_author_id = u.user_id
    inner join post_type pt on p.post_type_id = pt.post_type_id
where s.subforum_id = $1

