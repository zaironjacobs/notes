import { Button, NotFoundCode, NotFoundText, Wrapper } from '@page-components/Custom404/Custom404Styled'
import Head from 'next/head'
import { global } from '@global'
import Link from 'next/link'

export const Custom404 = () => {
    return (
        <>
            <Head>
                <title>{`404 – ${global.siteName}`}</title>
                <meta name="description" content="Page not found" />
            </Head>
            <Wrapper>
                <NotFoundCode>404</NotFoundCode>
                <NotFoundText>Page Not Found</NotFoundText>
            </Wrapper>
            <Button>
                <Link href={'/login'}>
                    <a>🡠 Notes</a>
                </Link>
            </Button>
        </>
    )
}
