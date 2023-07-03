// Global
var dsnv = new DSNV();
function getEle(id) {
    return document.getElementById(id);
};

function layThongTinNV(){
    // Dom lay thong tin tu cac input
    var taiKhoan = getEle("tknv").value;
    var hoTen = getEle("name").value;
    var email = getEle("email").value;
    var matKhau = getEle("password").value;
    var ngayLam = getEle("datepicker").value;
    var luongCoBan = getEle("luongCB").value;
    var chucVu = getEle("chucvu").value;
    var gioLamTrongNgay = getEle("gioLam").value;
    
    //Tạo đối tượng nv từ lớp đối tượng NhanVien
    var nv = new NhanVien(taiKhoan, hoTen, email, matKhau, ngayLam, luongCoBan, chucVu, gioLamTrongNgay);
    // console.log(nv);
    // nv.xepLoaiNV();

    // console.log("123");
    // console.log(nv.hoTen);
    return nv;
};

function renderTable(data){
    var content = "";
    for (var i = 0; i<data.length; i++){
        var nv = data[i];
        content += `
            <tr>
                <td>${nv.taiKhoan}</td>
                <td>${nv.hoTen}</td>
                <td>${nv.email}</td>
                <td>${nv.ngayLam}</td>
                <td>${nv.chucVu}</td>
            </tr>
        `;
    }
    getEle("tableDanhSach").innerHTML = content;
}

function themNhanVien(){
    var nv = layThongTinNV();
    dsnv.themNV(nv);
    renderTable(dsnv.arr);
}