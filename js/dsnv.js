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

    this._xoaNV = function(taiKhoan){
        var index = this._timViTri(taiKhoan);
        if(index !== -1){
            this.arr.splice(index, 1);
        }
    }
}