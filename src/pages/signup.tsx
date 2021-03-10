import React, {useState} from 'react';
import {useRouter} from 'next/router';
import {CustomButton} from '@component/CustomButton';
import {SignUpForm, Content} from '@style/SignUpStyled';
import {
    MainContainer
} from '@style/SignUpStyled';
import {Formik, useField} from 'formik';
import Link from 'next/link';
import * as Yup from 'yup';
import axios, {AxiosResponse} from 'axios';
import global from 'global';
import withSession from '@lib/session';
import Menu from '@component/Menu';
import Header from '@component/Header';
import Head from 'next/head';


const SignUp = (props) => {
    const router = useRouter();
    const [error, setError] = useState('');

    const submit = async (values, setError, router) => {
        await axios.post(global.api.signUp, {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password
        })
            .then(function (response: AxiosResponse) {
                setError('');
                router.push(global.paths.notes);
            })
            .catch(function (error) {
                setError(error.response.data.message);
            });
    };

    return (
        <>
            {/* Menu */}
            <div ref={props.menuNode}>
                <Menu menuOpen={props.menuOpen} setMenuOpen={props.setMenuOpen} user={props.user}/>
            </div>

            {/* Header */}
            <Header menuOpen={props.menuOpen} setMenuOpen={props.setMenuOpen}/>

            {/* Main */}
            <MainContainer>
                <Head>
                    <title>Signup – {global.siteName}</title>
                </Head>
                <Content>
                    <Formik
                        initialValues={{
                            firstName: '',
                            lastName: '',
                            email: '',
                            password: ''
                        }}
                        validationSchema={Yup.object({
                            firstName: Yup.string()
                                .min(3, 'At least 3 characters')
                                .max(30, 'No more than 30 characters')
                                .matches(/^[aA-zZ\s]+$/, 'Only alphabets')
                                .required('Required'),

                            lastName: Yup.string()
                                .min(3, 'At least 3 characters')
                                .max(30, 'No more than 30 characters')
                                .matches(/^[aA-zZ\s]+$/, 'Only alphabets')
                                .required('Required'),

                            email: Yup.string()
                                .email('Invalid email address')
                                .max(30, 'No more than 30 characters')
                                .required('Required'),

                            password: Yup.string()
                                .min(8, 'At least 8 characters')
                                .max(30, 'No more than 30 characters')
                                .required('Required'),
                        })}
                        onSubmit={(values, {setSubmitting, resetForm}) => {
                            (async () => {
                                await submit(values, setError, router);
                                setSubmitting(false);
                                resetForm();
                            })();
                        }}
                    >
                        {props => (
                            <SignUpForm>
                                <h1 className='sign-up-title'>Sign Up</h1>
                                <CustomTextInput label='First Name' name='firstName' type='text'
                                                 placeholder='First Name'/>
                                <CustomTextInput label='Last Name' name='lastName' type='text'
                                                 placeholder='Last Name'/>
                                <CustomTextInput label='Email' name='email' type='email'
                                                 placeholder='Email'/>
                                <CustomTextInput label='Password' name='password' type='password'
                                                 placeholder='Password'/>
                                <div className='sign-up-server-error'>{error}</div>
                                <CustomButton type='submit'>
                                    {props.isSubmitting ? 'Please Wait...' : 'Create Account'}
                                </CustomButton>
                            </SignUpForm>
                        )}
                    </Formik>
                    <div className='sign-up-already-account'>Already have an account?&nbsp;
                        <Link href={global.paths.login}>Log in</Link>
                    </div>
                </Content>
            </MainContainer>
        </>
    );
}

const CustomTextInput = ({label, ...props}: { [x: string]: any; name: string }) => {
    const [field, meta] = useField(props);

    return (
        <>
            {/*<label className='sign-up-label' htmlFor={props.id || props.name}>{label}</label>*/}
            <input className='sign-up-input' {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className='sign-up-form-error'>{meta.error}</div>
            ) : null}
        </>
    )
}

export default SignUp;

export const getServerSideProps = withSession(async function ({req, res}) {
    // If user exists, redirect to home
    const user = req.session.get('user');
    if (user) {
        return {
            redirect: {
                destination: global.paths.notes,
                permanent: false,
            },
        }
    }

    // Else return a user object with isLoggedIn as false
    return {props: {user: {isLoggedIn: false}}};
});