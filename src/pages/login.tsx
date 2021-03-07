import {SignUpForm, Content, SubmitButton} from '@style/LoginStyled';
import {useRouter} from 'next/router';
import {
    MainContainer
} from '@style/LoginStyled';
import {Formik, useField} from 'formik';
import * as Yup from 'yup';
import axios, {AxiosResponse} from 'axios';
import global from 'global';
import Link from 'next/link';
import {useState} from 'react';
import withSession from '@lib/session';
import Menu from '@component/Menu';
import Header from '@component/Header';


const Login = (props) => {
    const router = useRouter();
    const [error, setError] = useState('');

    const submit = async (values, setError, router) => {
        await axios.post(global.api.login, {
            email: values.email,
            password: values.password
        })
            .then(function (response: AxiosResponse) {
                setError('');
                router.push(global.paths.home);
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
                <Content>
                    <Formik
                        initialValues={{
                            email: '',
                            password: ''
                        }}
                        validationSchema={Yup.object({
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
                                resetForm();
                                setSubmitting(false);
                            })();
                        }}
                    >
                        {props => (
                            <SignUpForm>
                                <h1 className='login-title'>Sign In</h1>
                                <CustomTextInput label='Email' name='email' type='email'
                                                 placeholder='Email'/>
                                <CustomTextInput label='Password' name='password' type='password'
                                                 placeholder='Password'/>
                                <div className='login-server-error'>{error}</div>
                                <SubmitButton
                                    type='submit'>{props.isSubmitting ? 'Please Wait...' : 'Sign In'}
                                </SubmitButton>
                            </SignUpForm>
                        )}
                    </Formik>
                    <div className='login-no-account'>Don't have an account?&nbsp;
                        <Link href={global.paths.signUp}>Sign up</Link>
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
            {/*<label className='login-label' htmlFor={props.id || props.name}>{label}</label>*/}
            <input className='login-input' {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className='login-form-error'>{meta.error}</div>
            ) : null}
        </>
    )
}

export default Login;

export const getServerSideProps = withSession(async function ({req, res}) {
    // If user exists, redirect to home
    const user = req.session.get('user');
    if (user) {
        return {
            redirect: {
                destination: global.paths.home,
                permanent: false,
            },
        }
    }

    // Else return a user object with isLoggedIn as false
    return {props: {user: {isLoggedIn: false}}};
});