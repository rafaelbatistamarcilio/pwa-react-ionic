import * as XLSX from 'xlsx';

export const excelToJson = file => {
    return new Promise((resolve, reject)=>{
        const arquivo = file;
        const reader = new FileReader();
        reader.onload = event => {
            const data = toJson(event);
            resolve(data);
        }
        reader.readAsArrayBuffer(arquivo)
    })
}

const toJson = dados => {
    const ws = XLSX.read(new Uint8Array(dados.target.result), { type: 'array' });
    const sheetName = ws.SheetNames[0];
    const json = XLSX.utils.sheet_to_json(ws.Sheets[sheetName], { raw: false });
    return json;
}