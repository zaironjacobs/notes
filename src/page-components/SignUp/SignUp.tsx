import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { global } from '@global'
import { AlreadyHaveAnAccountWrapper, Error, Form, Input, InputError, InputWrapper, Title } from './SignUpStyled'
import Head from 'next/head'
import * as yup from 'yup'
import { Button } from '@components/Button'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { IUserCreate } from '@interfaces'
import { signUp } from '@services/api'
import { useMutation } from 'react-query'

const schema = yup.object().shape({
    firstName: yup.string().required('Required'),
    lastName: yup.string().required('Required'),
    email: yup.string().email('Must be an e-mail format').required('Required'),
    password: yup.string().min(8).max(32).required('Required'),
    repeatPassword: yup.string().oneOf([yup.ref('password'), null]),
})

export const SignUp = () => {
    const router = useRouter()
    const [error, setError] = useState<boolean>(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IUserCreate>({
        resolver: yupResolver(schema),
    })

    const signUpMutation = useMutation(
        'signUpMutation',
        (userCreate: IUserCreate) => {
            return signUp(userCreate)
        },
        {
            onSuccess: async () => {
                setError(false)
                router.push('/login').then()
            },
            onError: () => {
                setError(true)
            },
        }
    )

    // On submit form
    function onSubmitForm(userCreate: IUserCreate) {
        signUpMutation.mutate(userCreate)
    }

    return (
        <>
            <Head>
                <title>{`Sign Up – ${global.siteName}`}</title>
            </Head>
            <Title>Sign Up</Title>
            <Form onSubmit={handleSubmit(onSubmitForm)}>
                <InputWrapper>
                    <Input type="text" placeholder="Your first name" {...register('firstName')} />
                    {errors.firstName && <InputError>{errors.firstName.message}</InputError>}
                </InputWrapper>
                <InputWrapper>
                    <Input type="text" placeholder="Your last name" {...register('lastName')} />
                    {errors.lastName && <InputError>{errors.lastName.message}</InputError>}
                </InputWrapper>
                <InputWrapper>
                    <Input type="email" placeholder="Your e-mail" {...register('email')} />
                    {errors.email && <InputError>{errors.email.message}</InputError>}
                </InputWrapper>
                <InputWrapper>
                    <Input type="password" placeholder="Password" {...register('password')} />
                    {errors.password && <InputError>{errors.password.message}</InputError>}
                </InputWrapper>
                <InputWrapper>
                    <Input type="password" placeholder="Repeat password" {...register('repeatPassword')} />
                    {errors.repeatPassword && <InputError>{errors.repeatPassword.message}</InputError>}
                </InputWrapper>
                <Button type="submit">Create Account</Button>
                {error && <Error>Sign-up failed</Error>}
            </Form>

            <AlreadyHaveAnAccountWrapper>
                Already have an account? <Link href={'/login'}>Login</Link>
            </AlreadyHaveAnAccountWrapper>
        </>
    )
}
