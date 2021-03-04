import {SignUpForm, Content, SubmitButton} from '@style/SignUpStyled';
import {
    MainContainer
} from '@style/SignUpStyled';
import {Formik, useField} from 'formik';
import Link from 'next/link';
import * as Yup from 'yup';
import axios from 'axios';
import global from 'global';


const submit = async (values) => {
    await axios.post(global.apiRoutes.signUp, {
        firstName: values.firstName,
        lastName: values.lastName,
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
            {/*<label className='sign-up-label' htmlFor={props.id || props.name}>{label}</label>*/}
            <input className='sign-up-input' {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className='sign-up-error'>{meta.error}</div>
            ) : null}
        </>
    )
}


const SignUp = () => {
    return (
        <>
            <MainContainer>
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
                                .max(15, 'No more than 15 characters')
                                .required('Required'),

                            lastName: Yup.string()
                                .min(3, 'At least 3 characters')
                                .max(15, 'No more than 15 characters')
                                .required('Required'),

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
                                <h1 className='sign-up-title'>Sign Up</h1>
                                <CustomTextInput label='First Name' name='firstName' type='text'
                                                 placeholder='First Name'/>
                                <CustomTextInput label='Last Name' name='lastName' type='text'
                                                 placeholder='Last Name'/>
                                <CustomTextInput label='Email' name='email' type='email'
                                                 placeholder='Email'/>
                                <CustomTextInput label='Password' name='password' type='password'
                                                 placeholder='Password'/>
                                <SubmitButton
                                    type='submit'>{props.isSubmitting ? 'Please Wait...' : 'Create Account'}
                                </SubmitButton>
                            </SignUpForm>
                        )}
                    </Formik>
                    <span className='sign-up-already-account'>Already have an account?&nbsp;
                        <Link href={global.paths.login}>Log in</Link>
                </span>
                </Content>
            </MainContainer>
        </>
    );
}

export default SignUp;