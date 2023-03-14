import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";

import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
    ssr: false,
});
const initialState = { id: null, title: "", content: "" };

export default function Post() {
    const supabaseClient = useSupabaseClient();
    const user = useUser();

    const [post, setPost] = useState(initialState);
    const { title, content } = post;
    const router = useRouter();
    function onChange(e) {
        setPost(() => ({ ...post, [e.target.name]: e.target.value }));
    }
    async function createNewPost() {
        if (!title || !content) return;

        const { data, error } = await supabaseClient
            .from("blogposts")
            .insert({
                title,
                content,
                user_id: user.id,
                user_email: user.email,
            })
            .select();

        //console.log(data);
        router.push(`/blog/post/${data[0].id}`);
    }

    return (
        <div>
            <h1>Create new post</h1>
            <input
                onChange={onChange}
                name="title"
                placeholder="Title"
                value={post.title}
            />
            <SimpleMDE
                value={post.content}
                onChange={(value) => setPost({ ...post, content: value })}
            />
            <button type="button" onClick={createNewPost}>
                Create Post
            </button>
        </div>
    );
}
