function DSNV(){
    //Properties
    //Chứa các đối tượng nhân viên bên trong nhanvien.js
    this.arr = [];

    this.themNV = function(nv){
        this.arr.push(nv);
    };
    
    this._timViTri = function (taiKhoan){
        var index = -1;

        for (var i =0; i < this.arr.length; i++){
            var nv = this.arr[i];
            if (nv.taiKhoan === taiKhoan){
                index = i;
                break;
            }
        }
        return index;
    }

    // Lấy thông tin chi tiết của nhân viên
    this.layThongTinChiTietNV = function (taiKhoan){
        // tìm vị trí
        var index = this._timViTri(taiKhoan);

        if (index !== -1){
            var nv = this.arr[index];
            return nv;
        }
    } 

    // Cập nhật nhân viên
    this.capNhatNV = function (nv){
        document.getElementById("tbTKNV").style.display = "none";
        document.getElementById("tbTKNV").innerHTML = "";
        var index = this._timViTri(nv.taiKhoan);
        if (index !== -1){
            this.arr[index] = nv;
        }
    }

    // Xóa nhân viên
    this._xoaNV = function(taiKhoan){
        var index = this._timViTri(taiKhoan);
        if(index !== -1){
            this.arr.splice(index, 1);
        }
    }
}

DSNV.prototype.timKiemNV = function (keyword) {
        
        var mangTimKiem = [];
    
        for (var i = 0; i < this.arr.length; i++) {
        var nv = this.arr[i];
        //keyword => convert chữ thường
        var keywordLowerCase = keyword.toLowerCase();
        //sv.tenSV => convert chữ thường
        var xepLoaiNVLowerCase = nv.loaiNV.toLowerCase();
        if (xepLoaiNVLowerCase.indexOf(keywordLowerCase) !== -1) {
            mangTimKiem.push(nv);
        }
        }
    
        return mangTimKiem;
    };