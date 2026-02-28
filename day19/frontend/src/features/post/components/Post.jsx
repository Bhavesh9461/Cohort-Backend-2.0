import React from "react";
import { FaRegHeart, FaRegCommentAlt, FaBookmark, FaBookDead, FaBookOpen, FaRegBookmark, FaHeart } from "react-icons/fa";
import { PiShareFatBold } from "react-icons/pi";

const Post = ({ user, post, loading, handleLike, handleUnlike }) => {


  return (
    <div className="post">
      <div className="user">
        <div className="img-wrapper">
          <img
            src={user.profileImage}
            alt=""
          />
        </div>
        <p>{user.username}</p>
      </div>
      <img
        src={post.imgUrl}
        alt=""
      />
      <div className="icons">
        <div className="left">
          <button
          onClick={()=> {
            post.isLiked? handleUnlike(post._id) : handleLike(post._id)
          }}
          className={post.isLiked? "like": ""}>
            {post.isLiked? <FaHeart /> : <FaRegHeart />}
            
          </button>
          <button>
            {" "}
            <FaRegCommentAlt />{" "}
          </button>
          <button>
            {" "}
            <PiShareFatBold />{" "}
          </button>
        </div>
        <div className="right">
          <button>
            {" "}
            <FaRegBookmark />{" "}
          </button>
        </div>
      </div>
      <div className="bottom">
        <p className="caption">{post.caption}</p>
      </div>
    </div>
  );
};

export default Post;
