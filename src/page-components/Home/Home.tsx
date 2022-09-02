import { useEffect } from 'react'
import { useRouter } from 'next/router'

export const Home = () => {
    const router = useRouter()

    useEffect(() => {
        router.push('/login').then()
    })

    return null
}
