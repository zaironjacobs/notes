import React, {useState} from 'react';
import {NextRouter, useRouter} from 'next/router';
import {CustomButton} from '@component/CustomButton';
import {SignUpForm, Content} from '@style/SignUpStyled';
import {Main} from '@style/SignUpStyled';
import {Formik, useField} from 'formik';
import Link from 'next/link';
import * as Yup from 'yup';
import axios, {AxiosResponse} from 'axios';
import global from 'global';
import withSession from '@lib/session';
import Menu from '@component/Menu';
import Header from '@component/Header';
import Head from 'next/head';
import Footer from '@component/Footer';
import UserInterface from '@interface/User';


const SignUp = (props) => {
    const router: NextRouter = useRouter();
    const [error, setError] = useState<string>('');

    const submitForm = async (values) => {
        if (values.password !== values.repeatPassword) {
            setError('Passwords do not match');
            return Promise.reject();
        }
        await signupPromise(values)
            .then((response: AxiosResponse) => {
                setError('');
                router.push(global.paths.notes);
            })
            .catch((error: any) => {
                setError(error.response.data.message);
                return Promise.reject();
            });
    };

    // Signup promise
    const signupPromise = (values) => {
        return axios.post(global.api.signUp, {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
            repeatPassword: values.repeatPassword
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
                    <title>Signup – {global.siteName}</title>
                </Head>
                <Content>
                    <Formik
                        initialValues={{
                            firstName: '',
                            lastName: '',
                            email: '',
                            password: '',
                            repeatPassword: ''
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
                                .max(128, 'No more than 128 characters')
                                .required('Required'),

                            repeatPassword: Yup.string()
                                .min(8, 'At least 8 characters')
                                .max(128, 'No more than 128 characters')
                                .required('Required')
                        })}
                        onSubmit={(values, {setSubmitting}) => {
                            (async () => {
                                await submitForm(values)
                                    .then(() => {
                                        setSubmitting(false);
                                    })
                                    .catch(() => {
                                        setSubmitting(false);
                                    });
                            })();
                        }}
                    >
                        {props => (
                            <SignUpForm>
                                <h1 className='sign-up-title'>Sign Up</h1>
                                <CustomTextInput label='First Name' name='firstName' type='text'
                                                 placeholder='First Name' maxLength={30}/>
                                <CustomTextInput label='Last Name' name='lastName' type='text'
                                                 placeholder='Last Name' maxLength={30}/>
                                <CustomTextInput label='Email' name='email' type='email'
                                                 placeholder='Email' maxLength={30}/>
                                <CustomTextInput label='Password' name='password' type='password'
                                                 placeholder='Password' maxLength={128}/>
                                <CustomTextInput label='Repeat password' name='repeatPassword' type='password'
                                                 placeholder='Repeat password' maxLength={128}/>
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
            {/*<label className='sign-up-label' htmlFor={props.id || props.name}>{label}</label>*/}
            <input className='sign-up-input' {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className='sign-up-form-error'>{meta.error}</div>
            ) : null}
        </>
    )
}

export default SignUp;

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