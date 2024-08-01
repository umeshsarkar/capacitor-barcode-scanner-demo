import { Component } from '@angular/core';
import {
  CapacitorBarcodeScanner,
  CapacitorBarcodeScannerAndroidScanningLibrary,
  CapacitorBarcodeScannerCameraDirection,
  CapacitorBarcodeScannerOptions,
  CapacitorBarcodeScannerScanOrientation,
  CapacitorBarcodeScannerTypeHint,
} from '@capacitor/barcode-scanner';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor() {}

  barcodeValue: string | undefined;

  async scanBarcode() {
      const options: CapacitorBarcodeScannerOptions = {
        hint: CapacitorBarcodeScannerTypeHint.CODE_128,
        scanInstructions: 'Point your camera at the barcode',
        scanButton: true,
        scanText: 'Scan',
        cameraDirection: CapacitorBarcodeScannerCameraDirection.BACK,
        scanOrientation: CapacitorBarcodeScannerScanOrientation.ADAPTIVE,
        android: {
          scanningLibrary: CapacitorBarcodeScannerAndroidScanningLibrary.ZXING,
        },
        web: { showCameraSelection: true, scannerFPS: 30 },
      };

      await CapacitorBarcodeScanner.scanBarcode(options).then(
        (ScanResult) => {
          console.log('ScanResult', ScanResult.ScanResult);
          this.barcodeValue = ScanResult.ScanResult;
        },
        (error) => {
          // handle your error here
          console.log(error);
        }
      );
  }
}
