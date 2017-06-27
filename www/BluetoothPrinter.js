var exec = require("cordova/exec");

var BluetoothPrinter = function() {};  

//开始扫描设备
BluetoothPrinter.prototype.scanForPeripherals = function(success, fail, keep){
    exec(success, fail, 'MKBluetoothPrinter', 'scanForPeripherals', [keep]);
};

//获取设备列表
BluetoothPrinter.prototype.getDeviceList = function(success, fail){
    exec(success,fail, 'MKBluetoothPrinter', 'getPeripherals',[]);
}

//连接设备
BluetoothPrinter.prototype.connectPeripheral = function(success, fail, uuid){
    exec(success, fail, 'MKBluetoothPrinter', 'connectPeripheral', [uuid]);
}

//设置打印信息
BluetoothPrinter.prototype.setPrinterInfo = function(success, fail, jsonString){
    exec(success, fail, 'MKBluetoothPrinter', 'createPrinterInfo', [jsonString]);
}

//确认打印
 BluetoothPrinter.prototype.finalPrinter = function(success, fail){
    exec(success, fail, 'MKBluetoothPrinter', 'finalPrinter', []);
}

//断开连接
BluetoothPrinter.prototype.stopConnection = function(success, fail){
    exec(success, fail, 'MKBluetoothPrinter', 'stopPeripheralConnection', []);
}

//在Xcode控制台打印log
BluetoothPrinter.prototype.printOCLog = function(success, fail, message){
    exec(success, fail, 'MKBluetoothPrinter', 'printLog', [message]);
}




//enum      
if (typeof BTPInfoType == "undefined"){
    var BTPInfoType = {};
    BTPInfoType.text            = 0;
    BTPInfoType.textList        = 1;
    BTPInfoType.barCode         = 2;
    BTPInfoType.qrCode          = 3;
    BTPInfoType.image           = 4;
    BTPInfoType.seperatorLine   = 5;
    BTPInfoType.footer          = 6;
}

if (typeof BTPFontType == "undefined"){
    var BTPFontType = {};
    BTPFontType.smalle  = 0;
    BTPFontType.middle  = 1;
    BTPFontType.big     = 2;
}

if (typeof BTPAlignmentType == "undefined"){
    var BTPAlignmentType = {};
    BTPAlignmentType.left   = 0;
    BTPAlignmentType.center = 1;
    BTPAlignmentType.right  = 2;
}
        
//PrinterInfoHelper

/* 所有参数
var infoModel = new Object();
infoModel.infoType = BTPInfoType.text;
infoModel.text = text;
infoModel.textArray = ["铅笔刀","2.00","5","10.00"];
infoModel.fontType = MKBTPFontType.middle;
infoModel.aligmentType = MKBTPAlignmentType.center;
infoModel.maxWidth = 300;
infoModel.qrCodeSize = 12;
infoModel.offset = 150;
infoModel.isTitle = 0;
*/

var _printerInfos = [];

function PrinterInfoHelper(){};

PrinterInfoHelper.prototype.resetInfos = function(){
     _printerInfos = [];
}

PrinterInfoHelper.prototype.appendText = function (text, alignment, fontType) {
     var infoModel = new Object();
     infoModel.infoType = BTPInfoType.text;
     infoModel.text = text;
     infoModel.fontType = fontType;
     infoModel.aligmentType = alignment;
          _printerInfos.push(infoModel);
}

PrinterInfoHelper.prototype.appendTextList = function (textList, isTitle, offset) {
     var infoModel = new Object();
     infoModel.infoType = BTPInfoType.textList;
     infoModel.textArray = textList;
     infoModel.isTitle = isTitle;
     infoModel.offset = offset;
     _printerInfos.push(infoModel);
}


PrinterInfoHelper.prototype.appendBarCode = function (text, alignment, maxWidth){
     var infoModel = new Object();
     infoModel.infoType = BTPInfoType.barCode;
     infoModel.text = text;
     infoModel.aligmentType = alignment;
     infoModel.maxWidth = maxWidth;
          _printerInfos.push(infoModel);
}


PrinterInfoHelper.prototype.appendQrCode = function (text, size, alignment){
     var infoModel = new Object();
     infoModel.infoType = BTPInfoType.qrCode;
     infoModel.text = text;
     infoModel.aligmentType = alignment;
     infoModel.qrCodeSize = size;
     _printerInfos.push(infoModel);
}

PrinterInfoHelper.prototype.appendImage = function (text, maxWidth, alignment){
     var infoModel = new Object();
     infoModel.infoType = BTPInfoType.image;
     infoModel.text = text;
     infoModel.aligmentType = alignment;
     infoModel.maxWidth = maxWidth;
          _printerInfos.push(infoModel);
}

PrinterInfoHelper.prototype.appendSeperatorLine = function(){
     var infoModel = new Object();
     infoModel.infoType = BTPInfoType.seperatorLine;
          _printerInfos.push(infoModel);
}


PrinterInfoHelper.prototype.appendFooter = function(text){
     var infoModel = new Object();
     infoModel.infoType = BTPInfoType.footer;
     infoModel.text = text;
     _printerInfos.push(infoModel);
}

PrinterInfoHelper.prototype.getPrinterInfoJsonString = function(){
     var jsonStr = JSON.stringify(_printerInfos);
     return jsonStr;
}

var printerHelper = new BluetoothPrinter();  
var printerInfoHelper = new PrinterInfoHelper();

window.printerHelper = printerHelper;
window.printerInfoHelper = printerInfoHelper;
window.BTPInfoType = BTPInfoType;
window.BTPFontType = BTPFontType;
window.BTPAlignmentType = BTPAlignmentType;


module.exports.printerHelper = printerHelper;
module.exports.printerInfoHelper = printerInfoHelper;
module.exports.BTPInfoType = BTPInfoType;
module.exports.BTPFontType = BTPFontType;
module.exports.BTPAlignmentType = BTPAlignmentType;



