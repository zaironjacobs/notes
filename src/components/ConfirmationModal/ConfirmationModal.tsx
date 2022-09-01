import { useRef } from 'react'
import { Button, ButtonsWrapper, Modal, Overlay, Text } from '@components/ConfirmationModal/ConfirmationModalStyled'
import { useOnClickOutside } from '@hooks/use-on-click-outside'

interface IPopupConfirmationProps {
    closeModal: () => void
    action: (...args: any) => any
    text: string
}

export const ConfirmationModal = ({ closeModal, action, text }: IPopupConfirmationProps) => {
    const modal = useRef<HTMLDivElement>(null)

    useOnClickOutside([modal], () => closeModal)

    // Exit
    function onNo() {
        closeModal()
    }

    // Run the action on confirmation
    async function onYes() {
        await action()
    }

    return (
        <Overlay>
            <Modal ref={modal}>
                <Text>{text}</Text>
                <ButtonsWrapper>
                    <Button onClick={onYes}>Yes</Button>
                    <Button onClick={onNo}>No</Button>
                </ButtonsWrapper>
            </Modal>
        </Overlay>
    )
}
