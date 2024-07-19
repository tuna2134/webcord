"use client";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { fetchUser, User } from "./actions";
import React from "react";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
    TableCell,
} from "@/components/ui/table";
import { useSearchParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const formSchema = z.object({
    userid: z.string(),
});

export default function Home() {
    const searchParams = useSearchParams();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userid: searchParams.get("userid") as string | undefined,
        },
    });
    const [user, setUser] = React.useState<User | undefined>(undefined);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        let user = await fetchUser(values.userid);
        setUser(user);
    }
    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="userid"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ユーザーID</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="ユーザーID"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button type="submit">検索</Button>
                </form>
            </Form>
            {user && (
                <div className="mt-8">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Value</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-semibold">
                                    ユーザー名
                                </TableCell>
                                <TableCell>{user.username}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-semibold">
                                    ユーザーID
                                </TableCell>
                                <TableCell>{user.id}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-semibold">
                                    グローバル名
                                </TableCell>
                                <TableCell>{user.global_name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-semibold">
                                    アバター
                                </TableCell>
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage
                                            src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=1024`}
                                            alt={user.username}
                                        />
                                        <AvatarFallback>
                                            {user.global_name}
                                        </AvatarFallback>
                                    </Avatar>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            )}
        </>
    );
}
