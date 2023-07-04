function NhanVien (_taiKhoan, _hoTen, _email, _matKhau, _ngayLam, _luongCoBan, _chucVu, _gioLamTrongThang){
    // Properties
    this.taiKhoan = _taiKhoan;
    this.hoTen = _hoTen;
    this.email = _email;
    this.matKhau = _matKhau;
    this.ngayLam = _ngayLam;
    this.luongCoBan = _luongCoBan;
    this.chucVu = _chucVu;
    this.gioLamTrongThang = _gioLamTrongThang;
    this.tongLuong = 0;
    this.loaiNV = "";

    //Methods
    // this.tongLuong = function(){
    //     this.
    // };
    this.xepLoaiNV = function(){
        if (this.gioLamTrongThang >= 192){
            this.loaiNV = "Nhân viên xuất sắc";
        }
        else if (this.gioLamTrongThang >= 176){
            this.loaiNV = "Nhân viên giỏi";
        }
        else if (this.gioLamTrongThang >= 160){
            this.loaiNV = "Nhân viên khá";
        }
        else {
            this.loaiNV = "Nhân viên trung bình";
        }
    };
    this.tinhTongLuong = function(){
        if (this.chucVu == "Sếp"){
            this.tongLuong = this.luongCoBan * 3;
        }
        else if (this.chucVu == "Trưởng phòng"){
            this.tongLuong = this.luongCoBan * 2;
        }
        else if (this.chucVu == "Nhân viên"){
            this.tongLuong = this.luongCoBan * 1;
        }
    }
}