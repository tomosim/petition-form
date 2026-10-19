'use client'
import { type } from "os";
import { useEffect, useState } from "react";
import { z } from "zod";

export default function Form() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [comment, setComment] = useState("");
    const [consent, setConsent] = useState(false);

    const [errors, setErrors] = useState<{ [key in "name" | "email" | "consent"]: string }>({ name: "", email: "", consent: "" });

    useEffect(() => {
        const firstInvalidField = (['name', 'email', 'consent'] as const).find((field) => errors[field]);
        if (firstInvalidField) {
            document.getElementById(firstInvalidField)?.focus();
        }
    }, [errors]);

    const SignPetitionSchema = z.object({
        name: z.string().nonempty("Name is required"),
        email: z.email("Invalid email address"),
        comment: z.string().optional(),
        consent: z.boolean().refine((value) => value === true, {
            message: "You must agree to the terms",
        }),
    })

    type SignPetitionInput = z.infer<typeof SignPetitionSchema>;

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData: SignPetitionInput = {
            name,
            email,
            comment,
            consent,
        };

        const result = SignPetitionSchema.safeParse(formData);

        if (!result.success) {
            console.log('error', result.error);
            const treeifiedError = z.treeifyError(result.error);
            setErrors({
                name: treeifiedError.properties?.name?.errors[0] || "",
                email: treeifiedError.properties?.email?.errors[0] || "",
                consent: treeifiedError.properties?.consent?.errors[0] || "",
            });


        }
        else {
            setErrors({ name: "", email: "", consent: "" });
            try {
                const response = await fetch("/api/sign-petition", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                })
                const data = await response.json();
                console.log("Success:", data);
                // Optionally, you can reset the form or show a success message here
            } catch (error) {
                console.error("Error:", error);
                // Optionally, you can show an error message here
            };
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="comment">Comment:</label>
            <input type="text" id="comment" placeholder="Leave a comment..." value={comment} onChange={(e) => setComment(e.target.value)} />
            {errors.consent && <p style={{ color: "red" }}>{errors.consent}</p>}
            <label htmlFor="consent">I agree to have my name counted and to be contacted about this petition.</label>
            <input type="checkbox" id="consent" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
            <button type="submit">Sign petition</button>
        </form>
    );
}