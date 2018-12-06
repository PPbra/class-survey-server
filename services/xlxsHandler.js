var XLSX = require('xlsx');

// var workbook = XLSX.readFile('ds_tai_khoan_sinh_vien.xlsx');

// var workbook = XLSX.readFile('ds_tai_khoan_canbo.xlsx');

// console.log(XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]));

module.exports = {
    hanlde: (filename) => {
        var workbook = XLSX.readFile(filename);

        var worksheet = workbook.Sheets['DSLMH'];

        var id = worksheet['C9'].v;
        var name = worksheet['C10'].v;
        var count_credit = worksheet['F9'].v;
        var place = worksheet['F8'].v;
        var students = [];
        var teacher = {
            id: worksheet['E7'].v,
            name: worksheet['C7'].v
        }

        var headers = {
            '0': 'stt',
            '1': 'id',
            '2': 'name',
            '3': 'date_of_birth',
            '4': 'base_class',
            '5': 'note'
        }

        for (let R = 11; ; R++) {
            if (worksheet[XLSX.utils.encode_cell({ c: 0, r: R })]) {
                for (let C = 0; C <= 4; C++) {
                    let cell_addr = { c: C, r: R };

                    if (!students[R - 10])
                        students[R - 10] = {};

                    students[R - 10][headers[C]] = worksheet[XLSX.utils.encode_cell(cell_addr)].v;
                }
            } else break;

        }

        students.shift();

        var result = {
            id: id,
            name: name,
            teacher: teacher,
            count_credit: count_credit,
            place: place,
            students: students
        };

        return result;

    }
}

