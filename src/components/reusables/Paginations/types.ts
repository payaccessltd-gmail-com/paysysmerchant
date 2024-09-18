export type DefaultPaginationType = {
    styles?: any; 
    changePage?: ((arg: any) => any) | undefined; 
    totalPages?: any; 
    totalValue?: any; 
    currentPage: number
}