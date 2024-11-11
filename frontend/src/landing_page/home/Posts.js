import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Posts.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Posts() {
    const [posts, setPosts] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [uploadedDoc, setUploadedDoc] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("http://localhost:3003/api/posts");
                setPosts(response.data.posts);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, []);

    const toggleModal = () => setShowModal(!showModal);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (inputValue.trim() || uploadedDoc) {
            const formData = new FormData();
            formData.append('content', inputValue);
            formData.append('username', username.trim() || 'anonymous');
            if (uploadedDoc) {
                formData.append('doc', uploadedDoc);
            }

            try {
                const response = await axios.post("http://localhost:3003/api/posts/create", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                setPosts([...posts, response.data.post]);
                setInputValue('');
                setUploadedDoc(null);
                setUsername('');
                toggleModal();
            } catch (error) {
                console.error("Error creating post:", error);
            }
        }
    };

    const handleFileUpload = (e) => {
        setUploadedDoc(e.target.files[0]);
    };

    const handleDelete = async (postId, postUsername) => {
        if (!postId || !postUsername) {
            console.error("postId or postUsername is undefined");
            return;
        }
        try {
            const token = localStorage.getItem('token');
            console.log(`the token is ${token}`);
            const response = await axios.delete("http://localhost:3003/api/posts/delete", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: { postId, username: postUsername }
            });
            console.log("Post deleted successfully:", response.data);
            setPosts(posts.filter((post) => post._id !== postId));
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    return (
        <div className="posts-containerr">
            <div className="d-flex justify-content-center mb-3">
                <button className="btn-create" onClick={toggleModal}>
                    Create Post
                </button>
            </div>

            {showModal && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Create a Post</h5>
                                <button type="button" className="modal-close-btn" onClick={toggleModal}>×</button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label">Username</label>
                                        <input
                                            type="text"
                                            id="username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            placeholder="Enter your username..."
                                            className="form-control"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <textarea
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            placeholder="Write something..."
                                            className="form-control"
                                            rows="3"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <input type="file" onChange={handleFileUpload} className="form-control" />
                                    </div>

                                    <button type="submit" className="btn btn-success w-100">Add Post</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="post-list">
                {posts.map((post) => (
                    <div key={post._id} className="card p-3 mb-4">
                        <div className="d-flex align-items-center mb-3">
                            <img src="https://via.placeholder.com/50" alt="Profile" className="rounded-circle me-3" />
                            <span className="fw-bold ">{post.username}</span>
                        </div>
                        <p className="mb-2">{post.content}</p>
                        {post.doc && (
                            <div className="image-container">
                                <img
                                    src={`${post.doc.url}`}
                                    alt={post.doc.filename}
                                    className="img-fluid mb-2"
                                />
                            </div>
                        )}
                        <button
                            className="btn btn-delete mt-4"
                            onClick={() => handleDelete(post._id, post.username)}
                        >
                            DELETE
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Posts;
