import {useEffect} from 'react';
import {NextRouter, useRouter} from 'next/router';
import global from 'global';


const Index = () => {
    const router: NextRouter = useRouter();
    useEffect(() => {
        router.push(global.paths.login);
    }, []);

    return (
        <></>
    )
}

export default Index;