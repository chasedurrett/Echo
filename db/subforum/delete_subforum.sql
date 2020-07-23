delete from comment_votes where comment_id in (select comment_id from comments where post_id in (select post_id from posts where subforum_id = $1));
delete from comments where post_id in (select post_id from posts where subforum_id = $1);
delete from post_votes where post_id in (select post_id from posts where subforum_id = $1);
delete from posts where subforum_id = $1;
delete from subforum_users where subforum_id = $1;
delete from subforums where subforum_id = $1;

