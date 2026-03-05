import { NextResponse } from "next/server";
import { createClient as createServerClient } from "@/lib/supabase-server";
import { supabase as publicClient } from "@/lib/supabase";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (id) {
            const { data, error } = await publicClient
                .from("posts")
                .select("*")
                .eq("id", id)
                .single();

            if (error) throw error;
            return NextResponse.json(data);
        }

        const { data, error } = await publicClient
            .from("posts")
            .select("*")
            .order("published_at", { ascending: false });

        if (error) throw error;
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const supabase = await createServerClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body = await request.json();
        const { data, error } = await supabase
            .from("posts")
            .insert([body])
            .select()
            .single();

        if (error) throw error;
        return NextResponse.json(data, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const supabase = await createServerClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body = await request.json();
        const { id, ...updates } = body;

        if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

        const { data, error } = await supabase
            .from("posts")
            .update(updates)
            .eq("id", id)
            .select()
            .single();

        if (error) throw error;
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const supabase = await createServerClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

        const { error } = await supabase.from("posts").delete().eq("id", id);

        if (error) throw error;
        return NextResponse.json({ message: "Post deleted" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
