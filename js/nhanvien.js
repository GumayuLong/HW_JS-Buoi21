function NhanVien (_taiKhoan, _hoTen, _email, _matKhau, _ngayLam, _luongCoBan, _chucVu, _gioLamTrongNgay){
    // Properties
    this.taiKhoan = _taiKhoan;
    this.hoTen = _hoTen;
    this.email = _email;
    this.matKhau = _matKhau;
    this.ngayLam = _ngayLam;
    this.luongCoBan = _luongCoBan;
    this.chucVu = _chucVu;
    this.gioLamTrongNgay = _gioLamTrongNgay;
    this.tongLuong = 0;
    this.loaiNV = "";

    //Methods
    // this.tongLuong = function(){
    //     this.
    // };
    this.xepLoaiNV = function(){
        if (this.gioLamTrongNgay * this.ngayLam >= 192){
            this.loaiNV = "Nhân viên xuất sắc";
        }
        else if (this.gioLamTrongNgay * this.ngayLam >= 176){
            this.loaiNV = "Nhân viên giỏi";
        }
        else if (this.gioLamTrongNgay * this.ngayLam >= 160){
            this.loaiNV = "Nhân viên khá";
        }
        else {
            this.loaiNV = "Nhân viên trung bình";
        }
    };
}