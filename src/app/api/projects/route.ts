import { NextResponse } from "next/server";
import { createClient as createServerClient } from "@/lib/supabase-server";
import { supabase as publicClient } from "@/lib/supabase";

export async function GET() {
    try {
        const { data, error } = await publicClient
            .from("projects")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) throw error;
        return NextResponse.json(data);
    } catch (error: any) {
        console.error("Failed to fetch projects:", error);
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const supabase = await createServerClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { title, description, tech, github_url, live_url } = body;

        const { data, error } = await supabase
            .from("projects")
            .insert([{ title, description, tech, github_url, live_url }])
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json(data, { status: 201 });
    } catch (error: any) {
        console.error("Project creation error:", error);
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        const supabase = await createServerClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "Missing ID" }, { status: 400 });
        }

        const { error } = await supabase.from("projects").delete().eq("id", id);

        if (error) throw error;

        return NextResponse.json({ message: "Project deleted" });
    } catch (error: any) {
        console.error("Project deletion error:", error);
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}
