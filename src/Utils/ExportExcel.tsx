import * as XLSX from "xlsx";
const exportToExcel = (data: any, filename: any) => {
  // console.log('get arrays>>', data);
  // console.log('get array length>>', data?.length);
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, filename);
  XLSX.writeFile(workbook, `${filename}.xlsx`);

}

export default exportToExcel;