select s.subforum_img, s.subforum_banner, p.post_id, p.post_title,
    p.post_content, p.post_url, p.post_author_id, a.username as author_username,
    a.user_image as author_user_image, p.subforum_id, p.post_type_id, p.post_time,
    p.vote_tracker, count(distinct c.comment_id) as comment_count
from posts p
    full join subforums s on s.subforum_id = p.subforum_id
    full join users a on a.user_id = p.post_author_id
    full join comments c on c.post_id = p.post_id
where s.subforum_id = $1
group by s.subforum_img, s.subforum_banner, p.post_id, p.post_title, 
p.post_content, p.post_url, p.post_author_id, a.username, 
a.user_image, p.subforum_id, p.post_type_id, p.post_time, 
p.vote_tracker
order by p.post_id desc;