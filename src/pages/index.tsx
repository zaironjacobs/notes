import {useEffect} from 'react';
import {useRouter} from 'next/router';
import global from 'global';


const Index = () => {
    const router = useRouter();
    useEffect(() => {
        router.push(global.paths.login);
    }, []);

    return (
        <></>
    )
}

export default Index;
