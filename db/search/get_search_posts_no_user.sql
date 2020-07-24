select
    p.post_id,
    p.post_title,
    p.post_url,
    p.post_time,
    p.vote_tracker,
    s.subforum_name,
    s.subforum_img,
    s.subforum_id,
    u.username,
    u.user_id,
    p.vote_tracker,
    count(distinct c.comment_id)
from subforums s
    inner join posts p on p.subforum_id = s.subforum_id
    inner join users u on p.post_author_id = u.user_id
    left join comments c on p.post_id = c.post_id
where p.post_title
ilike '%' || $1 || '%'
group by 
p.post_id,
    p.post_title,
    p.post_url,
    p.post_time,
    p.vote_tracker,
    s.subforum_name,
    s.subforum_img,
    s.subforum_id,
    u.username,
    u.user_id,
    p.vote_tracker
order by p.post_id desc