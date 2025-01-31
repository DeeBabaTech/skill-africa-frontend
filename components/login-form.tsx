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
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { BallTriangle } from "react-loader-spinner";
import Link from "next/link";
import Image from "next/image";
import { Divider } from "@mui/material";

const formSchema = z.object({
  // username: z.string().min(2, {
  //   message: "Username must be at least 2 characters.",
  // }),
  email: z.string().email(),
  password: z.string().min(3),
});
type FormSchemaType = z.infer<typeof formSchema>;
type FormFieldType = keyof FormSchemaType;

export default function LoginForm() {
  const { pending } = useFormStatus();
  const [loading, setLoading] = useState(false);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const res = await signIn("login", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (res?.ok) {
        enqueueSnackbar("Login Successful", { variant: "success" });
        setTimeout(() => {
          router.push("/profile");
        }, 2000);
        setLoading(false);
      }

      if (res?.error) {
        enqueueSnackbar(res.error, { variant: "error" });
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
  }

  return (
    <SnackbarProvider maxSnack={3}>
      <div className='flex justify-center items-center'>
        <div className='md:w-1/2 w-5/6'>
          <div className='md:w-3/5 mx-auto mt-10 md:mt-0'>
            <h1 className='text-3xl font-bold mb-5 text-gray-800'>
              Login an account
            </h1>
            <Button className='w-full my-5 rounded-full'>
              <img src='/images/google.svg' />{" "}
              <span className='ml-2'> Sign in with Google</span>
            </Button>
            <Divider className='font-semibold text-gray-600 mb-3'>OR</Divider>
            <Form {...form}>
              <form
                action=''
                method='POST'
                onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
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

                <Button
                  type='submit'
                  className='w-full mt-4 bg-orange-500 rounded-full hover:bg-orange-400'
                  disabled={pending}>
                  {loading ? (
                    <BallTriangle
                      height={30}
                      width={30}
                      radius={5}
                      color='#ffffff'
                      ariaLabel='ball-triangle-loading'
                      wrapperStyle={{}}
                      wrapperClass=''
                      visible={true}
                    />
                  ) : (
                    "Log in"
                  )}
                </Button>
              </form>
              <div className='text-slate-500 mt-3 text-center'>
                Don&apos;t have an account?{" "}
                <Link href='/register'>
                  {" "}
                  <span className='text-black font-semibold'>
                    Create account
                  </span>
                </Link>
              </div>
            </Form>
          </div>
        </div>
        <div className='w-1/2 hidden md:block'>
          <Image
            src='/images/cover.svg'
            alt='skillafrika'
            width={100}
            height={100}
            className='w-full h-screen float-end'
          />
        </div>
      </div>
    </SnackbarProvider>
  );
}
