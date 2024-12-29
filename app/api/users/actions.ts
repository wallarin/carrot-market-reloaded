"use server";

export async function handleForm() {
    "use server";
    await new Promise((resolve) => setTimeout(resolve, 2000));
    //redirect("/");

    return {
        errors: ["패스워드가 일치하지 않습니다.", "패스워드가 너무 짧습니다."]
    }
}