// Global
var dsnv = new DSNV();
var validation = new Validation();
getlocalStorage();

function getEle(id) {
    return document.getElementById(id);
};

//Lấy thông tin nhân viên
function layThongTinNV(isAdd){
    // Dom lay thong tin tu cac input
    var taiKhoan = getEle("tknv").value;
    var hoTen = getEle("name").value;
    var email = getEle("email").value;
    var matKhau = getEle("password").value;
    var ngayLam = getEle("datepicker").value;
    var luongCoBan = getEle("luongCB").value;
    var chucVu = getEle("chucvu").value;
    var gioLamTrongThang = getEle("gioLam").value;

    var isValid = true;

        // add nv
        //Validation taiKhoan
        isValid &=
            validation.kiemTraRong(taiKhoan, "tbTKNV", "(*) Vui lòng nhập tài khoản") 
            &&
            validation.kiemTraDoDaiKiTu(
                taiKhoan,
                "tbTKNV",
                "(*) Vui lòng nhập độ dài kí tự số 4 - 6",
                4,
                6
            ) &&
            validation.kiemTraChuoiKiTuSo(
                taiKhoan,
                "tbTKNV",
                "(*) Vui nhập kí tự số",
            )
            &&
            validation.kiemTraTaiKhoanNVTonTai(
                taiKhoan,
                "tbTKNV",
                "(*) Tài khoản đã tồn tại",
                dsnv.arr
            );

    // Validation hoTen
    isValid &=
    validation.kiemTraRong(hoTen, "tbTen", "(*) Vui lòng nhập họ tên") &&
    validation.kiemTraChuoiKiTu(
        hoTen,
        "tbTen",
        "(*) Vui lòng nhập chuỗi kí tự"
    );

    // Validation email
    isValid &=
    validation.kiemTraRong(email, "tbEmail", "(*) Vui lòng nhập email") &&
    validation.checkPattern(
        email,
        "tbEmail",
        "(*) Vui lòng nhập email đúng định dạng",
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    );

    //Validation matKhau
    isValid &=
    validation.kiemTraRong(
        matKhau,
        "tbMatKhau",
        "(*) Vui lòng nhập mật khẩu"
    ) &&
    validation.checkPattern(
        matKhau,
        "tbMatKhau",
        "(*) Vui lòng nhập mật khẩu có kí tự đặc biệt, số, in hoa, chữ thường",
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/
    ) &&
    validation.kiemTraDoDaiKiTu(
                matKhau,
                "tbMatKhau",
                "(*) Vui lòng nhập 6 - 10 kí tự",
                6,
                10
            );

    //Validation ngayLam
    isValid &= validation.kiemTraRong(
        ngayLam,
        "tbNgay",
        "(*) Vui lòng nhập ngày làm"
    );

    // validation luongCoBan
    isValid &= validation.kiemTraRong(
        luongCoBan,
        "tbLuongCB",
        "(*) Vui lòng nhập lương cơ bản"
    ) 
    &&
    validation.kiemTraKiTuSo(
        luongCoBan,
        "tbLuongCB",
        "(*) Vui lòng nhập lương có bản (1.000.000 - 20.000.000)",
        1000000,
        20000000
    );

    //Validation chucVu
    isValid &= validation.kiemTraChucVu(
        "chucvu",
        "tbChucVu",
        "(*) Vui lòng chọn chức vụ"
    );

    //Validation gioLamTrongThang
    isValid &= validation.kiemTraRong(
        gioLamTrongThang,
        "tbGiolam",
        "(*) Vui lòng nhập số giờ làm trong tháng"
    ) && 
    validation.kiemTraKiTuSo(
        gioLamTrongThang,
        "tbGiolam",
        "(*) Vui lòng giờ làm trong tháng (80 - 200 giờ)",
        80,
        200
    );
    
    //Tạo đối tượng nv từ lớp đối tượng NhanVien
    if (isValid){
        var nv = new NhanVien(taiKhoan, hoTen, email, matKhau, ngayLam, luongCoBan, chucVu, gioLamTrongThang);
        nv.xepLoaiNV();
        nv.tinhTongLuong();
        return nv;
    }

    return null;
};

//Validation
var isValid = true;



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
                    <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="suaNV('${nv.taiKhoan}')">Sửa</button>
                </td>
            </tr>
        `;
    }
    getEle("tableDanhSach").innerHTML = content;
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
    // getEle("modalContent").style.display = "block";
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
    var nv = layThongTinNV(false);
    if(nv){
        dsnv.capNhatNV(nv);
        renderTable(dsnv.arr);
        setLocalStorage();
    }
};

//Tìm kiếm nhân viên
function searchNV(){
    var txtSearch = getEle("searchName").value;
    var mangTimKiem = dsnv.timKiemNV(txtSearch);
    renderTable(mangTimKiem);
}

getEle("searchName").addEventListener("keyup",searchNV);

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