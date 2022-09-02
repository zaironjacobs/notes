import { Error, Form, Input, InputError, InputWrapper, NoAccountWrapper, Title } from './LoginStyled'
import { Button } from '@components/Button/Button'
import { NextRouter, useRouter } from 'next/router'
import * as yup from 'yup'
import { global } from '@global'
import Link from 'next/link'
import React, { useState } from 'react'
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { login } from '@services/api'
import { useMutation } from 'react-query'

interface ILoginFormValues {
    email: string
    password: string
}

const schema = yup.object().shape({
    email: yup.string().email('Must be an e-mail format').required('Required'),
    password: yup.string().min(8).max(32).required('Required'),
})

export const Login = () => {
    const router: NextRouter = useRouter()
    const [error, setError] = useState<boolean>(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ILoginFormValues>({
        resolver: yupResolver(schema),
        defaultValues: { email: process.env.NEXT_PUBLIC_DEMO_EMAIL, password: process.env.NEXT_PUBLIC_DEMO_PASSWORD },
    })

    const loginMutation = useMutation(
        'loginMutation',
        (loginValues: ILoginFormValues) => {
            return login(loginValues.email, loginValues.password)
        },
        {
            onSuccess: async () => {
                setError(false)
                router.push('/notes').then()
            },
            onError: () => {
                setError(true)
            },
        }
    )

    // On submit form
    function onSubmitForm(loginValues: ILoginFormValues) {
        loginMutation.mutate(loginValues)
    }

    return (
        <>
            <Head>
                <title>{`Sign In – ${global.siteName}`}</title>
            </Head>
            <Title>Login</Title>
            <Form onSubmit={handleSubmit(onSubmitForm)}>
                <InputWrapper>
                    <Input type="email" placeholder="Your e-mail" {...register('email')} />
                    {errors.email && <InputError>{errors.email.message}</InputError>}
                </InputWrapper>
                <InputWrapper>
                    <Input type="password" placeholder="Password" {...register('password')} />
                    {errors.password && <InputError>{errors.password.message}</InputError>}
                </InputWrapper>
                <Button type="submit">Login</Button>
                {error && <Error>Login failed</Error>}
            </Form>

            <NoAccountWrapper>
                Don&apos;t have an account?{' '}
                <Link href={'/sign-up'}>
                    <a>Sign up</a>
                </Link>
            </NoAccountWrapper>
        </>
    )
}
