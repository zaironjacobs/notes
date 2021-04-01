import {SignUpForm, Content} from '@style/LoginStyled';
import {CustomButton} from '@component/CustomButton';
import {NextRouter, useRouter} from 'next/router';
import {Main} from '@style/LoginStyled';
import {Formik, useField} from 'formik';
import * as Yup from 'yup';
import axios, {AxiosResponse} from 'axios';
import global from 'global';
import Link from 'next/link';
import React, {useState} from 'react';
import withSession from '@lib/session';
import Menu from '@component/Menu';
import Header from '@component/Header';
import Head from 'next/head';
import Footer from '@component/Footer';
import UserInterface from '@interface/User';


const Login = (props) => {
    const router: NextRouter = useRouter();
    const [error, setError] = useState<string>('');

    const submit = async (values, setError, router) => {
        await submitLoginPromise(values)
            .then((response: AxiosResponse) => {
                setError('');
                router.push(global.paths.notes);
            })
            .catch((error) => {
                setError(error.response.data.message);
            });
    };

    // submitLogin promise
    const submitLoginPromise = (values) => {
        return axios.post(global.api.login, {
            email: values.email,
            password: values.password
        });
    }

    return (
        <>
            {/* Menu */}
            <div ref={props.menuNode}>
                <Menu menuOpen={props.menuOpen} setMenuOpen={props.setMenuOpen} user={props.user}/>
            </div>

            {/* Header */}
            <Header menuOpen={props.menuOpen} setMenuOpen={props.setMenuOpen}/>

            {/* Main */}
            <Main>
                <Head>
                    <title>Login – {global.siteName}</title>
                </Head>
                <Content>
                    <Formik
                        initialValues={{
                            email: process.env.NEXT_PUBLIC_DEMO_EMAIL || '',
                            password: process.env.NEXT_PUBLIC_DEMO_PASSWORD || ''
                        }}
                        validationSchema={Yup.object({
                            email: Yup.string()
                                .email('Invalid email address')
                                .max(30, 'No more than 30 characters')
                                .required('Required'),

                            password: Yup.string()
                                .min(8, 'At least 8 characters')
                                .max(128, 'No more than 128 characters')
                                .required('Required'),
                        })}
                        onSubmit={(values, {setSubmitting}) => {
                            (async () => {
                                await submit(values, setError, router);
                                setSubmitting(false);
                            })();
                        }}
                    >
                        {props => (
                            <SignUpForm>
                                <h1 className='login-title'>Sign In</h1>
                                <CustomTextInput label='Email' name='email' type='email'
                                                 placeholder='Email' maxLength={30}/>
                                <CustomTextInput label='Password' name='password' type='password'
                                                 placeholder='Password' maxLength={128}/>
                                <div className='login-server-error'>{error}</div>
                                <CustomButton type='submit'>
                                    {props.isSubmitting ? 'Please Wait...' : 'Sign In'}
                                </CustomButton>
                            </SignUpForm>
                        )}
                    </Formik>
                    <div className='login-no-account'>Don't have an account?&nbsp;
                        <Link href={global.paths.signUp}>Sign up</Link>
                    </div>
                </Content>
            </Main>

            {/* Footer */}
            <Footer/>
        </>
    );
}

const CustomTextInput = ({label, ...props}: { [x: string]: any; name: string }) => {
    const [field, meta] = useField(props);

    return (
        <>
            {/*<label className='login-label' htmlFor={props.id || props.name}>{label}</label>*/}
            <input className='login-input' {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className='login-form-error'>{meta.error}</div>
            ) : null}
        </>
    )
}

export default Login;

export const getServerSideProps = withSession(async ({req, res}) => {
    // If user exists, redirect to home
    const user: UserInterface = req.session.get('user');
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