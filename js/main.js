// Global
var dsnv = new DSNV();
getlocalStorage();

function getEle(id) {
    return document.getElementById(id);
};

//Lấy thông tin nhân viên
function layThongTinNV(){
    // Dom lay thong tin tu cac input
    var taiKhoan = getEle("tknv").value;
    var hoTen = getEle("name").value;
    var email = getEle("email").value;
    var matKhau = getEle("password").value;
    var ngayLam = getEle("datepicker").value;
    var luongCoBan = getEle("luongCB").value;
    var chucVu = getEle("chucvu").value;
    var gioLamTrongThang = getEle("gioLam").value;
    
    //Tạo đối tượng nv từ lớp đối tượng NhanVien
    var nv = new NhanVien(taiKhoan, hoTen, email, matKhau, ngayLam, luongCoBan, chucVu, gioLamTrongThang);
    nv.xepLoaiNV();
    nv.tinhTongLuong();
    return nv;
};

// In ra table
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
                <td>${nv.tongLuong}</td>
                <td>${nv.loaiNV}</td>
                <td>
                    <button class="btn btn-danger" onclick="xoaNV('${nv.taiKhoan}')">Xóa</button>
                    <button class="btn btn-info" onclick="suaNV('${nv.taiKhoan}')">Sửa</button>
                </td>
            </tr>
        `;
    }
    getEle("tableDanhSach").innerHTML = content;
}

function getlocalStorage(){
    if (localStorage.getItem("DSNV")){
        var dataString = localStorage.getItem("DSNV");
        var dataJSON = JSON.parse(dataString);
        dsnv.arr = dataJSON;
        renderTable(dsnv.arr);
    }
}
function setLocalStorage(){
    var dataString = JSON.stringify(dsnv.arr);
    localStorage.setItem("DSNV", dataString);
}

// Thêm nhân viên
function themNhanVien() {
	var nv = layThongTinNV();
	dsnv.themNV(nv);
	renderTable(dsnv.arr);
	setLocalStorage();
}

// Xóa nhân viên
function xoaNV(taiKhoan){
    dsnv._xoaNV(taiKhoan);
    renderTable(dsnv.arr);
    setLocalStorage();
}

// Sửa nhân viên
function suaNV(taiKhoan){
    var nv = dsnv.layThongTinChiTietNV(taiKhoan);
    if (nv){
        getEle("tknv").value = nv.taiKhoan;
        getEle("tknv").disabled = true;
		getEle("name").value = nv.hoTen;
		getEle("email").value = nv.email;
		getEle("password").value = nv.matKhau;
		getEle("datepicker").value = nv.ngayLam;
		getEle("luongCB").value = nv.luongCoBan;
		getEle("chucvu").value = nv.chucVu;
		getEle("gioLam").value = nv.gioLamTrongThang;
        getEle("btnCapNhat").style.display = "inline-block";
        getEle("btnThemNV").style.display = "none";
    }
}

// Cập nhật chỉnh sửa
getEle("btnCapNhat").onclick = function(){
    var nv = layThongTinNV();
    dsnv.capNhatNV(nv);
    renderTable(dsnv.arr);
    setLocalStorage();
};
