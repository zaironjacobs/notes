import Link from 'next/link'
import { BuiltBy, Content, GitHubIcon, GitHubIconWrapper } from '@components/Layout/Footer/FooterStyled'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import React from 'react'

export const Footer = () => {
    return (
        <Content>
            <GitHubIconWrapper>
                <Link href={'https://github.com/zaironjacobs'}>
                    <a target="_blank">
                        <GitHubIcon icon={faGithub} />
                    </a>
                </Link>
            </GitHubIconWrapper>

            <Link href={'https://zaironjacobs.com'}>
                <BuiltBy target="_blank">Built by Zairon Jacobs</BuiltBy>
            </Link>
        </Content>
    )
}
