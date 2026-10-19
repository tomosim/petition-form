import { NextResponse } from "next/server";

type SignPetitionRequest = {
    name: string;
    email: string;
    comment?: string;
    consent: boolean;
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function POST(request: Request) {
    const body: SignPetitionRequest = await request.json();

    console.log("Received petition signature:", body);

    // Validate the request body
    if (!body.name || !body.email || !body.consent) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Here you would typically save the petition signature to a database or send it to an API

    await delay(800);

    return NextResponse.json({ message: "Petition signed successfully" });
}