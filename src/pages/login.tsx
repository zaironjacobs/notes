import {SignUpForm, Content, SubmitButton} from '@style/LoginStyled';
import {
    MainContainer
} from '@style/LoginStyled';
import {Formik, useField} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import global from 'global';
import Link from "next/link";


const submit = async (values) => {
    await axios.post(global.apiRoutes.login, {
        email: values.email,
        password: values.password
    })
        .then(function (response) {
            // On success
        })
        .catch(function (error) {
            // On error
        });
}


const CustomTextInput = ({label, ...props}: { [x: string]: any; name: string }) => {
    const [field, meta] = useField(props);

    return (
        <>
            {/*<label className='login-label' htmlFor={props.id || props.name}>{label}</label>*/}
            <input className='login-input' {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className='login-error'>{meta.error}</div>
            ) : null}
        </>
    )
}


const Login = () => {
    return (
        <>
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
                                .required('Required'),

                            password: Yup.string()
                                .min(8, 'At least 8 characters')
                                .max(35, 'No more than 35 characters')
                                .required('Required'),
                        })}
                        onSubmit={(values, {setSubmitting, resetForm}) => {
                            setTimeout(async () => {
                                await submit(values);
                                resetForm();
                                setSubmitting(false);
                            }, 1000);
                        }}
                    >
                        {props => (
                            <SignUpForm>
                                <h1 className='login-title'>Sign In</h1>
                                <CustomTextInput label='Email' name='email' type='email'
                                                 placeholder='Email'/>
                                <CustomTextInput label='Password' name='password' type='password'
                                                 placeholder='Password'/>
                                <SubmitButton
                                    type='submit'>{props.isSubmitting ? 'Please Wait...' : 'Sign In'}
                                </SubmitButton>
                            </SignUpForm>
                        )}
                    </Formik>
                    <span className='login-no-account'>Don't have an account?&nbsp;
                        <Link href={global.paths.signUp}>Sign up</Link>
                </span>
                </Content>
            </MainContainer>
        </>
    );
}

export default Login;