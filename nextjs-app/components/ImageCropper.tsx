'use client';

import { useState, useRef, useCallback } from 'react';
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface ImageCropperProps {
  isOpen: boolean;
  imageSrc: string;
  onClose: () => void;
  onCropComplete: (croppedImageUrl: string) => void;
}

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export default function ImageCropper({
  isOpen,
  imageSrc,
  onClose,
  onCropComplete,
}: ImageCropperProps) {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const imgRef = useRef<HTMLImageElement>(null);

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    // Set initial crop to square (1:1 aspect ratio)
    setCrop(centerAspectCrop(width, height, 1));
  }, []);

  const getCroppedImg = useCallback(async (): Promise<string> => {
    const image = imgRef.current;
    if (!image || !completedCrop) {
      throw new Error('No crop data');
    }

    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    // Output size (square)
    const outputSize = 300;
    canvas.width = outputSize;
    canvas.height = outputSize;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('No 2d context');
    }

    // Set high quality
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      outputSize,
      outputSize
    );

    return canvas.toDataURL('image/jpeg', 0.9);
  }, [completedCrop]);

  const handleSave = async () => {
    try {
      const croppedImageUrl = await getCroppedImg();
      onCropComplete(croppedImageUrl);
      onClose();
    } catch (error) {
      console.error('Error cropping image:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#dbdbe6]">
          <h3 className="text-lg font-bold text-[#111118]">Crop Profile Photo</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-[#616289]">close</span>
          </button>
        </div>

        {/* Crop Area */}
        <div className="p-6 bg-[#f8f8fa]">
          <div className="flex items-center justify-center">
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={1}
              circularCrop={false}
              className="max-h-[400px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imgRef}
                src={imageSrc}
                alt="Crop preview"
                onLoad={onImageLoad}
                className="max-h-[400px] object-contain"
              />
            </ReactCrop>
          </div>
          <p className="text-center text-sm text-[#616289] mt-4">
            Drag the corners to adjust the crop area. The image will be cropped to a square.
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#dbdbe6] bg-white">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-[#111118] font-semibold text-sm hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-primary text-white font-semibold text-sm rounded-lg shadow-lg shadow-primary/20 hover:bg-[#3235d6] transition-all"
          >
            Apply Crop
          </button>
        </div>
      </div>
    </div>
  );
}
