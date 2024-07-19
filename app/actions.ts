"use server";
import { kv } from "@vercel/kv";

export interface User {
    id: string;
    username: string;
    avatar: string;
    global_name: string;
}

export async function fetchUser(userId: string): Promise<User> {
    let user: User | null = await kv.get(`user:${userId}`);
    if (user !== null) {
        return user;
    }
    const res = await fetch(`https://discord.com/api/v10/users/${userId}`, {
        headers: {
            Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
        },
    });
    user = await res.json()
    await kv.set(`user:${userId}`, user, {
        ex: 60,
    });
    return await res.json();
}
