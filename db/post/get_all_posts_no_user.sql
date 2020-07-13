select
    p.post_id,
    p.post_title,
    p.post_url,
    p.post_time,
    p.vote_tracker,
    s.subforum_name,
    s.subforum_img,
    u.username
from subforums s
    inner join posts p on p.subforum_id = s.subforum_id
    inner join users u on p.post_author_id = u.user_id
order by p.post_id desc