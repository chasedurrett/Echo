select
    p.post_id,
    p.post_title,
    p.post_url,
    p.post_content,
    p.post_time,
    p.vote_tracker,
    p.post_type_id,
    s.subforum_name,
    s.subforum_img,
    u.username as author_username,
    count(distinct c.comment_id) as comment_count
from subforums s
    left join posts p on p.subforum_id = s.subforum_id
    left join users u on p.post_author_id = u.user_id
    left join comments c on c.post_id = p.post_id
    group by p.post_id,
    p.post_title,
    p.post_url,
    p.post_content,
    p.post_time,
    p.vote_tracker,
    p.post_type_id,
    s.subforum_name,
    s.subforum_img,
    u.username
order by p.post_time desc;