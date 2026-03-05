import { NextResponse } from "next/server";
import { createClient as createServerClient } from "@/lib/supabase-server";
import { supabase as publicClient } from "@/lib/supabase";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Use the public anon client for inserts — contact form is open to everyone
        const { error } = await publicClient
            .from("contacts")
            .insert([{ name, email, message }]);

        if (error) throw error;

        return NextResponse.json(
            { message: "Message sent successfully" },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Form submission error:", error);
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        // Use server client so it reads the session cookie
        const supabase = await createServerClient();

        // Guard: only authenticated users can read contact submissions
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { data, error } = await supabase
            .from("contacts")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) throw error;

        return NextResponse.json(data);
    } catch (error: any) {
        console.error("Failed to fetch submissions:", error);
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}
