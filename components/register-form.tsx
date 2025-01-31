"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, z } from "zod";
import { apiRegister } from "@/lib/services/api/auth-api";
import { signIn } from "next-auth/react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useFormStatus } from "react-dom";
import { BallTriangle } from "react-loader-spinner";

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
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import Link from "next/link";
import { Divider } from "@mui/material";
import Image from "next/image";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email(),
  password: z.string().min(3),
  password_confirmation: z.string(),
});
type FormSchemaType = z.infer<typeof formSchema>;
type FormFieldType = keyof FormSchemaType;

export default function RegisterForm() {
  const { pending } = useFormStatus();
  const [loading, setLoading] = useState(false);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { password, password_confirmation } = values;

      if (password !== password_confirmation) {
        enqueueSnackbar("Password does not match", { variant: "error" });
      } else {
        setLoading(true);
        const res = await signIn("register", {
          redirect: false,
          username: values.username,
          email: values.email,
          password: values.password,
        });

        if (res?.ok) {
          enqueueSnackbar("Registration Successful", { variant: "success" });
          setTimeout(() => {
            router.push("/profile/prof-reg");
          }, 2000);
          setLoading(false);
        }

        if (res?.error) {
          const err = JSON.parse(res.error);
          setLoading(false);
          console.log(err);
          {
            err?.email && enqueueSnackbar(err.email, { variant: "error" });
          }
          {
            err?.username &&
              enqueueSnackbar(err.username, { variant: "error" });
          }
          {
            err?.password &&
              enqueueSnackbar(err.password, { variant: "error" });
          }
        }
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

    console.log(values);
  }

  return (
    <SnackbarProvider maxSnack={3}>
      <div className='flex justify-center items-center'>
        <div className='md:w-1/2 w-5/6'>
          <div className='md:w-3/5 mx-auto mt-10 md:mt-0'>
            <h1 className='text-3xl font-bold mb-5 text-gray-800'>
              Create an account
            </h1>
            <Button className='w-full my-5 rounded-full'>
              <img src='/images/google.svg' />{" "}
              <span className='ml-2'> Sign up with Google</span>
            </Button>
            <Divider className='font-semibold text-gray-600 mb-3'>OR</Divider>
            <Form {...form}>
              <form action='' onSubmit={form.handleSubmit(onSubmit)}>
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

                <FormField
                  control={form.control}
                  name='password_confirmation'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password Confirmation</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Confirm Your Password'
                          {...field}
                          type='password'
                        />
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
                    "Register"
                  )}
                </Button>
              </form>
              <div className='text-slate-500 mt-3'>
                By creating an account, you agree to our terms of services and
                privacy policy
              </div>
              <div className='text-slate-500 my-3'>
                Already have an account?{" "}
                <Link href='/login'>
                  {" "}
                  <span className='text-black font-semibold'>Login</span>
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
            className='w-full h-[50rem] float-end'
          />
        </div>
      </div>
    </SnackbarProvider>
  );
}
