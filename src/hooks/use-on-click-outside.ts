import { useEffect } from 'react'

export const useOnClickOutside = (refs: any[], handler: (event: MouseEvent) => any) => {
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            for (const ref of refs) {
                if (!ref.current || ref.current.contains(event.target)) {
                    return
                }
            }
            handler(event)
        }
        document.addEventListener('mousedown', listener)
        return () => {
            document.removeEventListener('mousedown', listener)
        }
    }, [refs, handler])
}
