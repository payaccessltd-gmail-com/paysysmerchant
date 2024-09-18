import React, { useState } from "react";
import DefaultPagination from "../Paginations/Default";

export interface TableProps {
  header: any;
  totalPages?: number;
  totalValue?: number;
  currentPage?: number;
  onHandleAllCheckbox?: (arg: any) => void;
  onHandleDelete?: (arg: any) => void;
  onHandlePrompt?: (arg: any) => void;
  tableBody: any;
  isLoading?: boolean;
  showPrompt?: boolean;
  showDelete?: boolean;
  showRestore?: boolean;
  onHeaderClick?: (value: any) => void;
  changePage?: (num: number) => void;
  hasPagination?: boolean;
  showCheckBox?: boolean;
  list?: any;
  name?: string;
  tableVariants?: string;
  noData?: boolean;
  onCheck?: (value: any) => void;
}

const DefaultTable = ({
  header,
  tableBody,
  onHandleAllCheckbox,
  onHandleDelete,
  onHandlePrompt,
  showDelete = true,
  showRestore = false,
  showPrompt = false,
  isLoading = false,
  totalPages = 0,
  totalValue = 0,
  currentPage = 0,
  hasPagination = true,
  showCheckBox = true,
  changePage = () => null,
  list = [],
  name = "",
  tableVariants = "",
  noData = false,
}: TableProps) => {
  const [temp, setTemp] = useState<any>({
    totalPages: 10,
    currentPage: 0,
  });

  const changeCurrentPage = (data: any) => {
    // console.log(data)
    changePage(data.selected);
  };

  return (
    <>
      <div className={`bg-white rounded mt-5`}>
        <div className=" min-h-fit overflow-x-auto">
          <table className="table-auto scrollbar-hide w-full max-w-[100vw]">
            <thead>
              <tr className="text-xs text-white font-300 text-[16px]  bg-[#0C394B] px-[10px] rounded-lg">
                {header?.map(
                  (
                    title:any,
                    index: any
                  ) => (
                    <th
                      key={`header-${title}-${index}`}
                      className={`font-600 py-5 px-6 text-white ${title.variant} `}
                      style={title?.headerStyle || {}}
                    >
                      <p className={`${title.innerVariant} `}>{title}</p>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="px-2">
              {/* Get the custom body component here */}
              {tableBody}
            </tbody>
          </table>
          {isLoading && "Loading..."}
          {noData && (
            <div className="my-14 flex flex-col justify-center items-center">
              <div className="flex flex-col justify-center items-center mb-4">
                'No data'
              </div>
            </div>
          )}
        </div>
        <div>
          {hasPagination && (
            <DefaultPagination
              changePage={changeCurrentPage}
              totalPages={totalPages || 1}
              totalValue={totalValue || 0}
              currentPage={currentPage || 0}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default DefaultTable;
