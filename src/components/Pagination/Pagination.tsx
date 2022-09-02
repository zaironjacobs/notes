import { BoxInner, BoxNext, BoxPrevious, Wrapper } from '@components/Pagination/PaginationStyled'
import React, { Dispatch, SetStateAction } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGreaterThan, faLessThan } from '@fortawesome/free-solid-svg-icons'

interface IPaginationBox {
    page: number | string | null
    isActive: boolean
}

interface IPaginationProps {
    currentPage: number
    totalPages: number
    setCurrentPage: Dispatch<SetStateAction<number>>
}

export const Pagination = ({ currentPage, totalPages, setCurrentPage }: IPaginationProps) => {
    const backIsEnabled = !Boolean(currentPage === 1)
    const nextIsEnabled = !Boolean(currentPage === totalPages)

    // Create pagination boxes
    let boxes: IPaginationBox[] = []
    for (let index = 0; index < 9; index++) {
        boxes[index] = {
            page: null,
            isActive: false,
        }
    }

    // No pages
    if (totalPages < 1 || currentPage > totalPages) {
        return (
            <Wrapper>
                <BoxPrevious backIsEnabled={false}>
                    <FontAwesomeIcon icon={faLessThan} />
                </BoxPrevious>
                <BoxInner active={false} isNaN={true}>
                    1
                </BoxInner>
                <BoxNext nextIsEnabled={false}>
                    <FontAwesomeIcon icon={faGreaterThan} />
                </BoxNext>
            </Wrapper>
        )
    }

    // If the total pages are less than or equal to 5
    if (totalPages <= 5) {
        for (let index = 0; index < totalPages; index++) {
            boxes[index].page = index + 1
            if (boxes[index].page === currentPage) {
                boxes[index].isActive = true
            }
        }
    }

    // If the total pages are bigger than 5
    else {
        // If pages between page 1 and page 5 are current
        if (currentPage <= 5) {
            for (let index = 0; index < 5; index++) {
                boxes[index].page = index + 1
                if (boxes[index].page === currentPage) {
                    boxes[index].isActive = true
                }
            }
            boxes[5].page = '...'
            boxes[6].page = totalPages
        }

        // If the last page minus 1 is current
        else if (currentPage == totalPages - 1) {
            boxes[0].page = 1
            boxes[1].page = '..'
            let page = currentPage - 3
            for (let index = 0; index < 5; index++) {
                boxes[index + 2].page = page
                page++
                if (boxes[index + 2].page === currentPage) {
                    boxes[index + 2].isActive = true
                }
            }
        }

        // If pages between page 6 and the last page minus two are current
        else if (currentPage >= 6 && currentPage <= totalPages - 2) {
            boxes[0].page = 1
            boxes[1].page = '..'
            let page = currentPage - 1
            for (let index = 0; index < 5; index++) {
                boxes[index + 2].page = page
                page++
                if (boxes[index + 2].page == currentPage) {
                    boxes[index + 2].isActive = true
                }
            }
            boxes[5].page = '...'
            boxes[6].page = totalPages
        }

        // If the last 2 pages are current
        else {
            boxes[0].page = 1
            boxes[1].page = '..'
            let page = currentPage - (5 - 1)
            for (let index = 0; index < 5; index++) {
                boxes[index + 2].page = page
                page++
                if (boxes[index + 2].page == currentPage) {
                    boxes[index + 2].isActive = true
                }
            }
        }
    }

    // Go to previous page
    function goToPrevious() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    // Go to next page
    function goToNext() {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    // Set current page
    function setPage(page: string | number | null) {
        if (typeof page === 'number') {
            setCurrentPage(page as number)
        }
    }

    function checkIfPageIsNaN(page: string | number | null) {
        return typeof page !== 'number'
    }

    return (
        <Wrapper>
            <BoxPrevious backIsEnabled={backIsEnabled} onClick={goToPrevious}>
                <FontAwesomeIcon icon={faLessThan} />
            </BoxPrevious>
            {boxes[0].page && (
                <BoxInner active={boxes[0].isActive} isNaN={false} onClick={() => setPage(boxes[0].page)}>
                    {boxes[0].page}
                </BoxInner>
            )}
            {boxes[1].page && (
                <BoxInner
                    active={boxes[1].isActive}
                    isNaN={checkIfPageIsNaN(boxes[1].page)}
                    onClick={() => setPage(boxes[1].page)}
                >
                    {boxes[1].page}
                </BoxInner>
            )}
            {boxes[2].page && (
                <BoxInner active={boxes[2].isActive} isNaN={false} onClick={() => setPage(boxes[2].page)}>
                    {boxes[2].page}
                </BoxInner>
            )}
            {boxes[3].page && (
                <BoxInner active={boxes[3].isActive} isNaN={false} onClick={() => setPage(boxes[3].page)}>
                    {boxes[3].page}
                </BoxInner>
            )}
            {boxes[4].page && (
                <BoxInner active={boxes[4].isActive} isNaN={false} onClick={() => setPage(boxes[4].page)}>
                    {boxes[4].page}
                </BoxInner>
            )}
            {boxes[5].page && (
                <BoxInner
                    active={boxes[5].isActive}
                    isNaN={checkIfPageIsNaN(boxes[5].page)}
                    onClick={() => setPage(boxes[5].page)}
                >
                    {boxes[5].page}
                </BoxInner>
            )}
            {boxes[6].page && (
                <BoxInner active={boxes[6].isActive} isNaN={false} onClick={() => setPage(boxes[6].page)}>
                    {boxes[6].page}
                </BoxInner>
            )}
            {boxes[7].page && (
                <BoxInner
                    active={boxes[7].isActive}
                    isNaN={checkIfPageIsNaN(boxes[7].page)}
                    onClick={() => setPage(boxes[7].page)}
                >
                    {boxes[7].page}
                </BoxInner>
            )}
            {boxes[8].page && (
                <BoxInner active={boxes[8].isActive} isNaN={false} onClick={() => setPage(boxes[8].page)}>
                    {boxes[8].page}
                </BoxInner>
            )}
            <BoxNext nextIsEnabled={nextIsEnabled} onClick={goToNext}>
                <FontAwesomeIcon icon={faGreaterThan} />
            </BoxNext>
        </Wrapper>
    )
}
