"use server";

export interface User {
    id: string;
    username: string;
    avatar: string;
    global_name: string;
}

export async function fetchUser(userId: string): Promise<User> {
    const res = await fetch(`https://discord.com/api/v10/users/${userId}`, {
        headers: {
            Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
        },
    });
    return await res.json();
}
