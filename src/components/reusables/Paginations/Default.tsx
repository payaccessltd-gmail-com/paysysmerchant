import { DefaultPaginationType } from "./types"
import ReactPaginate from 'react-paginate';

function DefaultPagination({ styles, changePage, totalPages, totalValue, currentPage }: DefaultPaginationType) {

    return (
        <div className='px-5 mt-5 w-full flex flex-col xs:flex-row xs:items-center xs:justify-between justify-start gap-3'>
            <div className='w-fit h-full p-3 border border-blue-light rounded-lg flex flex-row gap-2'>
                number<span className='text-gray-600'>{`${totalValue} Record(s)`}</span>
            </div>
            <div className={`pagination ${styles} justify-center border border-blue-light rounded-lg w-fit`} /*style={content.length > 0?{display : "block", paddingTop : "10px"}:{display : "none"}}*/>
                <ReactPaginate
                    previousLabel={
                        <>
                            <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.2 1.9L5.83784 0.5L0 6.5L5.83784 12.5L7.2 11.1L2.72432 6.5L7.2 1.9Z" fill="#717E95" />
                            </svg>
                        </>
                    }
                    nextLabel={
                        <><svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.199904 11.1L1.56207 12.5L7.3999 6.5L1.56207 0.499999L0.199904 1.9L4.67558 6.5L0.199904 11.1Z" fill="#717E95" />
                        </svg>
                        </>
                    }
                    breakLabel={'...'}
                    pageCount={totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    forcePage={currentPage}
                    onPageChange={changePage}
                    activeLinkClassName={'text-primary-white bg-primary-blue block'}
                    activeClassName={'block xxs:block sm:block border border-blue-light'}
                    previousClassName={'text-gray-light w-2/5 text-left pt-[3.5px]'}
                    disabledLinkClassName={'text-gray-900 opacity-25'}
                    previousLinkClassName={"relative inline-flex items-center rounded-l-md bg-white px-2 py-2 2xl:mr-4/5 text-sm font-medium text-gray-500 hover:text-gray-700 focus:z-20"}
                    nextClassName={'text-gray-light w-2/5 text-right pt-[3.5px]'}
                    nextLinkClassName={"relative inline-flex items-center rounded-r-md bg-white px-2 py-2 2xl:ml-4/5 text-sm font-medium text-gray-500 hover:text-gray-700 focus:z-20"}
                    pageClassName={'text-gray-600 hidden sm:block'}
                    pageLinkClassName={' relative z-10 inline-flex items-center px-6 py-2 text-sm font-medium focus:z-20 hover:text-blue-200 '}
                    breakClassName={'text-gray-light hidden sm:block'}
                    breakLinkClassName={'relative z-10 inline-flex items-center px-6 py-2 text-sm font-medium focus:z-20'}
                    containerClassName={"isolate w-full inline-flex -space-x-px justify-between rounded-md px-2"}
                />
            </div>
        </div>
    )
}

export default DefaultPagination