select
    p.post_id, p.post_title,
    p.post_content, p.post_url,
    p.post_author_id, a.username as author_username,
    a.user_image as author_user_image, p.subforum_id,
    p.post_type_id, p.post_time, p.vote_tracker, pv.upvote, pv.downvote, s.subforum_id, s.subforum_name, s.subforum_img,
    count(distinct c.comment_id) as comment_count
from subforum_users su
    join subforums s on s.subforum_id = su.subforum_id
    join posts p on s.subforum_id = p.subforum_id
    full join post_votes pv on (p.post_id = pv.post_id and pv.user_id = 10)
    left join comments c on c.post_id = p.post_id
    join users a on p.post_author_id = a.user_id
where su.user_id = $1
group by p.post_id, p.post_title,
    p.post_content, p.post_url,
    p.post_author_id, a.username,
    a.user_image, p.subforum_id,
    p.post_type_id, p.post_time, p.vote_tracker, pv.upvote, pv.downvote, s.subforum_id, s.subforum_name, s.subforum_img
order by p.post_time desc;