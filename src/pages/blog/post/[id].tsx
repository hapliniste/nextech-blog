// pages/posts/[id].js
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
//import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { supabase } from "@/utils/initSupabase";

export default function Post({ post }) {
    const router = useRouter();
    if (router.isFallback) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <h1>{post.title}</h1>
            <p>by {post.user_email}</p>
            <div>
                <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
        </div>
    );
}

export async function getStaticPaths() {
    const { data, error } = await supabase.from("blogposts").select("id");
    const paths = data.map((post) => ({
        params: { id: JSON.stringify(post.id) },
    }));
    return {
        paths,
        fallback: true,
    };
}

export async function getStaticProps({ params }) {
    const { id } = params;
    const { data } = await supabase
        .from("blogposts")
        .select()
        .filter("id", "eq", id)
        .single();
    return {
        props: {
            post: data,
        },
    };
}
