'use client'
import { useState } from "react";

export default function Form() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [comment, setComment] = useState("");
    const [consent, setConsent] = useState(false);

    return (
        <form>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="comment">Comment:</label>
            <input type="text" id="comment" placeholder="Leave a comment..." value={comment} onChange={(e) => setComment(e.target.value)} />
            <label htmlFor="consent">I agree to have my name counted and to be contacted about this petition.</label>
            <input type="checkbox" id="consent" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
            <button type="submit">Sign petition</button>
        </form>
    );
}