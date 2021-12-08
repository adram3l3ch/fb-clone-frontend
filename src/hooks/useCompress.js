import { ImageCompressor } from "image-compressor";
import { useCallback } from "react";

const imageCompressor = new ImageCompressor();

const compressorSettings = {
   toWidth: 100,
   toHeight: 100,
   mimeType: "image/png",
   mode: "strict",
   quality: 0.6,
   grayScale: true,
   sepia: true,
   threshold: 127,
   vReverse: true,
   hReverse: true,
   speed: "low",
};

const useCompress = src => {
   return useCallback(() => {
      function proceedCompressedImage(compressedSrc) {
         console.log("asd");
         return compressedSrc;
      }
      return imageCompressor.run(src, compressorSettings, proceedCompressedImage);
   }, [src]);
};

export default useCompress;
