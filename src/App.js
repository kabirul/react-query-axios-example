import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import "./style/global.css";

import apiClient from "./services/HttpService";

function App() {
  const [getId, setGetId] = useState("");
  const [getTitle, setGetTitle] = useState("");

  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");

  const [putId, setPutId] = useState("");
  const [putTitle, setPutTitle] = useState("");
  const [putDescription, setPutDescription] = useState("");
  const [putPublished, setPutPublished] = useState(false);

  const [deleteId, setDeleteId] = useState("");

  const [getResult, setGetResult] = useState(null);
  const [postResult, setPostResult] = useState(null);
  const [putResult, setPutResult] = useState(null);
  const [deleteResult, setDeleteResult] = useState(null);

  const fortmatResponse = (res) => {
    return JSON.stringify(res, null, 2);
  };

  const { isLoading: isLoadingBlogs, refetch: getAllBlogs } = useQuery(
    "query-blogs",
    async () => {
      return await apiClient.get("/blogs");
    },
    {
      enabled: false,
      onSuccess: (res) => {
        const result = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data,
        };

        setGetResult(fortmatResponse(result));
      },
      onError: (err) => {
        setGetResult(fortmatResponse(err.response?.data || err));
      },
    }
  );

  useEffect(() => {
    if (isLoadingBlogs) setGetResult("loading...");
  }, [isLoadingBlogs]);

  function getAllData() {
    try {
      getAllBlogs();
    } catch (err) {
      setGetResult(fortmatResponse(err));
    }
  }

  const { isLoading: isLoadingBlog, refetch: getBlogById } = useQuery(
    "query-tutorial-by-id",
    async () => {
      return await apiClient.get(`/blogs/${getId}`);
    },
    {
      enabled: false,
      retry: 1,
      onSuccess: (res) => {
        const result = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data,
        };

        setGetResult(fortmatResponse(result));
      },
      onError: (err) => {
        setGetResult(fortmatResponse(err.response?.data || err));
      },
    }
  );

  useEffect(() => {
    if (isLoadingBlog) setGetResult("loading...");
  }, [isLoadingBlog]);

  function getDataById() {
    if (getId) {
      try {
        getBlogById();
      } catch (err) {
        setGetResult(fortmatResponse(err));
      }
    }
  }

  const { isLoading: isSearchingBlog, refetch: findBlogsByTitle } =
    useQuery(
      "query-blogs-by-title", // ["query-blogs-by-title", getTitle],
      async () => {
        return await apiClient.get(`/blogs?title=${getTitle}`);
      },
      {
        enabled: false,
        retry: 1,
        onSuccess: (res) => {
          const result = {
            status: res.status + "-" + res.statusText,
            headers: res.headers,
            data: res.data,
          };

          setGetResult(fortmatResponse(result));
        },
        onError: (err) => {
          setGetResult(fortmatResponse(err.response?.data || err));
        },
      }
    );

  useEffect(() => {
    if (isSearchingBlog) setGetResult("searching...");
  }, [isSearchingBlog]);

  function getDataByTitle() {
    if (getTitle) {
      try {
        findBlogsByTitle();
      } catch (err) {
        setGetResult(fortmatResponse(err));
      }
    }
  }

  const { isLoading: isPostingBlog, mutate: postBlog } = useMutation(
    async () => {
      return await apiClient.post(`/blogs`, {
        title: postTitle,
        description: postDescription,
      });
    },
    {
      onSuccess: (res) => {
        const result = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data,
        };

        setPostResult(fortmatResponse(result));
      },
      onError: (err) => {
        setPostResult(fortmatResponse(err.response?.data || err));
      },
    }
  );

  useEffect(() => {
    if (isPostingBlog) setPostResult("posting...");
  }, [isPostingBlog]);

  function postData() {
    try {
      postBlog();
    } catch (err) {
      setPostResult(fortmatResponse(err));
    }
  }

  const { isLoading: isUpdatingBlog, mutate: updateBlog } = useMutation(
    async () => {
      return await apiClient.put(`/blogs/${putId}`, {
        title: putTitle,
        description: putDescription,
        published: putPublished,
      });
    },
    {
      onSuccess: (res) => {
        const result = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data,
        };

        setPutResult(fortmatResponse(result));
      },
      onError: (err) => {
        setPutResult(fortmatResponse(err.response?.data || err));
      },
    }
  );

  useEffect(() => {
    if (isUpdatingBlog) setPutResult("updating...");
  }, [isUpdatingBlog]);

  function putData() {
    if (putId) {
      try {
        updateBlog();
      } catch (err) {
        setPutResult(fortmatResponse(err));
      }
    }
  }

  const { isLoading: isDeletingBlogs, mutate: deleteAllBlogs } =
    useMutation(
      async () => {
        return await apiClient.delete("/blogs/");
      },
      {
        onSuccess: (res) => {
          const result = {
            status: res.status + "-" + res.statusText,
            headers: res.headers,
            data: res.data,
          };

          setDeleteResult(fortmatResponse(result));
        },
        onError: (err) => {
          setDeleteResult(fortmatResponse(err.response?.data || err));
        },
      }
    );

  useEffect(() => {
    if (isDeletingBlogs) setDeleteResult("deleting...");
  }, [isDeletingBlogs]);

  function deleteAllData() {
    try {
      deleteAllBlogs();
    } catch (err) {
      setDeleteResult(fortmatResponse(err));
    }
  }

  const { isLoading: isDeletingBlog, mutate: deleteBlog } = useMutation(
    async () => {
      return await apiClient.delete(`/blogs/${deleteId}`);
    },
    {
      onSuccess: (res) => {
        const result = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data,
        };

        setDeleteResult(fortmatResponse(result));
      },
      onError: (err) => {
        setDeleteResult(fortmatResponse(err.response?.data || err));
      },
    }
  );

  useEffect(() => {
    if (isDeletingBlog) setDeleteResult("deleting...");
  }, [isDeletingBlog]);

  function deleteDataById() {
    if (deleteId) {
      try {
        deleteBlog();
      } catch (err) {
        setDeleteResult(fortmatResponse(err));
      }
    }
  }

  const clearGetOutput = () => {
    setGetResult(null);
  };

  const clearPostOutput = () => {
    setPostResult(null);
  };

  const clearPutOutput = () => {
    setPutResult(null);
  };

  const clearDeleteOutput = () => {
    setDeleteResult(null);
  };

  return (
    <div id="app" className="container my-3">
	<nav className="navbar navbar-expand navbar-dark bg-info">
		<div className="container">            
			  <a href="https://github.com/kabirul">
			    <img src="https://amicacs.com/assets/images/logo.png" className="imground" alt="" /> 
			  </a> 		 
          <div className="navbar-nav mr-auto mleft">
                     
          </div>
		   </div>	 
        </nav>
      <h3>React Query Axios example</h3>

      <div className="card mt-3">
        <div className="card-header">React Query Axios GET </div>
        <div className="card-body">
          <div className="input-group input-group-sm">
            <button className="btn btn-sm btn-success" onClick={getAllData}>
              Get All
            </button>

            <input
              type="text"
              value={getId}
              onChange={(e) => setGetId(e.target.value)}
              className="form-control ml-2"
              placeholder="Id"
            />
            <div className="input-group-append">
              <button className="btn btn-sm btn-primary" onClick={getDataById}>
                Get by Id
              </button>
            </div>

            <input
              type="text"
              value={getTitle}
              onChange={(e) => setGetTitle(e.target.value)}
              className="form-control ml-2"
              placeholder="Title"
            />
            <div className="input-group-append">
              <button
                className="btn btn-sm btn-primary"
                onClick={getDataByTitle}
              >
                Find By Title
              </button>
            </div>

            <button
              className="btn btn-sm btn-warning ml-2"
              onClick={clearGetOutput}
            >
              Clear
            </button>
          </div>

          {getResult && (
            <div className="alert alert-secondary mt-2" role="alert">
              <pre>{getResult}</pre>
            </div>
          )}
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-header">React Query Axios POST </div>
        <div className="card-body">
          <div className="form-group">
            <input
              type="text"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              className="form-control"
              placeholder="Title"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              value={postDescription}
              onChange={(e) => setPostDescription(e.target.value)}
              className="form-control"
              placeholder="Description"
            />
          </div>
          <button className="btn btn-sm btn-primary" onClick={postData}>
            Post Data
          </button>
          <button
            className="btn btn-sm btn-warning ml-2"
            onClick={clearPostOutput}
          >
            Clear
          </button>

          {postResult && (
            <div className="alert alert-secondary mt-2" role="alert">
              <pre>{postResult}</pre>
            </div>
          )}
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-header">React Query Axios PUT </div>
        <div className="card-body">
          <div className="form-group">
            <input
              type="text"
              value={putId}
              onChange={(e) => setPutId(e.target.value)}
              className="form-control"
              placeholder="Id"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              value={putTitle}
              onChange={(e) => setPutTitle(e.target.value)}
              className="form-control"
              placeholder="Title"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              value={putDescription}
              onChange={(e) => setPutDescription(e.target.value)}
              className="form-control"
              placeholder="Description"
            />
          </div>
          <div className="form-check mb-2">
            <input
              type="checkbox"
              name="putPublished"
              checked={putPublished}
              onChange={(e) => setPutPublished(e.target.checked)}
              className="form-check-input"
            />
            <label className="form-check-label" htmlFor="putPublished">
              Publish
            </label>
          </div>
          <button className="btn btn-sm btn-primary" onClick={putData}>
            Update Data
          </button>
          <button
            className="btn btn-sm btn-warning ml-2"
            onClick={clearPutOutput}
          >
            Clear
          </button>

          {putResult && (
            <div className="alert alert-secondary mt-2" role="alert">
              <pre>{putResult}</pre>
            </div>
          )}
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-header">
          React Query Axios DELETE 
        </div>
        <div className="card-body">
          <div className="input-group input-group-sm">
            <button className="btn btn-sm btn-danger" onClick={deleteAllData}>
              Delete All
            </button>

            <input
              type="text"
              value={deleteId}
              onChange={(e) => setDeleteId(e.target.value)}
              className="form-control ml-2"
              placeholder="Id"
            />
            <div className="input-group-append">
              <button
                className="btn btn-sm btn-danger"
                onClick={deleteDataById}
              >
                Delete by Id
              </button>
            </div>

            <button
              className="btn btn-sm btn-warning ml-2"
              onClick={clearDeleteOutput}
            >
              Clear
            </button>
          </div>

          {deleteResult && (
            <div className="alert alert-secondary mt-2" role="alert">
              <pre>{deleteResult}</pre>
            </div>
          )}
        </div>
      </div>
	   <div className="container mt-3">
		   <p className="text-center">React Query Axios example tutorial <a href="https://github.com/kabirul" target="_blank" rel="noopener noreferrer">amica.</a></p>
		</div>
    </div>
  );
}

export default App;
