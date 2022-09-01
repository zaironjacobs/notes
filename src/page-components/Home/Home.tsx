import { useEffect } from 'react'
import { NextRouter, useRouter } from 'next/router'

export const Home = () => {
    const router: NextRouter = useRouter()
    useEffect(() => {
        router.push('/login').then()
    })

    return null
}
