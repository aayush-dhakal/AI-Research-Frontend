import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/router";
import api from "../../utils/api";
import Image from "next/image";
import { formattedDate } from "@/utils/helpers";
import Head from "next/head";
import axios from "axios";

const Blog = ({ post }) => {
  const [headTitle, setHeadTitle] = useState("");

  // const [post, setPost] = useState();

  // const getPost = async () => {
  //   try {
  //     const res = await api.get(`/post/${blogId}`);
  //     setPost(res?.data?.data);
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("Error getting the post");
  //   }
  // };

  // useEffect(() => {
  //   blogId && getPost();
  // }, [blogId]);

  // console.log("post...", post);

  useEffect(() => {
    setHeadTitle(post.title);
  }, [post]);

  if (!post) return;

  return (
    <>
      <Head>
        <title>{headTitle} | AI Research</title>

        <meta property="og:title" content={post?.title} key="title" />
        <meta property="og:image" content={post?.coverImage} key="coverImage" />
        <meta name="twitter:card" content="sumary_large" />
      </Head>

      <section
        className="post-format-inner-banner mb-100"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.527), rgba(0, 0, 0, 0.5)), url(${post?.coverImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="post-gallery-title mt-100 pt-100">
                <h2>{post?.title}</h2>
              </div>
              <div className="post-gallery-author-meta">
                <div className="author-area">
                  <div className="author-img">
                    <Image
                      src={post?.user?.image}
                      alt="image"
                      width={30}
                      height={30}
                    />
                  </div>
                  <div className="author-content">
                    <p>
                      Posted By,{" "}
                      <Link legacyBehavior href={`/team/${post?.user._id}`}>
                        <a>{post?.user?.name}</a>
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="post-meta">
                  <ul>
                    <li>
                      <svg
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M8 0C3.60594 0 0 3.60594 0 8C0 12.3941 3.60594 16 8 16C12.3941 16 16 12.3941 16 8C16 3.60594 12.3941 0 8 0ZM11.646 3.69106C11.8291 3.508 12.1259 3.508 12.3089 3.69106C12.492 3.87413 12.492 4.17091 12.3089 4.35397C12.1259 4.53703 11.8291 4.53703 11.646 4.35397C11.463 4.17091 11.463 3.87413 11.646 3.69106ZM7.53125 2.375C7.53125 2.11591 7.74091 1.90625 8 1.90625C8.25909 1.90625 8.46875 2.11591 8.46875 2.375V3.3125C8.46875 3.57159 8.25909 3.78125 8 3.78125C7.74091 3.78125 7.53125 3.57159 7.53125 3.3125V2.375ZM2.375 8.46875C2.11591 8.46875 1.90625 8.25909 1.90625 8C1.90625 7.74091 2.11591 7.53125 2.375 7.53125H3.3125C3.57159 7.53125 3.78125 7.74091 3.78125 8C3.78125 8.25909 3.57159 8.46875 3.3125 8.46875H2.375ZM4.35397 12.3089C4.17091 12.492 3.87413 12.492 3.69106 12.3089C3.508 12.1259 3.508 11.8291 3.69106 11.646C3.87413 11.4629 4.17091 11.4629 4.35397 11.646C4.53703 11.8291 4.53703 12.1259 4.35397 12.3089ZM4.35397 4.35397C4.17091 4.53703 3.87413 4.53703 3.69106 4.35397C3.508 4.17091 3.508 3.87413 3.69106 3.69106C3.87413 3.508 4.17091 3.508 4.35397 3.69106C4.53703 3.87413 4.53703 4.17091 4.35397 4.35397ZM8.46875 13.625C8.46875 13.8841 8.25909 14.0938 8 14.0938C7.74091 14.0938 7.53125 13.8841 7.53125 13.625V12.6875C7.53125 12.4284 7.74091 12.2188 8 12.2188C8.25909 12.2188 8.46875 12.4284 8.46875 12.6875V13.625ZM11.1439 11.1439C10.9608 11.327 10.6642 11.327 10.4811 11.1439L7.66856 8.33141C7.58069 8.24353 7.53125 8.1245 7.53125 8V5.1875C7.53125 4.92841 7.74091 4.71875 8 4.71875C8.25909 4.71875 8.46875 4.92841 8.46875 5.1875V7.80591L11.1439 10.4811C11.327 10.6642 11.327 10.9608 11.1439 11.1439ZM12.3089 12.3089C12.1259 12.492 11.8291 12.492 11.646 12.3089C11.463 12.1259 11.463 11.8291 11.646 11.646C11.8291 11.4629 12.1259 11.4629 12.3089 11.646C12.492 11.8291 12.492 12.1259 12.3089 12.3089ZM14.0938 8C14.0938 8.25909 13.8841 8.46875 13.625 8.46875H12.6875C12.4284 8.46875 12.2188 8.25909 12.2188 8C12.2188 7.74091 12.4284 7.53125 12.6875 7.53125H13.625C13.8841 7.53125 14.0938 7.74091 14.0938 8Z" />
                      </svg>
                      {formattedDate(post?.createdAt)}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="post-gallery-details style-4">
        <div className="container">
          <div className="post-gallery-content">
            <div className="row justify-content-center g-4">
              <div className="col-lg-8">
                <div dangerouslySetInnerHTML={{ __html: post?.description }} />
              </div>
            </div>

            <div className="post-tags-social">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-10">
                  <div className="tags">
                    <ul>
                      {post?.topics.map((topic, index) => (
                        <li key={index}>
                          <Link
                            legacyBehavior
                            href={`/blog?topic=${encodeURIComponent(topic)}`}
                          >
                            <a>
                              <span>#</span> {topic}
                            </a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;

export const getServerSideProps = async (context) => {
  const { blogId } = context.query;

  // const res = await api.get(`/post/${blogId}`);
  // const res = await axios.get(
  //   `https://ai-research-api.vercel.app/api/post/${blogId}`
  // );
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_API}/post/${blogId}`
  );

  // console.log("res......", res);

  const post = res?.data?.data;

  return { props: { post } };
};

// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import api from "../../utils/api";
// import Image from "next/image";
// import { formattedDate } from "@/utils/helpers";
// import Head from "next/head";

// const Blog = () => {
//   const router = useRouter();
//   const blogId = router.query.blogId;

//   const [post, setPost] = useState();

//   const getPost = async () => {
//     try {
//       const res = await api.get(`/post/${blogId}`);
//       setPost(res?.data?.data);
//     } catch (err) {
//       console.error(err);
//       toast.error("Error getting the post");
//     }
//   };

//   useEffect(() => {
//     blogId && getPost();
//   }, [blogId]);

//   if (!post) return;

//   return (
//     <>
//       <Head>
//         <title>{post.title} | AI Research</title>

//         <meta property="og:title" content={post?.title} key="title" />
//         <meta property="og:image" content={post?.coverImage} key="coverImage" />
//         <meta name="twitter:card" content="sumary_large" />
//       </Head>

//       <section
//         className="post-format-inner-banner mb-100"
//         style={{
//           backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.527), rgba(0, 0, 0, 0.5)), url(${post?.coverImage})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//         <div className="container">
//           <div className="row">
//             <div className="col-lg-12">
//               <div className="post-gallery-title mt-100 pt-100">
//                 <h2>{post?.title}</h2>
//               </div>
//               <div className="post-gallery-author-meta">
//                 <div className="author-area">
//                   <div className="author-img">
//                     <Image
//                       src={post?.user?.image}
//                       alt="image"
//                       width={30}
//                       height={30}
//                     />
//                   </div>
//                   <div className="author-content">
//                     <p>
//                       Posted By,{" "}
//                       <Link legacyBehavior href={`/team/${post?.user._id}`}>
//                         <a>{post?.user?.name}</a>
//                       </Link>
//                     </p>
//                   </div>
//                 </div>
//                 <div className="post-meta">
//                   <ul>
//                     <li>
//                       <svg
//                         viewBox="0 0 16 16"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path d="M8 0C3.60594 0 0 3.60594 0 8C0 12.3941 3.60594 16 8 16C12.3941 16 16 12.3941 16 8C16 3.60594 12.3941 0 8 0ZM11.646 3.69106C11.8291 3.508 12.1259 3.508 12.3089 3.69106C12.492 3.87413 12.492 4.17091 12.3089 4.35397C12.1259 4.53703 11.8291 4.53703 11.646 4.35397C11.463 4.17091 11.463 3.87413 11.646 3.69106ZM7.53125 2.375C7.53125 2.11591 7.74091 1.90625 8 1.90625C8.25909 1.90625 8.46875 2.11591 8.46875 2.375V3.3125C8.46875 3.57159 8.25909 3.78125 8 3.78125C7.74091 3.78125 7.53125 3.57159 7.53125 3.3125V2.375ZM2.375 8.46875C2.11591 8.46875 1.90625 8.25909 1.90625 8C1.90625 7.74091 2.11591 7.53125 2.375 7.53125H3.3125C3.57159 7.53125 3.78125 7.74091 3.78125 8C3.78125 8.25909 3.57159 8.46875 3.3125 8.46875H2.375ZM4.35397 12.3089C4.17091 12.492 3.87413 12.492 3.69106 12.3089C3.508 12.1259 3.508 11.8291 3.69106 11.646C3.87413 11.4629 4.17091 11.4629 4.35397 11.646C4.53703 11.8291 4.53703 12.1259 4.35397 12.3089ZM4.35397 4.35397C4.17091 4.53703 3.87413 4.53703 3.69106 4.35397C3.508 4.17091 3.508 3.87413 3.69106 3.69106C3.87413 3.508 4.17091 3.508 4.35397 3.69106C4.53703 3.87413 4.53703 4.17091 4.35397 4.35397ZM8.46875 13.625C8.46875 13.8841 8.25909 14.0938 8 14.0938C7.74091 14.0938 7.53125 13.8841 7.53125 13.625V12.6875C7.53125 12.4284 7.74091 12.2188 8 12.2188C8.25909 12.2188 8.46875 12.4284 8.46875 12.6875V13.625ZM11.1439 11.1439C10.9608 11.327 10.6642 11.327 10.4811 11.1439L7.66856 8.33141C7.58069 8.24353 7.53125 8.1245 7.53125 8V5.1875C7.53125 4.92841 7.74091 4.71875 8 4.71875C8.25909 4.71875 8.46875 4.92841 8.46875 5.1875V7.80591L11.1439 10.4811C11.327 10.6642 11.327 10.9608 11.1439 11.1439ZM12.3089 12.3089C12.1259 12.492 11.8291 12.492 11.646 12.3089C11.463 12.1259 11.463 11.8291 11.646 11.646C11.8291 11.4629 12.1259 11.4629 12.3089 11.646C12.492 11.8291 12.492 12.1259 12.3089 12.3089ZM14.0938 8C14.0938 8.25909 13.8841 8.46875 13.625 8.46875H12.6875C12.4284 8.46875 12.2188 8.25909 12.2188 8C12.2188 7.74091 12.4284 7.53125 12.6875 7.53125H13.625C13.8841 7.53125 14.0938 7.74091 14.0938 8Z" />
//                       </svg>
//                       {formattedDate(post?.createdAt)}
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       <section className="post-gallery-details style-4">
//         <div className="container">
//           <div className="post-gallery-content">
//             <div className="row justify-content-center g-4">
//               <div className="col-lg-8">
//                 <div dangerouslySetInnerHTML={{ __html: post?.description }} />
//               </div>
//             </div>

//             <div className="post-tags-social">
//               <div className="row">
//                 <div className="col-lg-6 col-md-6 col-sm-10">
//                   <div className="tags">
//                     <ul>
//                       {post?.topics.map((topic, index) => (
//                         <li key={index}>
//                           <Link
//                             legacyBehavior
//                             href={`/blog?topic=${encodeURIComponent(topic)}`}
//                           >
//                             <a>
//                               <span>#</span> {topic}
//                             </a>
//                           </Link>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Blog;
