select s.subforum_banner, s.subforum_img, p.post_id, p.post_title, p.post_content, p.post_type_id, p.post_url, p.post_author_id, a.username as author_username, a.user_image as author_user_image, p.subforum_id, p.post_type_id, p.post_time, p.vote_tracker, s.subforum_name
from posts p
    full join subforums s on s.subforum_id = p.subforum_id
    full join users a on a.user_id = p.post_author_id
where p.post_id = $1