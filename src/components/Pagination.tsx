import {Content} from '@style/PaginationStyled';
import PaginationBoxInterface from '@interfaces/PaginationBox';
import {useState, useEffect} from 'react';


const Pagination = (props) => {
    const currentPage: number = props.currentPage;
    const totalPages: number = props.totalPages;
    const setCurrentPage = props.setCurrentPage;

    const [enableBack, setEnableBack] = useState(false);
    const [enableNext, setEnableNext] = useState(false);

    // Enable or disable back
    useEffect(() => {
        if (currentPage == 1) {
            setEnableBack(false);
        } else {
            setEnableBack(true);
        }
    }, [currentPage == 1]);

    // Enable or disable next
    useEffect(() => {
        if (currentPage == totalPages) {
            setEnableNext(false);
        } else {
            setEnableNext(true);
        }
    }, [currentPage == totalPages]);

    // Create pagination boxes
    let paginationBoxes: PaginationBoxInterface[] = [];
    for (let index = 0; index < 9; index++) {
        paginationBoxes[index] = {
            page: null,
            isActive: false,
            isNaN: false
        };
    }

    // Invalid state
    if (totalPages < 1 || currentPage > totalPages) {
        return (
            <>
                <Content>
                    <div className='box first-child disabled-x-than'>
                        <i className='fas fa-less-than'/>
                    </div>
                    <div className='box isNaN'>1</div>
                    <div className='box first-child disabled-x-than'>
                        <i className='fas fa-greater-than'/>
                    </div>
                </Content>
            </>
        );
    }

    // If the total pages are less than or equal to 5
    if (totalPages <= 5) {
        for (let index = 0; index < totalPages; index++) {
            paginationBoxes[index].page = index + 1;
            if (paginationBoxes[index].page == currentPage) {
                paginationBoxes[index].isActive = true;
            }
        }
    }

    // If the total pages are bigger than 5
    else {

        // If pages between page 1 and page 5 are current
        if (currentPage <= 5) {
            for (let index = 0; index < 5; index++) {
                paginationBoxes[index].page = index + 1;
                if (paginationBoxes[index].page == currentPage) {
                    paginationBoxes[index].isActive = true;
                }
            }
            paginationBoxes[5].page = '...';
            paginationBoxes[5].isNaN = true;
            paginationBoxes[6].page = totalPages;
        }

        // If the last page minus 1 is current
        else if (currentPage == totalPages - 1) {
            paginationBoxes[0].page = 1;
            paginationBoxes[1].page = '..';
            paginationBoxes[1].isNaN = true;
            let page = currentPage - 3;
            for (let index = 0; index < 5; index++) {
                paginationBoxes[index + 2].page = page;
                page++;
                if (paginationBoxes[index + 2].page == currentPage) {
                    paginationBoxes[index + 2].isActive = true;
                }
            }
        }

        // If pages between page 6 and the last page minus two are current
        else if (currentPage >= 6 && currentPage <= (totalPages - 2)) {
            paginationBoxes[0].page = 1;
            paginationBoxes[1].page = '..';
            paginationBoxes[1].isNaN = true;
            let page = currentPage - 1;
            for (let index = 0; index < 5; index++) {
                paginationBoxes[index + 2].page = page;
                page++;
                if (paginationBoxes[index + 2].page == currentPage) {
                    paginationBoxes[index + 2].isActive = true;
                }
            }
            paginationBoxes[5].page = '...';
            paginationBoxes[5].isNaN = true;
            paginationBoxes[6].page = totalPages;
        }

        // If the last 2 pages are current
        else {
            paginationBoxes[0].page = 1;
            paginationBoxes[1].page = '..';
            paginationBoxes[1].isNaN = true;
            let page = currentPage - (5 - 1);
            for (let index = 0; index < 5; index++) {
                paginationBoxes[index + 2].page = page;
                page++;
                if (paginationBoxes[index + 2].page == currentPage) {
                    paginationBoxes[index + 2].isActive = true;
                }
            }
        }
    }

    // Go to previous page
    const previous = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    // Go to next page
    const next = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    return (
        <>
            <Content>
                <div
                    className={`box first-child ${enableBack ? '' : 'disabled-x-than'}`}
                    onClick={previous}>
                    <i className='fas fa-less-than'/>
                </div>
                {paginationBoxes[0].page &&
                <div className={`box ${paginationBoxes[0].isActive ? 'active' : ''}`}
                     onClick={() => {
                         typeof paginationBoxes[0].page == 'number' && props.setCurrentPage(paginationBoxes[0].page)
                     }}>{paginationBoxes[0].page}</div>
                }
                {paginationBoxes[1].page &&
                <div className={`box 
                ${paginationBoxes[1].isActive ? 'active' : ''}
                ${paginationBoxes[1].isNaN ? 'isNaN' : ''}`}
                     onClick={() => {
                         typeof paginationBoxes[1].page == 'number' && props.setCurrentPage(paginationBoxes[1].page)
                     }}>{paginationBoxes[1].page}</div>
                }
                {paginationBoxes[2].page &&
                <div className={`box ${paginationBoxes[2].isActive ? 'active' : ''}`}
                     onClick={() => {
                         typeof paginationBoxes[2].page == 'number' && props.setCurrentPage(paginationBoxes[2].page)
                     }}>{paginationBoxes[2].page}</div>
                }
                {paginationBoxes[3].page &&
                <div className={`box ${paginationBoxes[3].isActive ? 'active' : ''}`}
                     onClick={() => {
                         typeof paginationBoxes[3].page == 'number' && props.setCurrentPage(paginationBoxes[3].page)
                     }}>{paginationBoxes[3].page}</div>
                }
                {paginationBoxes[4].page &&
                <div className={`box ${paginationBoxes[4].isActive ? 'active' : ''}`}
                     onClick={() => {
                         typeof paginationBoxes[4].page == 'number' && props.setCurrentPage(paginationBoxes[4].page)
                     }}>{paginationBoxes[4].page}</div>
                }
                {paginationBoxes[5].page &&
                <div className={`box 
                ${paginationBoxes[5].isActive ? 'active' : ''}
                ${paginationBoxes[5].isNaN ? 'isNaN' : ''}`}
                     onClick={() => {
                         typeof paginationBoxes[5].page == 'number' && props.setCurrentPage(paginationBoxes[5].page)
                     }}>{paginationBoxes[5].page}</div>
                }
                {paginationBoxes[6].page &&
                <div className={`box ${paginationBoxes[6].isActive ? 'active' : ''}`}
                     onClick={() => {
                         typeof paginationBoxes[6].page == 'number' && props.setCurrentPage(paginationBoxes[6].page)
                     }}>{paginationBoxes[6].page}</div>
                }
                {paginationBoxes[7].page &&
                <div className={`box 
                ${paginationBoxes[7].isActive ? 'active' : ''} 
                ${paginationBoxes[7].isNaN ? 'isNaN' : ''}`}
                     onClick={() => {
                         typeof paginationBoxes[7].page == 'number' && props.setCurrentPage(paginationBoxes[7].page)
                     }}>{paginationBoxes[7].page}</div>
                }
                {paginationBoxes[8].page &&
                <div className={`box ${paginationBoxes[8].isActive ? 'active' : ''}`}
                     onClick={() => {
                         typeof paginationBoxes[8].page == 'number' && props.setCurrentPage(paginationBoxes[8].page)
                     }}>{paginationBoxes[8].page}</div>
                }
                <div
                    className={`box last-child ${enableNext ? '' : 'disabled-x-than'}`}
                    onClick={next}>
                    <i className='fas fa-greater-than'/>
                </div>
            </Content>
        </>
    );
}

export default Pagination;