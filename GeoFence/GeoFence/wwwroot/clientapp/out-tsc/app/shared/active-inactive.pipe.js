var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
var ActiveInactivePipe = /** @class */ (function () {
    function ActiveInactivePipe() {
    }
    ActiveInactivePipe.prototype.transform = function (value, args) {
        console.log("valuein pipe");
        console.log(value);
        return value == 1 ? 'Active' : 'Inactive';
    };
    ActiveInactivePipe = __decorate([
        Pipe({
            name: 'actInact'
        })
    ], ActiveInactivePipe);
    return ActiveInactivePipe;
}());
export { ActiveInactivePipe };
//# sourceMappingURL=active-inactive.pipe.js.map