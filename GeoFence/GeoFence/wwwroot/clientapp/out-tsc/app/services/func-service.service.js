var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
var FuncServiceService = /** @class */ (function () {
    function FuncServiceService() {
    }
    FuncServiceService.prototype.openImageInNewWindow = function (image64) {
        var b64toBlob = function (b64Data, contentType, sliceSize) {
            if (contentType === void 0) { contentType = ''; }
            if (sliceSize === void 0) { sliceSize = 512; }
            var byteCharacters = atob(b64Data);
            var byteArrays = [];
            for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                var slice = byteCharacters.slice(offset, offset + sliceSize);
                var byteNumbers = new Array(slice.length);
                for (var i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }
                var byteArray = new Uint8Array(byteNumbers);
                byteArrays.push(byteArray);
            }
            var blob = new Blob(byteArrays, { type: contentType });
            return blob;
        };
        var blob = b64toBlob(image64.split(',')[1], image64.split(',')[0].split(';')[0].split(':')[1]);
        var blobUrl = URL.createObjectURL(blob);
        //let url = window.URL.createObjectURL(blob);
        //window.location.href = this.sanitizer.bypassSecurityTrustUrl(blobUrl);
        window.open(blobUrl, '_blank');
    };
    FuncServiceService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], FuncServiceService);
    return FuncServiceService;
}());
export { FuncServiceService };
//# sourceMappingURL=func-service.service.js.map