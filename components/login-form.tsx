"use client";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn, signOut, useSession } from "next-auth/react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useFormStatus } from "react-dom";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from "./ui/form";
import { useRouter } from "next/navigation";
import { useState } from "react";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email(),
  password: z.string().min(3),
});
type FormSchemaType = z.infer<typeof formSchema>;
type FormFieldType = keyof FormSchemaType;

export default function LoginForm() {
  const { pending } = useFormStatus();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // await apiRegister(values);
      setLoading(true);
      const res = await signIn("login-credentials", {
        redirect: false,
        username: values.username, // include username
        email: values.email,
        password: values.password,
      });

      if (res?.ok) {
        router.replace("/profile");
        // setLoading(false);
      }

      console.log(res);

      if (res?.error) {
        setError(res.error);
        return setLoading(false);
      }
    } catch (error: any) {
      console.log(error.response);
      if (error.response && error.response.data) {
        const serverErrors = error.response.data; // assuming errors are in this format
        (Object.keys(serverErrors) as FormFieldType[]).forEach((key) => {
          form.setError(key, { message: serverErrors[key].join(" ") });
        });
      }
    }
    // console.log(values);
  }

  // const session = useSession();
  // console.log(session);

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='bg-background p-8 rounded-lg shadow-md w-full max-w-md'>
        <h1 className='text-3xl font-bold mb-6 text-center'>Login</h1>
        <Form {...form}>
          <form action='' method='POST' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter your username' {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter your Email'
                      {...field}
                      type='email'
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder='***' {...field} type='password' />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='text-red-400 mt-4 text-sm'>{error}</div>

            <Button type='submit' className='w-full mt-4' disabled={pending}>
              {loading ? "Logging in..." : "Log in"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
